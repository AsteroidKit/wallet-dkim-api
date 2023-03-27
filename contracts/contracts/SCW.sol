pragma solidity >=0.4.21 <0.6.0;

import "./utils/Strings.sol";
import "./DkimChecker.sol";

contract SCW {
    address public ownerAddress;
    string public ownerEmail;
    address public scwDeployerAddress;

    modifier onlyOwner() {
        if (msg.sender != ownerAddress)
            revert("The msg.sender is different than the owner address");
        _;
    }

    modifier onlySCWDeployer() {
        if (msg.sender != scwDeployerAddress)
            revert("The msg.sender is different than the SCWDeployer address");
        _;
    }

    constructor(
        address _ownerAddress,
        string memory _ownerEmail, // address dkimCheckerAddress
        address _SCWDeployerAddress // address SCWDeployer
    ) public {
        ownerAddress = _ownerAddress;
        // TODO: Verify if it is from a trustable email provider (google, hotmail, etc)
        ownerEmail = _ownerEmail;
        scwDeployerAddress = _SCWDeployerAddress;
    }

    function setNewOwner(
        address newOwnerAddress
    ) public onlySCWDeployer returns (bool) {
        ownerAddress = newOwnerAddress;
    }

    function() external payable {}

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function transferNative(
        uint _amount,
        address payable destination
    ) external {
        destination.transfer(_amount);
    }
}

contract SCWDeployer {
    using strings for *;

    mapping(string => address payable) userEmailToSCW;

    // Associating with email
    mapping(string => address) authProcessStartedBy;
    mapping(string => uint) authProcessStartTime;
    mapping(string => string) authProccessNonce;
    mapping(string => bool) authEmailVerified;

    DkimChecker dkimChecker;

    constructor(address dkimCheckerAddress) public {
        dkimChecker = DkimChecker(dkimCheckerAddress);
    }

    function startAuth(
        string memory email,
        string memory nonce
    ) public returns (bool) {
        authProcessStartedBy[email] = msg.sender;
        authProcessStartTime[email] = now;
        authProccessNonce[email] = nonce;
        authEmailVerified[email] = false;

        return true;
    }

    function verifyEmail(
        string memory _selector,
        string memory _domain,
        bytes memory _sig,
        string memory _canonicalizedHeader
    ) public returns (bool) {
        string memory headerFromField = getHeaderFromField(
            _canonicalizedHeader
        );

        string memory nonce = getHeaderNonce(_canonicalizedHeader);

        require(!authEmailVerified[headerFromField], "Email already verified");

        require(
            authProcessStartedBy[headerFromField] != address(0),
            "Auth proccess not started"
        );

        require(
            authProcessStartedBy[headerFromField] == msg.sender,
            "Every steps of Auth process must be done by the same sender"
        );

        if (isAuthProcessExpired(authProcessStartTime[headerFromField])) {
            clearUpAuthProccess(headerFromField);
            revert("Auth proccess expired");
        }

        require(
            nonce.toSlice().compare(
                authProccessNonce[headerFromField].toSlice()
            ) == 0,
            "Invalid nonce"
        );

        bytes memory _canonicalizedHeaderHex = bytes(_canonicalizedHeader);

        // Checks email's header
        bool headerVerified = dkimChecker.verifyRSASHA256(
            _selector,
            _domain,
            _sig,
            _canonicalizedHeaderHex
        );

        require(headerVerified, "DKIM header check failed for this email");

        authEmailVerified[headerFromField] = true;

        return true;
    }

    function completeAuth(
        string memory ownerEmail,
        address ownerAddress
    ) public returns (address) {
        require(authEmailVerified[ownerEmail], "Email is not verified");

        require(
            authProcessStartedBy[ownerEmail] == msg.sender,
            "Every steps of Auth process must be done by the same sender"
        );

        if (isAuthProcessExpired(authProcessStartTime[ownerEmail])) {
            clearUpAuthProccess(ownerEmail);
            revert("Auth proccess expired");
        }

        SCW scw;
        address payable scwAddress = userEmailToSCW[ownerEmail];

        // This is a new account. Lets deploy
        if (scwAddress == address(0)) {
            scw = new SCW(ownerAddress, ownerEmail, address(this));
        }
        // Account already exsits. Lets update the owner
        else {
            scw = SCW(scwAddress);
            scw.setNewOwner(ownerAddress);
        }

        userEmailToSCW[ownerEmail] = address(scw);
        clearUpAuthProccess(ownerEmail);

        return userEmailToSCW[ownerEmail];
    }

    function getSCWAddressByEmail(
        string memory userAddress
    ) public view returns (address) {
        return userEmailToSCW[userAddress];
    }

    function compareStrings(
        string memory a,
        string memory b
    ) public pure returns (bool) {
        return keccak256(bytes(a)) == keccak256(bytes(b));
    }

    function isAuthProcessExpired(uint startTime) internal view returns (bool) {
        return (now >= (startTime + 5 minutes));
    }

    function clearUpAuthProccess(string memory ownerEmail) internal {
        authProcessStartedBy[ownerEmail] = address(0);
        authProcessStartTime[ownerEmail] = 0;
        authProccessNonce[ownerEmail] = "";
        authEmailVerified[ownerEmail] = false;
    }

    function getHeaderFromField(
        string memory emlAsString
    ) public pure returns (string memory) {
        strings.slice memory from = "from:".toSlice();
        strings.slice memory emailPrefix = "<".toSlice();
        strings.slice memory emailSufix = ">".toSlice();
        strings.slice memory crlf = "\r\n".toSlice();

        string memory fromEmail;

        strings.slice memory fromAndOnwards = emlAsString
            .toSlice()
            .find(from)
            .beyond(from);

        if (fromAndOnwards.contains(emailPrefix)) {
            strings.slice memory fromEmailAndOnwards = fromAndOnwards
                .copy()
                .find(emailPrefix)
                .beyond(emailPrefix);

            fromEmail = fromEmailAndOnwards
                .until(fromEmailAndOnwards.copy().find(emailSufix))
                .toString();
        } else {
            fromEmail = fromAndOnwards
                .until(fromAndOnwards.copy().find(crlf))
                .toString();
        }

        require(
            fromEmail.toSlice().len() != 0,
            "Could not find FROM on email."
        );

        return fromEmail;
    }

    function getHeaderNonce(
        string memory emlAsString
    ) public pure returns (string memory) {
        strings.slice memory subject = "subject:".toSlice();
        strings.slice memory nonce = "nonce::".toSlice();
        strings.slice memory crlf = "\r\n".toSlice();

        strings.slice memory nonceAndOnwards = emlAsString
            .toSlice()
            .copy()
            .find(subject)
            .find(nonce)
            .beyond(nonce);

        string memory nonceString = nonceAndOnwards
            .until(nonceAndOnwards.copy().find(crlf))
            .toString();

        require(
            nonceString.toSlice().len() != 0,
            "Could not find NONCE on email."
        );

        return nonceString;
    }

    function isEmailVerified(string memory email) public view returns (bool) {
        return authEmailVerified[email];
    }
}

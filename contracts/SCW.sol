// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.0;

interface DkimCheckerInterface {
    function verifyRSASHA256(
        string calldata _selector,
        string calldata _domain,
        bytes calldata _sig,
        bytes calldata _canonicalizedHeader
    ) external returns (bool);
}

contract SCW {
    address public ownerAddress;
    string public ownerEmail;

    // address public authProcessStartedBy;
    // uint public authProcessStartTime;
    // string public authProccessNonce;
    // bool public authEmailVerified;

    // uint256 public constant RECOVERY_TIME_LIMIT_IN_MINUTES = 5;

    // string[] public guardiansEmails;
    // mapping(string => bool) public confirmedGuardians;
    // bool public isRecoveryStarted = false;

    // DkimCheckerInterface dkimChecker;

    modifier onlyOwner() {
        if (msg.sender != ownerAddress)
            revert("The msg.sender is different than the owner address");
        _;
    }

    constructor(
        address _ownerAddress,
        string memory _ownerEmail // address dkimCheckerAddress
    ) {
        ownerAddress = _ownerAddress;
        // TODO: Verify if it is from a trustable email provider (google, hotmail, etc)
        ownerEmail = _ownerEmail;
        // dkimChecker = DkimCheckerInterface(dkimCheckerAddress);
    }

    // function startAuth(
    //     string memory email,
    //     string memory nonce
    // ) public returns (bool) {
    //     require(
    //         compareStrings(email, ownerEmail),
    //         "This email isn't owner of this account"
    //     );

    //     authProcessStartedBy = msg.sender;
    //     authProcessStartTime = now;
    //     authProccessNonce = nonce;

    //     return true;
    // }

    // function confirmOwnerEmail(
    //     string memory _selector,
    //     string memory _domain,
    //     bytes memory _sig,
    //     bytes memory _canonicalizedHeader,
    //     string memory _emailToVerify, // BORBA TODO: Should be extracted from email's header
    //     string memory _nonceToVerify // BORBA TODO: Should be extracted from email's body
    // ) public returns (bool) {
    //     // TODO: This require won't be necessary after retrieving fROM from email's header
    //     require(
    //         compareStrings(_emailToVerify, ownerEmail),
    //         "This email isn't owner of this account"
    //     );

    //     // TODO: This require won't be necessary after retrieving nonce from email's body
    //     require(
    //         compareStrings(_nonceToVerify, authProccessNonce),
    //         "This email isn't owner of this account"
    //     );

    //     // Checks email's header
    //     bool verified = dkimChecker.verifyRSASHA256(
    //         _selector,
    //         _domain,
    //         _sig,
    //         _canonicalizedHeader
    //     );

    //     // TODO: Check email's body

    //     require(verified, "DKIM check failed for this email");

    //     authEmailVerified = true;

    //     return true;
    // }

    // function setNewOwnerAddress(address newOwnerAddress) public returns (bool) {
    //     require(
    //         authEmailVerified,
    //         "Email is not verified. Call startAuth first"
    //     );

    //     require(
    //         authProcessStartedBy == msg.sender,
    //         "New owner must be set by the same address that started the auth proccess"
    //     );

    //     if (isAuthProcessExpired()) {
    //         authProcessStartTime = 0;
    //         authProcessStartedBy = address(0);
    //         authProccessNonce = "";

    //         revert(
    //             "Auth process expired. The process must be completed withing 5 minutes"
    //         );
    //     }

    //     ownerAddress = newOwnerAddress;

    //     return true;
    // }

    // function isAuthProcessExpired() internal view returns (bool) {
    //     return (now >= (authProcessStartTime + 5 minutes));
    // }

    // function addGuardian(
    //     string memory guardianMail
    // ) public onlyOwner returns (bool) {
    //     // TODO: Verify if it is from a trustable email provider (google, hotmail, etc)
    //     guardiansEmails.push(guardianMail);
    //     return true;
    // }

    // function removeGuardian(
    //     string memory email
    // ) public onlyOwner returns (bool) {
    //     for (uint i = 0; i < guardiansEmails.length; i++) {
    //         if (compareStrings(guardiansEmails[i], email)) {
    //             removeGuardianFromArray(i);
    //             break;
    //         }
    //     }
    // }

    // function verifyGuardianEmail(
    //     string memory _selector,
    //     string memory _domain,
    //     bytes memory _sig,
    //     bytes memory _canonicalizedHeader,
    //     string memory _emailToVerify // BORBA TODO: Should be extracted from header
    // ) public {
    //     if (isAuthStarted) {
    //         if (recoveryProcessHasExpired()) {
    //             clearUpRecoveryState();
    //             revert("Recovery proccess has expired");
    //         } else {
    //             require(
    //                 authProcessStartedBy == msg.sender,
    //                 "Recovery process must be done through the same address"
    //             );
    //         }
    //     }

    //     // TODO
    //     require(
    //         isGuardian(_emailToVerify),
    //         "This email is not a wallet guardian"
    //     );

    //     bool verified = dkimChecker.verifyRSASHA256(
    //         _selector,
    //         _domain,
    //         _sig,
    //         _canonicalizedHeader
    //     );

    //     if (verified) {
    //         confirmedGuardians[_emailToVerify] = true;

    //         if (!isAuthStarted) {
    //             authProcessStartTime = now;
    //             isAuthStarted = true;
    //             authProcessStartedBy = msg.sender;
    //         }
    //     }
    // }

    // function setNewOwner(address newOwner) public {
    //     if (recoveryProcessHasExpired()) {
    //         clearUpRecoveryState();
    //         revert("Recovery proccess has expired");
    //     }

    //     require(
    //         msg.sender == authProcessStartedBy,
    //         "This email is not a wallet guardian"
    //     );

    //     require(
    //         haveAllGuardiansConfirmed(),
    //         "Still waiting for some guardians confirmations"
    //     );

    //     _owner = newOwner;
    // }

    // function removeAllConfirmations() internal {
    //     for (uint i = 0; i < guardiansEmails.length; i++) {
    //         confirmedGuardians[guardiansEmails[i]] = false;
    //     }
    // }

    // function haveAllGuardiansConfirmed() internal view returns (bool) {
    //     for (uint i = 0; i < guardiansEmails.length; i++) {
    //         if (!confirmedGuardians[guardiansEmails[i]]) {
    //             return false;
    //         }
    //     }

    //     return true;
    // }

    // function isGuardian(string memory email) internal view returns (bool) {
    //     for (uint i = 0; i < guardiansEmails.length; i++) {
    //         if (compareStrings(email, guardiansEmails[i])) {
    //             return true;
    //         }
    //     }
    // }

    // function clearUpRecoveryState() internal {
    //     removeAllConfirmations();
    //     isRecoveryStarted = false;
    //     authProcessStartTime = 0;
    //     authProcessStartedBy = address(0);
    // }

    // function removeGuardianFromArray(uint256 index) internal {
    //     if (index >= guardiansEmails.length) return;

    //     for (uint i = index; i < guardiansEmails.length - 1; i++) {
    //         guardiansEmails[i] = guardiansEmails[i + 1];
    //     }
    //     delete guardiansEmails[guardiansEmails.length - 1];
    //     guardiansEmails.length--;
    // }

    // function compareStrings(
    //     string memory a,
    //     string memory b
    // ) public pure returns (bool) {
    //     return keccak256(bytes(a)) == keccak256(bytes(b));
    // }
}

contract SCWDeployer {
    mapping(string => address) userEmailToSCW;

    // Associating with email
    mapping(string => address) authProcessStartedBy;
    mapping(string => uint) authProcessStartTime;
    mapping(string => string) authProccessNonce;
    mapping(string => bool) authEmailVerified;

    DkimCheckerInterface dkimChecker;

    event ReturnVal(bool);

    constructor(address dkimCheckerAddress) {
        dkimChecker = DkimCheckerInterface(dkimCheckerAddress);
    }

    function createNewAccount(
        string memory email,
        string memory nonce
    ) public returns (bool) {
        require(
            userEmailToSCW[email] == address(0),
            "This email is already associated to a account"
        );

        authProcessStartedBy[email] = msg.sender;
        authProcessStartTime[email] = block.timestamp;
        authProccessNonce[email] = nonce;

        emit ReturnVal(true);

        return true;
    }

    function confirmNewAccountEmail(
        string memory _selector,
        string memory _domain,
        bytes memory _sig,
        bytes memory _canonicalizedHeader,
        string memory _emailToVerify, // BORBA TODO: Should be extracted from email's header
        string memory _nonceToVerify // BORBA TODO: Should be extracted from email's body
    ) public returns (bool) {
        require(
            authProcessStartedBy[_emailToVerify] != address(0),
            "Auth proccess has not started. Call createNewAccount first"
        );

        require(
            authProcessStartedBy[_emailToVerify] == msg.sender,
            "Every steps of Auth process must be done by the same sender"
        );

        if (isAuthProcessExpired(authProcessStartTime[_emailToVerify])) {
            authProcessStartedBy[_emailToVerify] = address(0);
            authProcessStartTime[_emailToVerify] = 0;
            authProccessNonce[_emailToVerify] = "";
            authEmailVerified[_emailToVerify] = false;

            revert("Auth proccess expired");
        }

        require(
            compareStrings(_nonceToVerify, authProccessNonce[_emailToVerify]),
            "Invalid nonce"
        );

        // Checks email's header
        bool verified = dkimChecker.verifyRSASHA256(
            _selector,
            _domain,
            _sig,
            _canonicalizedHeader
        );

        // TODO: Check email's body

        require(verified, "DKIM check failed for this email");

        authEmailVerified[_emailToVerify] = true;

        return true;
    }

    function deployNewSWC(
        string memory ownerEmail,
        address ownerAddress
    ) public returns (address) {
        require(
            authEmailVerified[ownerEmail],
            "Email is not verified. Call confirmNewAccountEmail first"
        );

        require(
            authProcessStartedBy[ownerEmail] == msg.sender,
            "deployNewSWC must be called by the same address that started the auth proccess"
        );

        if (isAuthProcessExpired(authProcessStartTime[ownerEmail])) {
            authProcessStartedBy[ownerEmail] = address(0);
            authProcessStartTime[ownerEmail] = 0;
            authProccessNonce[ownerEmail] = "";
            authEmailVerified[ownerEmail] = false;

            revert("Auth proccess expired");
        }

        SCW c = new SCW(ownerAddress, ownerEmail);
        userEmailToSCW[ownerEmail] = address(c);

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
        return (block.timestamp >= (startTime + 5 minutes));
    }
}

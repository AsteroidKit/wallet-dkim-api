"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SHA512__factory = void 0;
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "uint256[8]",
                name: "Ai",
                type: "uint256[8]",
            },
        ],
        name: "arrayToLE",
        outputs: [
            {
                internalType: "uint256",
                name: "high",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "low",
                type: "uint256",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256[2]",
                name: "_a",
                type: "uint256[2]",
            },
            {
                internalType: "uint256[2]",
                name: "_b",
                type: "uint256[2]",
            },
        ],
        name: "ecAddVec",
        outputs: [
            {
                internalType: "uint256[2]",
                name: "",
                type: "uint256[2]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_r",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_p",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_hx",
                type: "uint256",
            },
            {
                internalType: "uint256[80]",
                name: "w",
                type: "uint256[80]",
            },
        ],
        name: "initW",
        outputs: [],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "d",
                type: "uint256",
            },
        ],
        name: "rotr",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256[2]",
                name: "point",
                type: "uint256[2]",
            },
            {
                internalType: "uint256",
                name: "s",
                type: "uint256",
            },
        ],
        name: "scalarMult",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_r",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_p",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_hx",
                type: "uint256",
            },
        ],
        name: "sha512modl",
        outputs: [
            {
                internalType: "uint256",
                name: "hashmodl",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256[80]",
                name: "W",
                type: "uint256[80]",
            },
        ],
        name: "update",
        outputs: [
            {
                internalType: "uint256[8]",
                name: "",
                type: "uint256[8]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
const _bytecode = "0x608060405260405180610a00016040528067428a2f98d728ae228152602001677137449123ef65cd815260200167b5c0fbcfec4d3b2f815260200167e9b5dba58189dbbc8152602001673956c25bf348b53881526020016759f111f1b605d019815260200167923f82a4af194f9b815260200167ab1c5ed5da6d8118815260200167d807aa98a303024281526020016712835b0145706fbe815260200167243185be4ee4b28c815260200167550c7dc3d5ffb4e281526020016772be5d74f27b896f81526020016780deb1fe3b1696b18152602001679bdc06a725c71235815260200167c19bf174cf692694815260200167e49b69c19ef14ad2815260200167efbe4786384f25e38152602001670fc19dc68b8cd5b5815260200167240ca1cc77ac9c658152602001672de92c6f592b02758152602001674a7484aa6ea6e4838152602001675cb0a9dcbd41fbd481526020016776f988da831153b5815260200167983e5152ee66dfab815260200167a831c66d2db43210815260200167b00327c898fb213f815260200167bf597fc7beef0ee4815260200167c6e00bf33da88fc2815260200167d5a79147930aa72581526020016706ca6351e003826f815260200167142929670a0e6e7081526020016727b70a8546d22ffc8152602001672e1b21385c26c9268152602001674d2c6dfc5ac42aed81526020016753380d139d95b3df815260200167650a73548baf63de815260200167766a0abb3c77b2a881526020016781c2c92e47edaee681526020016792722c851482353b815260200167a2bfe8a14cf10364815260200167a81a664bbc423001815260200167c24b8b70d0f89791815260200167c76c51a30654be30815260200167d192e819d6ef5218815260200167d69906245565a910815260200167f40e35855771202a815260200167106aa07032bbd1b881526020016719a4c116b8d2d0c88152602001671e376c085141ab538152602001672748774cdf8eeb9981526020016734b0bcb5e19b48a8815260200167391c0cb3c5c95a638152602001674ed8aa4ae3418acb8152602001675b9cca4f7763e373815260200167682e6ff3d6b2b8a3815260200167748f82ee5defb2fc81526020016778a5636f43172f6081526020016784c87814a1f0ab728152602001678cc702081a6439ec81526020016790befffa23631e28815260200167a4506cebde82bde9815260200167bef9a3f7b2c67915815260200167c67178f2e372532b815260200167ca273eceea26619c815260200167d186b8c721c0c207815260200167eada7dd6cde0eb1e815260200167f57d4f7fee6ed17881526020016706f067aa72176fba8152602001670a637dc5a2c898a6815260200167113f9804bef90dae8152602001671b710b35131c471b81526020016728db77f523047d8481526020016732caab7b40c724938152602001673c9ebe0a15c9bebc815260200167431d67c49c100d4c8152602001674cc5d4becb3e42b6815260200167597f299cfc657e2a8152602001675fcb6fab3ad6faec8152602001676c44198c4a47581781525060009060506200048092919062000522565b50604051806101000160405280676a09e667f3bcc908815260200167bb67ae8584caa73b8152602001673c6ef372fe94f82b815260200167a54ff53a5f1d36f1815260200167510e527fade682d18152602001679b05688c2b3e6c1f8152602001671f83d9abfb41bd6b8152602001675be0cd19137e217981525060509060086200050d92919062000567565b503480156200051b57600080fd5b50620005cb565b826050810192821562000554579160200282015b828111156200055357825182559160200191906001019062000536565b5b509050620005639190620005ac565b5090565b826008810192821562000599579160200282015b82811115620005985782518255916020019190600101906200057b565b5b509050620005a89190620005ac565b5090565b5b80821115620005c7576000816000905550600101620005ad565b5090565b61285380620005db6000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c806351b6c0a11161005b57806351b6c0a114610113578063755d4add146101435780639b0fd8cd14610174578063dcb90bb9146101a45761007d565b806301f743371461008257806305e4fa19146100b2578063500d8107146100e2575b600080fd5b61009c600480360381019061009791906123bc565b6101c0565b6040516100a9919061258a565b60405180910390f35b6100cc60048036038101906100c7919061232c565b6104c8565b6040516100d9919061256e565b60405180910390f35b6100fc60048036038101906100f791906122f0565b610903565b60405161010a9291906125a5565b60405180910390f35b61012d60048036038101906101289190612380565b610afe565b60405161013a919061258a565b60405180910390f35b61015d60048036038101906101589190612356565b610b27565b60405161016b9291906125a5565b60405180910390f35b61018e600480360381019061018991906122b4565b610dc3565b60405161019b9190612553565b60405180910390f35b6101be60048036038101906101b9919061240b565b611007565b005b60006101ca612033565b6101d685858584611007565b60006101e1826104c8565b905060005b60088110156102d25767ffffffffffffffff60508260088110610232577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b015483836008811061026d577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002015161027c91906126cb565b168282600881106102b6577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200201818152505080806102ca9061275f565b9150506101e6565b506000806102df83610b27565b915091507f1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3ed80610338577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3ed8061038d577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600183097f1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3ed806103e6577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3ed8061043b577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6001700100000000000000000000000000000000097f1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3ed806104a5577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b700100000000000000000000000000000000870909089450505050509392505050565b6104d0612056565b6000605060006008811061050d577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b015490506000605060016008811061054e577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b015490506000605060026008811061058f577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b01549050600060506003600881106105d0577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b0154905060006050600460088110610611577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b0154905060006050600560088110610652577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b0154905060006050600660088110610693577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b01549050600060506007600881106106d4577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b0154905060005b60508110156108b95760006106f1866029610afe565b6106fc876012610afe565b61070788600e610afe565b181890506000848719168688161890506000808460508110610752577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b01548e856050811061078d577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002015183858861079f91906126cb565b6107a991906126cb565b6107b391906126cb565b6107bd91906126cb565b905060006107cc8d6027610afe565b6107d78e6022610afe565b6107e28f601c610afe565b1818905060008b8e168d8f161890508b8d16811890506000818361080691906126cb565b90508897508998508a9950680100000000000000008061084f577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b848d089a508c9b508d9c508e9d50680100000000000000008061089b577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b8185089e5050505050505080806108b19061275f565b9150506106db565b506040518061010001604052808981526020018881526020018781526020018681526020018581526020018481526020018381526020018281525098505050505050505050919050565b60008061090e612079565b610916612079565b85600060028110610950577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002015182600001818152505085600160028110610998577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002015182602001818152505060018260400181815250506000816000018181525050600181602001818152505060018160400181815250505b6000851115610a0b57600180861614156109f4576109f18183611116565b90505b600185901c9450610a0482611917565b91506109d3565b6000610a1a8260400151611f95565b90507f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed80610a71577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b818360000151098260000181815250507f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed80610ad6577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b8183602001510982602001818152505081600001518260200151945094505050509250929050565b600067ffffffffffffffff826040610b169190612721565b84901b8385901c1716905092915050565b600080600083600360088110610b66577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6020020151604085600260088110610ba7577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6020020151901b608086600160088110610bea577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6020020151901b60c087600060088110610c2d577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6020020151901b1717179050600084600760088110610c75577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6020020151604086600660088110610cb6577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6020020151901b608087600560088110610cf9577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6020020151901b60c088600460088110610d3c577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6020020151901b17171790506040518260208201528160408201526060810160405260018101805b60208201811015610d8a5760ff8151166008838303021b86019550600181019050610d64565b50602081019050805b60208201811015610db95760ff8151166008838303021b87019650600181019050610d93565b5050505050915091565b610dcb61209a565b610dd3612079565b610ddb612079565b84600060028110610e15577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002015182600001818152505084600160028110610e5d577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6020020151826020018181525050600182604001818152505083600060028110610eb0577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002015181600001818152505083600160028110610ef8577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002015181602001818152505060018160400181815250506000610f1d8383611116565b90506000610f2e8260400151611f95565b905060405180604001604052807f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed80610f90577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b8385600001510981526020017f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed80610ff1577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b8385602001510981525094505050505092915050565b604051604060020a856000830152846020830152836040830152607f60020a60801b6103001760608301526080820160405260005b601081101561106b5767ffffffffffffffff60088202601885030151168160200285015260018101905061103c565b5060105b605081101561110d576020600f82030284015160206002830302850151602060108403028601516020600785030287015167ffffffffffffffff8460071c8560381b8660081c1786603f1b8760011c1718181667ffffffffffffffff8460061c8560031b86603d1c1786602d1b8760131c1718181667ffffffffffffffff8184018386010116602088028b015250505050505060018101905061106f565b50505050505050565b61111e612079565b6111266120bc565b7f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed8061117b577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b83604001518560400151098160000181815250507f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed806111e4577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b81600001518260000151098160200181815250507f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed8061124d577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b83600001518560000151098160400181815250507f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed806112b6577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b83602001518560200151098160600181815250507f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed8061131f577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed80611374577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b82606001518360400151097f52036cee2b6ffe738cc740797779e89800700a4d4141d8ab75eb4dca135978a3098160800181815250507f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed806113ff577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b81608001517f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed61142f9190612721565b8260200151088160a00181815250507f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed80611493577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b81608001518260200151088160c00181815250507f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed806114fc577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed80611551577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b82606001517f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed6115819190612721565b7f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed806115d6577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b84604001517f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed6116069190612721565b7f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed8061165b577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed806116b0577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b89602001518a60000151087f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed80611710577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b8b602001518c60000151080908087f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed80611773577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b8360a00151846000015109098260000181815250507f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed806117dd577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed80611832577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b82604001518360600151087f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed80611892577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b8360c00151846000015109098260200181815250507f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed806118fc577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b8160c001518260a00151098260400181815250505092915050565b61191f612079565b6119276120bc565b7f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed8061197c577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b83602001518460000151088160000181815250507f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed806119e5577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b81600001518260000151098160200181815250507f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed80611a4e577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b83600001518460000151098160400181815250507f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed80611ab7577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b836020015184602001510981606001818152505080604001517f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed611afb9190612721565b8160800181815250507f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed80611b59577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b81606001518260800151088160a00181815250507f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed80611bc2577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b83604001518460400151098160e00181815250507f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed80611c2b577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed80611c80577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b8260e001516002097f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed611cb39190612721565b8260a00151088160c00181815250507f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed80611d17577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b8160c001517f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed80611d71577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b83606001517f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed611da19190612721565b7f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed80611df6577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b85604001517f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed611e269190612721565b86602001510808098260000181815250507f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed80611e8c577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed80611ee1577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b82606001517f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed611f119190612721565b8360800151088260a00151098260200181815250507f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed80611f7b577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b8160c001518260a001510982604001818152505050919050565b60008060027f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed611fc59190612721565b905060007f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed905060405160208152602080820152602060408201528460608201528260808201528160a082015260208160c0836005600019fa61202757600080fd5b80519350505050919050565b60405180610a000160405280605090602082028036833780820191505090505090565b604051806101000160405280600890602082028036833780820191505090505090565b60405180606001604052806000815260200160008152602001600081525090565b6040518060400160405280600290602082028036833780820191505090505090565b60405180610100016040528060008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081525090565b600061211461210f846125ff565b6125ce565b9050808285602086028201111561212a57600080fd5b60005b8581101561215a5781612140888261229f565b84526020840193506020830192505060018101905061212d565b5050509392505050565b600061217761217284612625565b6125ce565b9050808285602086028201111561218d57600080fd5b60005b858110156121bd57816121a3888261229f565b845260208401935060208301925050600181019050612190565b5050509392505050565b60006121da6121d58461264b565b6125ce565b905080828560208602820111156121f057600080fd5b60005b858110156122205781612206888261229f565b8452602084019350602083019250506001810190506121f3565b5050509392505050565b600082601f83011261223b57600080fd5b6002612248848285612101565b91505092915050565b600082601f83011261226257600080fd5b605061226f848285612164565b91505092915050565b600082601f83011261228957600080fd5b60086122968482856121c7565b91505092915050565b6000813590506122ae81612806565b92915050565b600080608083850312156122c757600080fd5b60006122d58582860161222a565b92505060406122e68582860161222a565b9150509250929050565b6000806060838503121561230357600080fd5b60006123118582860161222a565b92505060406123228582860161229f565b9150509250929050565b6000610a00828403121561233f57600080fd5b600061234d84828501612251565b91505092915050565b6000610100828403121561236957600080fd5b600061237784828501612278565b91505092915050565b6000806040838503121561239357600080fd5b60006123a18582860161229f565b92505060206123b28582860161229f565b9150509250929050565b6000806000606084860312156123d157600080fd5b60006123df8682870161229f565b93505060206123f08682870161229f565b92505060406124018682870161229f565b9150509250925092565b600080600080610a60858703121561242257600080fd5b60006124308782880161229f565b94505060206124418782880161229f565b93505060406124528782880161229f565b925050606061246387828801612251565b91505092959194509250565b600061247b8383612535565b60208301905092915050565b61249081612685565b61249a81846126b5565b92506124a582612671565b8060005b838110156124d65781516124bd878261246f565b96506124c88361269b565b9250506001810190506124a9565b505050505050565b6124e781612690565b6124f181846126c0565b92506124fc8261267b565b8060005b8381101561252d578151612514878261246f565b965061251f836126a8565b925050600181019050612500565b505050505050565b61253e81612755565b82525050565b61254d81612755565b82525050565b60006040820190506125686000830184612487565b92915050565b60006101008201905061258460008301846124de565b92915050565b600060208201905061259f6000830184612544565b92915050565b60006040820190506125ba6000830185612544565b6125c76020830184612544565b9392505050565b6000604051905081810181811067ffffffffffffffff821117156125f5576125f46127d7565b5b8060405250919050565b600067ffffffffffffffff82111561261a576126196127d7565b5b602082029050919050565b600067ffffffffffffffff8211156126405761263f6127d7565b5b602082029050919050565b600067ffffffffffffffff821115612666576126656127d7565b5b602082029050919050565b6000819050919050565b6000819050919050565b600060029050919050565b600060089050919050565b6000602082019050919050565b6000602082019050919050565b600081905092915050565b600081905092915050565b60006126d682612755565b91506126e183612755565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115612716576127156127a8565b5b828201905092915050565b600061272c82612755565b915061273783612755565b92508282101561274a576127496127a8565b5b828203905092915050565b6000819050919050565b600061276a82612755565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82141561279d5761279c6127a8565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61280f81612755565b811461281a57600080fd5b5056fea26469706673582212207e554260920b7034dfa13df1e87d0e8f30f0d4c78b28b24ddaadd54faac8a0ac64736f6c63430008000033";
const isSuperArgs = (xs) => xs.length > 1;
class SHA512__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    deploy(overrides) {
        return super.deploy(overrides || {});
    }
    getDeployTransaction(overrides) {
        return super.getDeployTransaction(overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
SHA512__factory.bytecode = _bytecode;
SHA512__factory.abi = _abi;
exports.SHA512__factory = SHA512__factory;

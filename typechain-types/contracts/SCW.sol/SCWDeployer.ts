/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export interface SCWDeployerInterface extends utils.Interface {
  functions: {
    "compareStrings(string,string)": FunctionFragment;
    "confirmNewAccountEmail(string,string,bytes,bytes,string,string)": FunctionFragment;
    "createNewAccount(string,string)": FunctionFragment;
    "deployNewSWC(string,address)": FunctionFragment;
    "getSCWAddressByEmail(string)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "compareStrings"
      | "confirmNewAccountEmail"
      | "createNewAccount"
      | "deployNewSWC"
      | "getSCWAddressByEmail"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "compareStrings",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "confirmNewAccountEmail",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<string>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "createNewAccount",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "deployNewSWC",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getSCWAddressByEmail",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "compareStrings",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "confirmNewAccountEmail",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createNewAccount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "deployNewSWC",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getSCWAddressByEmail",
    data: BytesLike
  ): Result;

  events: {
    "ReturnVal(bool)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ReturnVal"): EventFragment;
}

export interface ReturnValEventObject {
  arg0: boolean;
}
export type ReturnValEvent = TypedEvent<[boolean], ReturnValEventObject>;

export type ReturnValEventFilter = TypedEventFilter<ReturnValEvent>;

export interface SCWDeployer extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: SCWDeployerInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    compareStrings(
      a: PromiseOrValue<string>,
      b: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    confirmNewAccountEmail(
      _selector: PromiseOrValue<string>,
      _domain: PromiseOrValue<string>,
      _sig: PromiseOrValue<BytesLike>,
      _canonicalizedHeader: PromiseOrValue<BytesLike>,
      _emailToVerify: PromiseOrValue<string>,
      _nonceToVerify: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    createNewAccount(
      email: PromiseOrValue<string>,
      nonce: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    deployNewSWC(
      ownerEmail: PromiseOrValue<string>,
      ownerAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getSCWAddressByEmail(
      userAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;
  };

  compareStrings(
    a: PromiseOrValue<string>,
    b: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  confirmNewAccountEmail(
    _selector: PromiseOrValue<string>,
    _domain: PromiseOrValue<string>,
    _sig: PromiseOrValue<BytesLike>,
    _canonicalizedHeader: PromiseOrValue<BytesLike>,
    _emailToVerify: PromiseOrValue<string>,
    _nonceToVerify: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  createNewAccount(
    email: PromiseOrValue<string>,
    nonce: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  deployNewSWC(
    ownerEmail: PromiseOrValue<string>,
    ownerAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getSCWAddressByEmail(
    userAddress: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  callStatic: {
    compareStrings(
      a: PromiseOrValue<string>,
      b: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    confirmNewAccountEmail(
      _selector: PromiseOrValue<string>,
      _domain: PromiseOrValue<string>,
      _sig: PromiseOrValue<BytesLike>,
      _canonicalizedHeader: PromiseOrValue<BytesLike>,
      _emailToVerify: PromiseOrValue<string>,
      _nonceToVerify: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    createNewAccount(
      email: PromiseOrValue<string>,
      nonce: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    deployNewSWC(
      ownerEmail: PromiseOrValue<string>,
      ownerAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    getSCWAddressByEmail(
      userAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {
    "ReturnVal(bool)"(arg0?: null): ReturnValEventFilter;
    ReturnVal(arg0?: null): ReturnValEventFilter;
  };

  estimateGas: {
    compareStrings(
      a: PromiseOrValue<string>,
      b: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    confirmNewAccountEmail(
      _selector: PromiseOrValue<string>,
      _domain: PromiseOrValue<string>,
      _sig: PromiseOrValue<BytesLike>,
      _canonicalizedHeader: PromiseOrValue<BytesLike>,
      _emailToVerify: PromiseOrValue<string>,
      _nonceToVerify: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    createNewAccount(
      email: PromiseOrValue<string>,
      nonce: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    deployNewSWC(
      ownerEmail: PromiseOrValue<string>,
      ownerAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getSCWAddressByEmail(
      userAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    compareStrings(
      a: PromiseOrValue<string>,
      b: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    confirmNewAccountEmail(
      _selector: PromiseOrValue<string>,
      _domain: PromiseOrValue<string>,
      _sig: PromiseOrValue<BytesLike>,
      _canonicalizedHeader: PromiseOrValue<BytesLike>,
      _emailToVerify: PromiseOrValue<string>,
      _nonceToVerify: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    createNewAccount(
      email: PromiseOrValue<string>,
      nonce: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    deployNewSWC(
      ownerEmail: PromiseOrValue<string>,
      ownerAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getSCWAddressByEmail(
      userAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}

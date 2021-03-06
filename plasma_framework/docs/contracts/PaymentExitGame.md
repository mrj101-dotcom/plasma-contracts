# PaymentExitGame.sol

View Source: [contracts/src/exits/payment/PaymentExitGame.sol](../../contracts/src/exits/payment/PaymentExitGame.sol)

**↗ Extends: [IExitProcessor](IExitProcessor.md), [OnlyFromAddress](OnlyFromAddress.md), [PaymentStandardExitRouter](PaymentStandardExitRouter.md), [PaymentInFlightExitRouter](PaymentInFlightExitRouter.md)**

**PaymentExitGame**

The exit game contract implementation for Payment Transaction

## Contract Members
**Constants & Variables**

```js
struct PaymentExitGameArgs.Args private paymentExitGameArgs;
bool private initDone;

```

## Functions

- [(struct PaymentExitGameArgs.Args args)](#)
- [init()](#init)
- [processExit(uint168 exitId, uint256 , address token, address payable processor)](#processexit)
- [getStandardExitId(bool _isDeposit, bytes _txBytes, uint256 _utxoPos)](#getstandardexitid)
- [getInFlightExitId(bytes _txBytes)](#getinflightexitid)

### 

use struct PaymentExitGameArgs to avoid stack too deep compilation error.

```js
function (struct PaymentExitGameArgs.Args args) public nonpayable PaymentStandardExitRouter PaymentInFlightExitRouter 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| args | struct PaymentExitGameArgs.Args |  | 

### init

```js
function init() public nonpayable onlyFrom 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### processExit

⤾ overrides [IExitProcessor.processExit](IExitProcessor.md#processexit)

Callback processes exit function for the PlasmaFramework to call

```js
function processExit(uint168 exitId, uint256 , address token, address payable processor) external nonpayable onlyFrom 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| exitId | uint168 | The exit ID | 
|  | uint256 | exitId The exit ID | 
| token | address | Token (ERC20 address or address(0) for ETH) of the exiting output | 
| processor | address payable | The processExit initiator | 

### getStandardExitId

Helper function to compute the standard exit ID

```js
function getStandardExitId(bool _isDeposit, bytes _txBytes, uint256 _utxoPos) public pure
returns(uint168)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _isDeposit | bool |  | 
| _txBytes | bytes |  | 
| _utxoPos | uint256 |  | 

### getInFlightExitId

Helper function to compute the in-flight exit ID

```js
function getInFlightExitId(bytes _txBytes) public pure
returns(uint168)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _txBytes | bytes |  | 

## Contracts

* [Address](Address.md)
* [Bits](Bits.md)
* [BlockController](BlockController.md)
* [BlockModel](BlockModel.md)
* [BondSize](BondSize.md)
* [ECDSA](ECDSA.md)
* [Erc20DepositVerifier](Erc20DepositVerifier.md)
* [Erc20Vault](Erc20Vault.md)
* [EthDepositVerifier](EthDepositVerifier.md)
* [EthVault](EthVault.md)
* [ExitableTimestamp](ExitableTimestamp.md)
* [ExitBounty](ExitBounty.md)
* [ExitGameController](ExitGameController.md)
* [ExitGameRegistry](ExitGameRegistry.md)
* [ExitId](ExitId.md)
* [ExitPriority](ExitPriority.md)
* [FailFastReentrancyGuard](FailFastReentrancyGuard.md)
* [FeeClaimOutputToPaymentTxCondition](FeeClaimOutputToPaymentTxCondition.md)
* [FeeExitGame](FeeExitGame.md)
* [FungibleTokenOutputModel](FungibleTokenOutputModel.md)
* [GenericTransaction](GenericTransaction.md)
* [IERC20](IERC20.md)
* [IErc20DepositVerifier](IErc20DepositVerifier.md)
* [IEthDepositVerifier](IEthDepositVerifier.md)
* [IExitProcessor](IExitProcessor.md)
* [ISpendingCondition](ISpendingCondition.md)
* [IStateTransitionVerifier](IStateTransitionVerifier.md)
* [Math](Math.md)
* [Merkle](Merkle.md)
* [Migrations](Migrations.md)
* [MoreVpFinalization](MoreVpFinalization.md)
* [OnlyFromAddress](OnlyFromAddress.md)
* [OnlyWithValue](OnlyWithValue.md)
* [OutputId](OutputId.md)
* [Ownable](Ownable.md)
* [PaymentChallengeIFEInputSpent](PaymentChallengeIFEInputSpent.md)
* [PaymentChallengeIFENotCanonical](PaymentChallengeIFENotCanonical.md)
* [PaymentChallengeIFEOutputSpent](PaymentChallengeIFEOutputSpent.md)
* [PaymentChallengeStandardExit](PaymentChallengeStandardExit.md)
* [PaymentDeleteInFlightExit](PaymentDeleteInFlightExit.md)
* [PaymentEip712Lib](PaymentEip712Lib.md)
* [PaymentExitDataModel](PaymentExitDataModel.md)
* [PaymentExitGame](PaymentExitGame.md)
* [PaymentExitGameArgs](PaymentExitGameArgs.md)
* [PaymentInFlightExitModelUtils](PaymentInFlightExitModelUtils.md)
* [PaymentInFlightExitRouter](PaymentInFlightExitRouter.md)
* [PaymentInFlightExitRouterArgs](PaymentInFlightExitRouterArgs.md)
* [PaymentOutputToPaymentTxCondition](PaymentOutputToPaymentTxCondition.md)
* [PaymentPiggybackInFlightExit](PaymentPiggybackInFlightExit.md)
* [PaymentProcessInFlightExit](PaymentProcessInFlightExit.md)
* [PaymentProcessStandardExit](PaymentProcessStandardExit.md)
* [PaymentStandardExitRouter](PaymentStandardExitRouter.md)
* [PaymentStandardExitRouterArgs](PaymentStandardExitRouterArgs.md)
* [PaymentStartInFlightExit](PaymentStartInFlightExit.md)
* [PaymentStartStandardExit](PaymentStartStandardExit.md)
* [PaymentTransactionModel](PaymentTransactionModel.md)
* [PaymentTransactionStateTransitionVerifier](PaymentTransactionStateTransitionVerifier.md)
* [PlasmaFramework](PlasmaFramework.md)
* [PosLib](PosLib.md)
* [PriorityQueue](PriorityQueue.md)
* [Protocol](Protocol.md)
* [Quarantine](Quarantine.md)
* [RLPReader](RLPReader.md)
* [SafeERC20](SafeERC20.md)
* [SafeEthTransfer](SafeEthTransfer.md)
* [SafeMath](SafeMath.md)
* [SpendingConditionRegistry](SpendingConditionRegistry.md)
* [Vault](Vault.md)
* [VaultRegistry](VaultRegistry.md)

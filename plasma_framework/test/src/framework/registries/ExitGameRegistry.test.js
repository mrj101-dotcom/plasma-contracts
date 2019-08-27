const ExitGameRegistry = artifacts.require('ExitGameRegistryMock');
const DummyExitGame = artifacts.require('DummyExitGame');

const {
    BN, constants, expectEvent, expectRevert, time,
} = require('openzeppelin-test-helpers');
const { expect } = require('chai');

contract('ExitGameRegistry', ([_, other]) => {
    const MIN_EXIT_PERIOD = 60 * 60 * 24 * 7; // 1 week
    const INITIAL_IMMUNE_EXIT_GAMES_NUM = 0;
    const MVP_PROTOCOL = 1;
    const MORE_VP_PROTOCOL = 2;

    beforeEach(async () => {
        this.registry = await ExitGameRegistry.new(MIN_EXIT_PERIOD, INITIAL_IMMUNE_EXIT_GAMES_NUM);
        this.dummyExitGame = (await DummyExitGame.new());
    });

    describe('onlyFromNonQuarantinedExitGame', () => {
        beforeEach(async () => {
            this.dummyTxType = 1;
            await this.registry.registerExitGame(this.dummyTxType, this.dummyExitGame.address, MORE_VP_PROTOCOL);
            await this.dummyExitGame.setExitGameRegistry(this.registry.address);
        });

        it('should revert when the exit game contract is still quarantined', async () => {
            await expectRevert(
                this.dummyExitGame.checkOnlyFromNonQuarantinedExitGame(),
                'ExitGame is quarantined',
            );
        });

        it('accepts call when called by registered exit game contract on passed quarantine period', async () => {
            await time.increase(3 * MIN_EXIT_PERIOD + 1);
            expect(await this.dummyExitGame.checkOnlyFromNonQuarantinedExitGame()).to.be.true;
        });

        it('reverts when not called by registered exit game contract', async () => {
            await expectRevert(
                this.registry.checkOnlyFromNonQuarantinedExitGame(),
                'Not being called by registered exit game contract',
            );
        });
    });

    describe('registerExitGame', () => {
        describe('When succeed', () => {
            beforeEach(async () => {
                this.txType = 1;
                this.registerTx = await this.registry.registerExitGame(
                    this.txType, this.dummyExitGame.address, MVP_PROTOCOL,
                );
            });

            it('should be able to receive exit game address with tx type', async () => {
                expect(await this.registry.exitGames(this.txType)).to.equal(this.dummyExitGame.address);
            });

            it('should be able to receive tx type with exit game contract address', async () => {
                expect(await this.registry.exitGameToTxType(this.dummyExitGame.address))
                    .to.be.bignumber.equal(new BN(this.txType));
            });

            it('should be able to receive protocol with tx type', async () => {
                expect(await this.registry.protocols(this.txType))
                    .to.be.bignumber.equal(new BN(MVP_PROTOCOL));
            });

            it('should emit ExitGameRegistered event', async () => {
                await expectEvent.inTransaction(
                    this.registerTx.receipt.transactionHash,
                    ExitGameRegistry,
                    'ExitGameRegistered',
                    {
                        txType: new BN(this.txType),
                        exitGameAddress: this.dummyExitGame.address,
                        protocol: new BN(MVP_PROTOCOL),
                    },
                );
            });
        });

        it('should be able to register for both MVP and MoreVP protocol', async () => {
            await Promise.all([MVP_PROTOCOL, MORE_VP_PROTOCOL].map(
                async (protocol, index) => {
                    const txType = index + 1;
                    const contract = (await DummyExitGame.new());
                    await this.registry.registerExitGame(
                        txType, contract.address, protocol,
                    );
                    expect(await this.registry.protocols(txType))
                        .to.be.bignumber.equal(new BN(protocol));
                },
            ));
        });

        it('rejects when not registered by operator', async () => {
            await expectRevert(
                this.registry.registerExitGame(
                    1, this.dummyExitGame.address, MORE_VP_PROTOCOL, { from: other },
                ),
                'Not being called by operator',
            );
        });

        it('rejects when trying to register with tx type 0', async () => {
            await expectRevert(
                this.registry.registerExitGame(0, this.dummyExitGame.address, MORE_VP_PROTOCOL),
                'should not register with tx type 0',
            );
        });

        it('rejects when trying to register with empty address', async () => {
            await expectRevert(
                this.registry.registerExitGame(1, constants.ZERO_ADDRESS, MORE_VP_PROTOCOL),
                'should not register with an empty exit game address',
            );
        });

        it('rejects when protocol value is not MVP or MoreVP value', async () => {
            // 1 and 2 are the protocol values.
            // use 0 and 3 for nearby value and 255 for max value.
            const nonProtocolValues = [0, 3, 255];
            await Promise.all(nonProtocolValues.map(async (protocol, index) => {
                const txType = index + 1;
                const contract = (await DummyExitGame.new());
                await expectRevert(
                    this.registry.registerExitGame(txType, contract.address, protocol),
                    'Wrong protocol value',
                );
            }));
        });

        it('rejects when the tx type is already registered', async () => {
            const txType = 1;
            const secondDummyExitGameAddress = (await DummyExitGame.new()).address;
            await this.registry.registerExitGame(txType, this.dummyExitGame.address, MORE_VP_PROTOCOL);
            await expectRevert(
                this.registry.registerExitGame(txType, secondDummyExitGameAddress, MORE_VP_PROTOCOL),
                'The tx type is already registered',
            );
        });

        it('rejects when the the exit game address is already registered', async () => {
            await this.registry.registerExitGame(1, this.dummyExitGame.address, MORE_VP_PROTOCOL);
            await expectRevert(
                this.registry.registerExitGame(2, this.dummyExitGame.address, MORE_VP_PROTOCOL),
                'The exit game contract is already registered',
            );
        });
    });
});

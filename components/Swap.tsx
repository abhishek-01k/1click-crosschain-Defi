// @ts-nocheck
import { Assets, Chains, SwapSDK, SwapSDKOptions } from '@chainflip/sdk/swap';
import React from 'react';
import { useActiveAccount } from 'thirdweb/react';
import { ethers6Adapter } from "thirdweb/adapters/ethers6";
import { createThirdwebClient } from 'thirdweb';
import { sepolia } from 'thirdweb/chains'

const Swap = () => {
    const activeAccount = useActiveAccount();


    const options : SwapSDKOptions= {
        network: "perseverance", // Testnet
        backendServiceUrl: "https://example.chainflip.io",
        signer: activeAccount!,
        broker: {
            url: 'https://my.broker.io',
            commissionBps: 0, // basis points, i.e. 100 = 1%
        },
    };


    const swapSDK = new SwapSDK(options);
    console.log("Swao SDK ", swapSDK);

    const getChains = async () => {
        const chains = await swapSDK.getChains();
        console.log("Chains >>>", chains);

        const getAssets = await swapSDK.getAssets(Chains.Ethereum);
        console.log("Get Assets >>>", getAssets);

    }

    const getQuote = async () => {
        const quoteRequest = {
            srcChain: Chains.Ethereum,
            destChain: Chains.Bitcoin,
            srcAsset: Assets.ETH,
            destAsset: Assets.BTC,
            amount: (1.5e18).toString(), // 1.5 ETH
            brokerCommissionBps: 100, // 100 basis point = 1%
            affiliateBrokers: [
                { account: "cFM8kRvLBXagj6ZXvrt7wCM4jGmHvb5842jTtXXg3mRHjrvKy", commissionBps: 50 }
            ],
        };

        const quote = await swapSDK.getQuote(quoteRequest);
        console.log("quote>>>>", quote);


    }

    const getRequestAddressAndSwap = async () => {
        const swapDepositAddressRequest = {
            srcChain: Chains.Ethereum,
            destChain: Chains.Bitcoin,
            srcAsset: Assets.ETH,
            destAsset: Assets.BTC,
            destAddress: "2MsaVJmmydsnLve6PCnRTTS9UVgZHAB8Hrq", // btc address
            amount: (1.5e18).toString(), // 1.5 ETH
            brokerCommissionBps: 100, // 100 basis point = 1%
            affiliateBrokers: [
                { account: "cFM8kRvLBXagj6ZXvrt7wCM4jGmHvb5842jTtXXg3mRHjrvKy", commissionBps: 50 }
            ], // total commission 150 bps = 1.5%
            // maxBoostFeeBps: 10
        };

        const requestDepositAddress = await swapSDK.requestDepositAddress(swapDepositAddressRequest)
        console.log("requestDepositAddress >>>>", requestDepositAddress);

    }

    const client = createThirdwebClient({ clientId: "9dbaca0c09760c29ab2aec57240823c9" });


    const handleSwap = async () => {

        if (activeAccount) {
            const ethersSigner = await ethers6Adapter.signer.toEthers({
                client,
                chain: sepolia,
                account: activeAccount,
            });

            console.log("Signer ", ethersSigner);


            const options = {
                network: "perseverance", // Testnet
                backendServiceUrl: "https://example.chainflip.io",
                signer: ethersSigner,
                broker: {
                    url: 'https://my.broker.io',
                    commissionBps: 0, // basis points, i.e. 100 = 1%
                },
            };


            const swapSDK = new SwapSDK(options);

            console.log("swapSDK 2 ", swapSDK);


            const quote = await swapSDK.getQuote({
                srcChain: Chains.Ethereum,
                srcAsset: Assets.ETH,
                destChain: Chains.Bitcoin,
                destAsset: Assets.BTC,
                amount: (0.1e18).toString(), // 0.1 ETH
            });
            console.log('quote', quote);

            const transactionHash = await swapSDK.executeSwap({
                srcChain: Chains.Ethereum,
                srcAsset: Assets.ETH,
                destChain: Chains.Bitcoin,
                destAsset: Assets.BTC,
                amount: (0.1e18).toString(), // 0.1 ETH
                destAddress: '2MsaVJmmydsnLve6PCnRTTS9UVgZHAB8Hrq',
            });
            console.log('transaction', transactionHash);

            const status = await swapSDK.getStatus({
                id: transactionHash,
            });
            console.log('status', status);

        }

    }

    const getStatus = async () => {
        const res = await swapSDK.getStatus({
            id: '1730352-Ethereum-17'
        });
        console.log("Res >>", res);

    }

    return (
        <div>
            Swap
            <br />

            <button onClick={getChains}>Get Chains </button>
            <br />

            <button onClick={getQuote}>Get Quote </button>
            <br />

            <button onClick={getRequestAddressAndSwap}> Get Request And Swap</button>
            <br />

            <button onClick={handleSwap}> Handle Swap</button>

            <br />

            <button onClick={getStatus}> getStatus </button>
        </div>
    );
};

export default Swap;
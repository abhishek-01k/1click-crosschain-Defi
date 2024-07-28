"use client";

import { type AssetValue, type Chain, ProviderName, WalletOption } from "@swapkit/helpers";
import { atom, useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { evmWallet } from "@swapkit/wallet-evm-extensions";
import { coinbaseWallet } from "@swapkit/wallet-coinbase";
import { keplrWallet } from "@swapkit/wallet-keplr";
import { walletconnectWallet } from "@swapkit/wallet-wc";
import { xdefiWallet } from "@swapkit/wallet-xdefi";

type Todo = any;

const swapKitAtom = atom<Todo | null>(null);
const balanceAtom = atom<AssetValue[]>([]);
const walletState = atom<{ connected: boolean; type: WalletOption | null }>({
  connected: false,
  type: null,
});

if (typeof global === "undefined") {
  (window as any).global = window;
}


export const useSwapKit = () => {
  const [swapKit, setSwapKit] = useAtom(swapKitAtom);
  const [balances, setBalances] = useAtom(balanceAtom);
  const [{ type: walletType, connected: isWalletConnected }, setWalletState] = useAtom(walletState);

  useEffect(() => {
    const loadSwapKit = async () => {
      const { SwapKit } = await import("@swapkit/core");
      const { ChainflipPlugin } = await import("@swapkit/plugin-chainflip");
      const { ThorchainPlugin, MayachainPlugin } = await import("@swapkit/plugin-thorchain");

      const wallets = {
        ...evmWallet,
        ...coinbaseWallet,
        ...keplrWallet,
        ...walletconnectWallet,
        ...xdefiWallet,
      };

      console.log(wallets, "wallets");

      const swapKitClient = SwapKit({
        config: {
          blockchairApiKey:
            process.env.NEXT_PUBLIC_BLOCKCHAIR_API_KEY || "A___Tcn5B16iC3mMj7QrzZCb2Ho1QBUf",
          covalentApiKey:
            process.env.NEXT_PUBLIC_COVALENT_API_KEY || "cqt_rQ6333MVWCVJFVX3DbCCGMVqRH4q",
          ethplorerApiKey: process.env.NEXT_PUBLIC_ETHPLORER_API_KEY || "freekey",
          walletConnectProjectId: "",
          keepkeyConfig: {
            apiKey: localStorage.getItem("keepkeyApiKey") || "",
            pairingInfo: {
              name: "THORSwap",
              imageUrl: "https://www.thorswap.finance/logo.png",
              basePath: "swap",
              url: "https://app.thorswap.finance",
            },
          },
        },
        wallets,
        plugins: { ...ThorchainPlugin, ...ChainflipPlugin, ...MayachainPlugin },
      });

      // 3QWjbQ8EwLoznHNMSrmYMRcDXcHSsckTsV

      // const res = await swapKitClient.chainflip;
      // const txn = await res.swap({
      //   pluginName: 'chainflip',
      //   route: {
      //     "path": "ETH.ETH -> BTC.BTC",
      //     "providers": [
      //       ProviderName.CHAINFLIP
      //     ],
      //     "subProviders": [
      //       "THORCHAIN"
      //     ],
      //     "swaps": {
      //       "THORCHAIN": [
      //         [
      //           {
      //             "from": "ETH.ETH",
      //             "to": "BTC.BTC",
      //             "parts": [
      //               {
      //                 "provider": "THORCHAIN",
      //                 "percentage": 100
      //               }
      //             ]
      //           }
      //         ]
      //       ]
      //     },
      //     "expectedOutput": "0.00527538",
      //     "expectedOutputMaxSlippage": "0.00351692",
      //     "expectedOutputUSD": "336.274659936019",
      //     "expectedOutputMaxSlippageUSD": "224.18310662401268",
      //     "transaction": {
      //       "from": "0x9452BCAf507CD6547574b78B810a723d8868C85a",
      //       "to": "0xD37BbE5744D730a1d98d8DC97c42F0Ca46aD7146",
      //       "value": "0x16345785d8a0000",
      //       "data": "0x44bc937b000000000000000000000000cbf928ef41b190db22a42c4e00d24e9cfca070f00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000016345785d8a000000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000006696e1dc00000000000000000000000000000000000000000000000000000000000000343d3a623a6263317178686d64756673766e75616161657234796e7a3838667370647378713268396539636574646a3a3a743a3330000000000000000000000000",
      //       "gas": "0xaec8",
      //       "gasPrice": 14
      //     },
      //     "optimal": true,
      //     "complete": true,
      //     "fees": {
      //       "THOR": [
      //         {
      //           "type": "inbound",
      //           "asset": "ETH.ETH",
      //           "networkFee": 0.000626416,
      //           "networkFeeUSD": 2.17695846816,
      //           "affiliateFee": 0,
      //           "affiliateFeeUSD": 0,
      //           "totalFee": 0.000626416,
      //           "totalFeeUSD": 2.17695846816,
      //           "isOutOfPocket": true
      //         },
      //         {
      //           "type": "outbound",
      //           "asset": "BTC.BTC",
      //           "networkFee": 0.00003654,
      //           "networkFeeUSD": 2.380618469544554,
      //           "affiliateFee": 0.00001606044292238372,
      //           "affiliateFeeUSD": 1.0237594224769455,
      //           "isOutOfPocket": false,
      //           "slipFee": 1e-7,
      //           "slipFeeUSD": 0.006374415870250465,
      //           "totalFee": 0.00005270044292238372,
      //           "totalFeeUSD": 3.41075230789175
      //         }
      //       ]
      //     },
      //     "meta": {
      //       "hasStreamingSwap": false,
      //       "slippagePercentage": 50,
      //       "sellChain": "ETH",
      //       "sellChainGasRate": "30",
      //       "buyChain": "BTC",
      //       "buyChainGasRate": "13",
      //       "priceProtectionRequired": false,
      //       "priceProtectionDetected": false,
      //       "quoteMode": "TC-TC",
      //       "thornodeMeta": {
      //         "expectedAmountOut": {
      //           "assetAmount": "0.00527538",
      //           "baseAmount": "527538",
      //           "decimal": 8,
      //           "asset": {
      //             "chain": "BTC",
      //             "symbol": "BTC",
      //             "ticker": "BTC",
      //             "type": "Native",
      //             "network": "Bitcoin",
      //             "name": "BTC",
      //             "decimal": 8,
      //             "isSynth": false
      //           },
      //           "amount": {
      //             "assetAmount": "0.00527538",
      //             "baseAmount": "527538",
      //             "decimal": 8
      //           }
      //         },
      //         "expectedAmountOutStreaming": {
      //           "assetAmount": "0.00527538",
      //           "baseAmount": "527538",
      //           "decimal": 8,
      //           "asset": {
      //             "chain": "BTC",
      //             "symbol": "BTC",
      //             "ticker": "BTC",
      //             "type": "Native",
      //             "network": "Bitcoin",
      //             "name": "BTC",
      //             "decimal": 8,
      //             "isSynth": false
      //           },
      //           "amount": {
      //             "assetAmount": "0.00527538",
      //             "baseAmount": "527538",
      //             "decimal": 8
      //           }
      //         },
      //         "expiry": 1721161552,
      //         "fees": {
      //           "affiliate": {
      //             "assetAmount": "0.00001598",
      //             "baseAmount": "1598",
      //             "decimal": 8
      //           },
      //           "asset": {
      //             "chain": "BTC",
      //             "symbol": "BTC",
      //             "ticker": "BTC",
      //             "type": "Native",
      //             "network": "Bitcoin",
      //             "name": "BTC",
      //             "decimal": 8,
      //             "isSynth": false
      //           },
      //           "outbound": {
      //             "assetAmount": "0.00003654",
      //             "baseAmount": "3654",
      //             "decimal": 8
      //           },
      //           "liquidity": {
      //             "assetAmount": "0.0000001",
      //             "baseAmount": "10",
      //             "decimal": 8
      //           },
      //           "slippageBps": 0,
      //           "total": {
      //             "assetAmount": "0.00005262",
      //             "baseAmount": "5262",
      //             "decimal": 8
      //           },
      //           "totalBps": 98
      //         },
      //         "inboundAddress": "0xcbf928ef41b190db22a42c4e00d24e9cfca070f0",
      //         "inboundConfirmationBlocks": 2,
      //         "inboundConfirmationSeconds": 24,
      //         "maxStreamingQuantity": 1,
      //         "memo": "=:BTC.BTC:bc1qxhmdufsvnuaaaer4ynz88fspdsxq2h9e9cetdj:0/1/1:t:30",
      //         "notes": "Base Asset: Send the inbound_address the asset with the memo encoded in hex in the data field. Tokens: First approve router to spend tokens from user: asset.approve(router, amount). Then call router.depositWithExpiry(inbound_address, asset, amount, memo, expiry). Asset is the token contract address. Amount should be in native asset decimals (eg 1e18 for most tokens). Do not send to or from contract addresses.",
      //         "outboundDelayBlocks": 0,
      //         "outboundDelaySeconds": 0,
      //         "recommendedMinAmountIn": "1586289",
      //         "router": "0xD37BbE5744D730a1d98d8DC97c42F0Ca46aD7146",
      //         "slippageBps": 0,
      //         "streamingSlippageBps": 0,
      //         "streamingSwapBlocks": 0,
      //         "streamingSwapSeconds": 0,
      //         "totalSwapSeconds": 24,
      //         "warning": "Do not cache this response. Do not send funds after the expiry."
      //       },
      //       "recommendedSlippage": 50,
      //       "warnings": [
      //         {
      //           "warningCode": "1003",
      //           "warningMessage": "Swap size is small. No limit is set for this swap to avoid partial refunds."
      //         },
      //         {
      //           "warningCode": "5003",
      //           "warningMessage": "Default slippage is used for this quote"
      //         }
      //       ]
      //     },
      //     "inboundAddress": "0xcbf928ef41b190db22a42c4e00d24e9cfca070f0",
      //     "targetAddress": "0xD37BbE5744D730a1d98d8DC97c42F0Ca46aD7146",
      //     "estimatedTime": 624,
      //     "calldata": {
      //       "depositWithExpiry": "0.1",
      //       "vault": "0xcbf928ef41b190db22a42c4e00d24e9cfca070f0",
      //       "asset": "ETH.ETH",
      //       "amount": "100000000000000000",
      //       "memo": "=:b:bc1qxhmdufsvnuaaaer4ynz88fspdsxq2h9e9cetdj::t:30",
      //       "memoStreamingSwap": "",
      //       "expiration": "1721164252",
      //       "fromAsset": "ETH.ETH",
      //       "amountIn": "100000000000000000"
      //     },
      //     "contract": "0xD37BbE5744D730a1d98d8DC97c42F0Ca46aD7146",
      //     "contractMethod": "depositWithExpiry",
      //     "approvalTarget": "0xD37BbE5744D730a1d98d8DC97c42F0Ca46aD7146",
      //     "approvalToken": null,
      //     "evmTransactionDetails": {
      //       "contractAddress": "0xD37BbE5744D730a1d98d8DC97c42F0Ca46aD7146",
      //       "contractMethod": "depositWithExpiry",
      //       "contractParams": [
      //         "0.1",
      //         "0xcbf928ef41b190db22a42c4e00d24e9cfca070f0",
      //         "ETH.ETH",
      //         "100000000000000000",
      //         "=:b:bc1qxhmdufsvnuaaaer4ynz88fspdsxq2h9e9cetdj::t:30",
      //         "1721164252"
      //       ],
      //       "contractParamsStreaming": [],
      //       "contractParamsNames": [
      //         "depositWithExpiry",
      //         "vault",
      //         "asset",
      //         "amount",
      //         "memo",
      //         "expiration"
      //       ],
      //       "approvalToken": null,
      //       "approvalSpender": "0xD37BbE5744D730a1d98d8DC97c42F0Ca46aD7146"
      //     },
      //     "timeEstimates": {
      //       "inboundMs": 24000,
      //       "outboundMs": 600000,
      //       "streamingMs": 0,
      //       "swapMs": 6000
      //     },
      //     "index": 0
      //   },
      // })

      console.log(swapKitClient, "swapkitclient");
      setSwapKit(swapKitClient);
    };

    loadSwapKit();
  }, [setSwapKit]);

  const getBalances = useCallback(
    async (refresh?: boolean) => {
      if (!refresh && balances.length) return;

      const connectedChains =
        (Object.keys(swapKit?.connectedChains || {}).filter(Boolean) as Chain[]) || [];

      let nextBalances: AssetValue[] = [];

      for (const chain of connectedChains) {
        const balance = await swapKit?.getBalance(chain);

        if (balance) {
          nextBalances = nextBalances.concat(balance);
        }
      }

      setBalances(nextBalances.sort((a, b) => a.getValue("number") - b.getValue("number")));
    },
    [swapKit, setBalances, balances],
  );

  const connectWallet = useCallback(
    (option: WalletOption, chains: Chain[]) => {
      console.log(connectWallet, "connectWallet", swapKit);
      switch (option) {
        case WalletOption.XDEFI: {
          swapKit?.connectXDEFI(chains);
          break;
        }
        case WalletOption.METAMASK: {
          swapKit?.connectMetaMask(chains);
          break;
        }

        default:
          break;
      }

      setWalletState({ connected: !!swapKit?.getAddress(chains[0]), type: option });

      getBalances();
    },
    [setWalletState, getBalances, swapKit],
  );

  const disconnectWallet = useCallback(() => {
    for (const chain of Object.keys(swapKit?.connectedChains || {})) {
      swapKit?.disconnectChain(chain as Chain);
    }

    setWalletState({ connected: false, type: null });
  }, [setWalletState, swapKit]);

  const checkIfChainConnected = useCallback(
    (chain: Chain) => !!swapKit?.getAddress(chain),
    [swapKit?.getAddress],
  );

  return {
    balances,
    checkIfChainConnected,
    connectWallet,
    disconnectWallet,
    getBalances,
    isWalletConnected,
    setSwapKit,
    swapKit,
    walletType,
  };
};

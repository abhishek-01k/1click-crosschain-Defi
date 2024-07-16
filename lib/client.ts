import { SwapKit } from "@swapkit/core";
import { MayachainPlugin, ThorchainPlugin } from "@swapkit/plugin-thorchain";
import { ChainflipPlugin } from "@swapkit/plugin-chainflip";
import { evmWallet } from "@swapkit/wallet-evm-extensions";
import { coinbaseWallet } from "@swapkit/wallet-coinbase";
import { keplrWallet } from "@swapkit/wallet-keplr";
import { keystoreWallet } from "@swapkit/wallet-keystore";
import { talismanWallet } from "@swapkit/wallet-talisman";
import { walletconnectWallet } from "@swapkit/wallet-wc";
import { xdefiWallet } from "@swapkit/wallet-xdefi";

export type SwapKitClient = ReturnType<typeof SwapKit>;

const plugins = {
  ...ChainflipPlugin,
  ...MayachainPlugin,
  ...ThorchainPlugin,
};

const wallets = {
  ...evmWallet,
  ...coinbaseWallet,
  ...keplrWallet,
  ...keystoreWallet,
  ...walletconnectWallet,
  ...xdefiWallet,
};


const clientCache = new Map<string, SwapKitClient>();

const swapKitParams = {
  ethplorerApiKey: 'freekey',
  covalentApiKey: '',
  blockchairApiKey: '',
  walletConnectProjectId: '',
  stagenet: false,
};

export const getSwapKitClient = (
) => {
  const key = JSON.stringify(swapKitParams);
  if (clientCache.has(key)) return clientCache.get(key);

  const client = SwapKit({ ...swapKitParams, wallets, plugins });

  clientCache.set(key, client);

  return client;
};

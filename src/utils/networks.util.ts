import { NetworkInfo } from "./types.util";
import westend2ChainSpec from "@/../public/chainspecs/westend2.json";
import paseoChainSpec from "@/../public/chainspecs/paseo.json";

export const SUPPORTED_NETWORK: Record<string, NetworkInfo> = {
  westend2: {
    id: "westend2",
    name: "Westend",
    logo: `/westend_logo.png`,
    provider: "wss://westend-rpc.dwellir.com:443",
    prefix: 42,
    symbol: "WND",
    decimals: 12,
    faucetUrl: "https://faucet.polkadot.io/westend",
    subscanUrl: "https://westend.api.subscan.io",
    chainSpecFileName: JSON.stringify(westend2ChainSpec),
  },
  paseo: {
    id: "paseo",
    name: "Paseo Testnet",
    logo: "/paseo.png",
    provider: "wss://paseo.rpc.amforc.com:443",
    prefix: 42,
    symbol: "PAS",
    decimals: 12,
    faucetUrl: "https://faucet.polkadot.io/paseo",
    subscanUrl: "",
    chainSpecFileName: JSON.stringify(paseoChainSpec),
  },
};

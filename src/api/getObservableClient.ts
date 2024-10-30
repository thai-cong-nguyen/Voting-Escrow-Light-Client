// // Instead of using `@polkadot-api`, we use `dedot` to make efficiently
// import { DedotClient, SmoldotProvider } from "dedot";
// import { Unstable } from "@substrate/connect-discovery";
// import type { PolkadotApi } from "@dedot/chaintypes";

// export const getObservableClient = async (
//   provider: Unstable.Provider,
//   chainId: string
// ) => {
//   const client = await DedotClient.new<PolkadotApi>(provider);
//   if (!client) throw new Error("unknown chain");
//   return getObservableClient_(createClient(chain.connect));
// };

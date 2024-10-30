import { Props } from "../utils/types.util";
import { DedotClient, SmoldotProvider } from "dedot";
import * as smoldot from "smoldot";
import westend2ChainSpec from "@/../public/chainspecs/westend2.json";
import { PolkadotApi } from "@dedot/chaintypes";

export const useSubstrateConnect = async ({
  chainSpec,
  cacheMetadata = false,
}: Props) => {
  const smoldotInstance = smoldot.start();
  const chain = await smoldotInstance.addChain({
    chainSpec,
  });
  const provider = new SmoldotProvider(chain);
  const client = new DedotClient<PolkadotApi>({ provider, cacheMetadata });
  return {
    provider,
    client,
  };
};

import { Connection, NetworkInfo } from "@/utils/types.util";
import {
  DedotClient,
  JsonRpcProvider,
  SmoldotProvider,
  WsProvider,
} from "dedot";
import { useState } from "react";
import { useAsync, useLocalStorage, useToggle } from "react-use";
import { PolkadotApi } from "@dedot/chaintypes";
import * as smoldot from "smoldot";

type UseApi = {
  ready: boolean;
  api?: DedotClient<PolkadotApi>;
};

export default function useApi(
  network?: NetworkInfo,
  connection?: Connection,
  cacheMetadata?: boolean
): UseApi {
  const [ready, setReady] = useToggle(false);
  const [api, setApi] = useState<DedotClient<PolkadotApi>>();
  const [provider, setProvider] = useState<JsonRpcProvider>();

  useAsync(async () => {
    if (!network || !connection) {
      return;
    }
    if (api?.status == "connected") {
      await api.disconnect();
    }
    if (provider?.status == "connected") {
      await provider.disconnect();
    }
    setReady(false);
    if (connection == Connection.RPC_ENDPOINT) {
      const wsProvider = new WsProvider(network.provider);
      setProvider(wsProvider);
      await wsProvider.connect();
      const wsClient = await DedotClient.new<PolkadotApi>({
        provider: wsProvider,
        cacheMetadata,
      });
      setProvider(wsProvider);
      setApi(wsClient);
    } else {
      const smoldotInstance = smoldot.start();
      const chain = await smoldotInstance.addChain({
        chainSpec: network.chainSpecFileName || "",
      });
      const scProvider = new SmoldotProvider(chain);
      await scProvider.connect();
      const scClient = new DedotClient<PolkadotApi>({
        provider: scProvider,
        cacheMetadata,
      });
      setProvider(scProvider);
      setApi(scClient);
    }
    if (api && api.status != "connected") {
      if (provider && provider.status != "connected") {
        await provider.connect();
      }
      await api.connect();
    }
    setReady(true);
  }, [
    network?.provider,
    // network?.chainSpecFileName,
    // connection,
    // cacheMetadata,
  ]);

  return { ready, api };
}

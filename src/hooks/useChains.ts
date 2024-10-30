import { PageChain } from "@substrate/light-client-extension-helpers/background";
import { DedotClient } from "dedot";
import React, { useEffect, useState } from "react";
import { Unstable } from "@substrate/connect-discovery";
import { useIsMounted } from "./useIsMounted";
import { useSubstrateConnect } from "./useSubstrateConnect";

export const useChains = (provider?: Unstable.Provider) => {
  const [chains, setChains] = useState<Unstable.RawChains>({});
  const isMounted = useIsMounted();

  useEffect(() => {
    const chains = provider?.getChains();
    if (!isMounted()) return;
    setChains(chains ?? {});
  }, [provider, isMounted]);

  useEffect(
    () =>
      provider?.addChainsChangeListener((chains) => {
        setChains(chains);
      }),
    [provider]
  );

  return { chains };
};

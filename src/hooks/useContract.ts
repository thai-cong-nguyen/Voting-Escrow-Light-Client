import { useState } from "react";
import { useAsync } from "react-use";
import { useApiContext } from "@/providers/ApiProvider";
import {
  Contract,
  ContractMetadata,
  GenericContractApi,
} from "dedot/contracts";

export default function useContract<
  T extends GenericContractApi = GenericContractApi,
>(metadata?: string | ContractMetadata, address?: string) {
  const { api, network } = useApiContext();
  const [contract, setContract] = useState<Contract<T>>();

  useAsync(async () => {
    if (!api || !metadata || !address) {
      if (contract) {
        setContract(undefined);
      }
      return;
    }

    setContract(new Contract<T>(api as any, metadata as any, address));
  }, [api, metadata, address]);

  return {
    contract,
  };
}

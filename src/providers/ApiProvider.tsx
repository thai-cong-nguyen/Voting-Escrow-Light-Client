'use client';
import { SUPPORTED_NETWORK } from "@/utils/networks.util";
import { Connection, NetworkInfo, Props } from "@/utils/types.util";
import { DedotClient } from "dedot";
import { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from 'react-use';
import useApi from "@/hooks/useApi";
import { useWalletContext } from "./WalletProvider";
import { PolkadotApi } from "@dedot/chaintypes";

interface ApiContextProps {
    api?: DedotClient<PolkadotApi>;
    apiReady: boolean;
    network: NetworkInfo;
    setNetwork: (one: NetworkInfo) => void;
    defaultCaller?: string;
    connection: Connection;
    setConnection: (one: Connection) => void;
    isCachedMetadata: boolean;
    setIsCachedMetadata: (one: boolean) => void;
}

const DEFAULT_NETWORK = SUPPORTED_NETWORK['westend2'];
const DEFAULT_CALLER = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY' // Alice
const DEFAULT_CONNECTION = Connection.RPC_ENDPOINT;
const DEFAULT_IS_CACHED_METADATA = false;

export const ApiContext = createContext<ApiContextProps>({
    apiReady: false,
    network: DEFAULT_NETWORK,
    setNetwork: () => { },
    connection: DEFAULT_CONNECTION,
    setConnection: () => { },
    isCachedMetadata: DEFAULT_IS_CACHED_METADATA,
    setIsCachedMetadata: () => { },
    defaultCaller: DEFAULT_CALLER,
})

export const useApiContext = () => {
    return useContext(ApiContext);
}

export default function ApiProvider({ children }: Props) {
    const { injectedApi } = useWalletContext();
    const [network, setNetwork] = useLocalStorage<NetworkInfo>('SELECTED_NETWORK', DEFAULT_NETWORK);
    const [connection, setConnection] = useLocalStorage<Connection>('SELECTED_CONNECTION', DEFAULT_CONNECTION);
    const [isCachedMetadata, setIsCachedMetadata] = useLocalStorage<boolean>('SETTINGS/CACHE_METADATA', DEFAULT_IS_CACHED_METADATA)
    const { ready, api } = useApi(network, connection, isCachedMetadata);

    useEffect(() => {
        api?.setSigner(injectedApi?.signer);
    }, [injectedApi, api])

    return (
        <ApiContext.Provider
            value={{ api, apiReady: ready, network: network!, setNetwork, defaultCaller: DEFAULT_CALLER, connection: connection!, setConnection, isCachedMetadata: isCachedMetadata!, setIsCachedMetadata }}
        >
            {children}
        </ApiContext.Provider>
    )
}

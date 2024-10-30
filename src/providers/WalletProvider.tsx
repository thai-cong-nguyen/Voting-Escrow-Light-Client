'use client';
import useWallets from "@/hooks/useWallets";
import { InjectedAccount, Props } from "@/utils/types.util";
import Wallet from "@/wallets/Wallet";
import { Injected } from "@polkadot/extension-inject/types";
import { createContext, useContext, useState } from "react";
import { useAsync, useLocalStorage } from "react-use";

interface WalletContextProps {
    accounts: InjectedAccount[];
    injectedApi?: Injected;
    enableWallet: (id: string) => void;
    signOut: () => void;
    availableWallets: Wallet[];
    connectedWalletId?: string;
    connectedWallet?: Wallet;
    selectedAccount?: InjectedAccount;
    setSelectedAccount: (account: InjectedAccount) => void;
}

export const WalletContext = createContext<WalletContextProps>({
    accounts: [],
    enableWallet: () => { },
    signOut: () => { },
    availableWallets: [],
    setSelectedAccount: () => { },
});

export const useWalletContext = () => {
    return useContext(WalletContext);
}

export default function WalletProvider({ children }: Props) {
    const availableWallets = useWallets();
    const [accounts, setAccounts] = useState<InjectedAccount[]>([]);
    const [injectedApi, setInjectedApi] = useState<Injected>();
    const [connectedWalletId, setConnectedWalletId, removeConnectedWalletId] =
        useLocalStorage<string>('CONNECTED_WALLET');
    const [connectedWallet, setConnectedWallet] = useState<Wallet>();
    const [selectedAccount, setSelectedAccount, removeSelectedAccount] =
        useLocalStorage<InjectedAccount>('SELECTED_ACCOUNT');

    const getWallet = (id: string): Wallet => {
        const targetWallet = availableWallets.find((data) => data.id === id);

        if (!targetWallet) {
            throw new Error('Invalid Wallet Id');
        }

        return targetWallet
    }

    useAsync(async () => {
        if (!connectedWalletId) {
            setConnectedWallet(undefined);
            return;
        }

        let unsub: () => void;

        try {
            const targetWallet = getWallet(connectedWalletId);
            setConnectedWallet(targetWallet);
            await targetWallet.waitUntilReady();

            const injectedProvider = targetWallet.injectedProvider;
            if (!injectedProvider?.enable) {
                throw new Error('Wallet is not existed!');
            }

            const injectedApi = await injectedProvider.enable("Simple DAO Voting Escrow");
            unsub = injectedApi.accounts.subscribe(setAccounts);

            setInjectedApi(injectedApi);
        } catch (error) {
            console.log(error)
            setConnectedWallet(undefined);
            removeConnectedWalletId();
        }

        return () => unsub && unsub();
    }, [connectedWalletId]);

    const enableWallet = async (walletId: string) => {
        setConnectedWalletId(walletId);
    };

    const signOut = () => {
        removeConnectedWalletId();
        setInjectedApi(undefined);
        removeSelectedAccount();
    };

    return (
        <WalletContext.Provider
            value={{
                accounts,
                enableWallet,
                injectedApi,
                signOut,
                availableWallets,
                connectedWalletId,
                connectedWallet,
                selectedAccount,
                setSelectedAccount,
            }}>
            {children}
        </WalletContext.Provider>
    );
}
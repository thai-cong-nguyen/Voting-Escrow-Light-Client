import useBalances from '@/hooks/useBalances';
import useDisplayAddress from '@/hooks/useDisplayAddress';
import { useApiContext } from '@/providers/ApiProvider';
import { useWalletContext } from '@/providers/WalletProvider'
import React, { useEffect, useMemo } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDownIcon } from 'lucide-react';
import { formatBalance, shortenAddress } from '@/utils/format.util';
import ConnectedWallet from '../ConnectedWallet';
import WalletSelection, { ButtonStyle } from '../ConnectedButton';

function AccountSelection() {
    const { accounts, selectedAccount, setSelectedAccount, signOut } = useWalletContext();
    const { network } = useApiContext();
    const addresses = useMemo(() => accounts.map((account) => account.address), [accounts]);
    const balances = useBalances(addresses);
    const displayAddress = useDisplayAddress(selectedAccount?.address);

    useEffect(() => {
        if (selectedAccount && accounts.map((account) => account.address).includes(selectedAccount.address)) {
            return;
        }
        setSelectedAccount(accounts[0])
    }, [accounts, selectedAccount, setSelectedAccount]);

    if (!selectedAccount) {
        return <></>
    }

    const { name, address } = selectedAccount;

    return (
        <DropdownMenu >
            <DropdownMenuTrigger className='flex flex-row items-center justify-center gap-2 shadow-md rounded-full bg-inherit text'>
                <span className='text-sm font-medium'>
                    {shortenAddress(displayAddress)}
                </span>
                <ChevronDownIcon width={20} height={20} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <ConnectedWallet />
                {accounts.length > 0 && <DropdownMenuSeparator />}
                {accounts.map((one) => (
                    <DropdownMenuItem
                        key={one.address}
                        onClick={() => setSelectedAccount(one)}
                        className='flex flex-row items-center justify-center gap-2'
                    >
                        <div className="flex flex-col items-center justify-center">
                            <span className='font-medium'>{one.name}</span>

                            <span className='text-xs'>Address: {shortenAddress(one.address)}</span>
                            <span className='text-xs'>
                                Balance: {formatBalance(balances[one.address]?.free) || '0'} {network.symbol}
                            </span>
                        </div>
                    </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <WalletSelection
                    buttonStyle={ButtonStyle.MENU_ITEM}
                    buttonLabel='Switch Wallet'
                    buttonProps={{ color: 'primary.500' }}
                />
                <DropdownMenuItem onClick={signOut} color='red.500'>
                    Sign Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default AccountSelection
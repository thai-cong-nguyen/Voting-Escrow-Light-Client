"use client";
import React from 'react'
import Nav from './Nav'
import { useWalletContext } from '@/providers/WalletProvider';
import { Button } from '../ui/button';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { PersonStandingIcon, SwordsIcon, BoxIcon, GavelIcon, BackpackIcon, ChevronDownCircleIcon, StoreIcon } from 'lucide-react'
import MenuNavigate from './MenuNavigate';
import WalletSelection from '../ConnectedButton';
import AccountSelection from './AccountSelection';
import NetworkSelection from './NetworkSelection';
import Settings from './Settings';

const Header = () => {
    const { injectedApi } = useWalletContext();
    return (
        <header className="top-0 z-30 transition-all sticky bg-gray-900 text-2xl text-primary w-full h-full">
            <div className="container mx-auto relative px-10 py-5">
                <div className="flex flex-row justify-between items-center gap-5">
                    <MenuNavigate />
                    <div className="flex flex-row items-center justify-center gap-5 w-full">
                        {/* Connection Selection */}
                        <NetworkSelection />
                        {
                            injectedApi ? <AccountSelection /> : <WalletSelection />
                        }
                        <Settings />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
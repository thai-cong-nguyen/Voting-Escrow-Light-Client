'use client';
import { useApiContext } from '@/providers/ApiProvider';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React from 'react'
import Image from 'next/image';
import { LoadingSpinner } from '../LoadingSpinner';
import { SUPPORTED_NETWORK } from '@/utils/networks.util';
import { Button } from '../ui/button';

export default function NetworkSelection() {
    const { apiReady } = useApiContext();
    const { network, setNetwork } = useApiContext();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex flex-row items-center justify-center gap-5 rounded-full shadow-md bg-secondary text-primary text-base font-bold p-2 hover:scale-95 transition-all ease-linear duration-75 ">
                    <Image src={network.logo} alt={network.name} width={30} height={30} className='rounded-md' />
                    <span>{network.name}</span>
                    <div className="">
                        {
                            apiReady ? <div className="rounded-full w-5 h-5 bg-green-500" /> : <LoadingSpinner className='text-black' />
                        }
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {
                    Object.values(SUPPORTED_NETWORK).map((data) => (
                        <DropdownMenuItem
                            key={data.id}
                            onClick={() => setNetwork(data)}
                            className={`flex flex-row items-center gap-2`}
                        >
                            <Image src={data.logo} alt={data.name} width={20} height={20} className='rounded-md' />
                            <span>{data.name}</span>
                        </DropdownMenuItem>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

'use client';
import React, { useEffect, useState } from 'react'
import ConnectButton from './ConnectedButton';
import { Button } from './ui/button';
import Link from 'next/link';
import { ArrowBigDownDashIcon, ChevronDownIcon } from 'lucide-react';

export const Dashboard = () => {
    return <div className='w-full h-full min-h-screen flex flex-col items-center justify-center gap-4'>
        <span className='text-5xl font-bold text-primary'>New Governance - Next Generation</span>
        <span className='text-base font-medium text-secondary'>Voting Escrow Mechanism</span>
        <div className="flex flex-row items-center justify-center gap-10 w-full">
            <div className="flex flex-col items-center justify-center group hover:scale-95 transition-all ease-linear duration-75">
                <Button asChild>
                    <Link href={"/staking"} className='text-xl font-bold group-hover:scale-95 transition-all ease-linear duration-75'>
                        Staking
                    </Link>
                </Button>
                <ChevronDownIcon height={50} width={50} className='group-hover:scale-95 transition-all ease-linear duration-75 text-xl font-bold' />
            </div>
            <div className="flex flex-col items-center justify-center hover:scale-95 transition-all ease-linear duration-75">
                <Button asChild>
                    <Link href={"/voting"} className='group-hover:scale-95 transition-all ease-linear duration-75 text-xl font-bold'>
                        Voting
                    </Link>
                </Button>
                <ChevronDownIcon height={50} width={50} className='group-hover:scale-95 transition-all ease-linear duration-75 text-xl font-bold' />
            </div>
        </div>
    </div>
}

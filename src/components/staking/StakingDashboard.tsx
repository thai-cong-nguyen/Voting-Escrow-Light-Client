'use client';
import React, { useState } from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';

function StakingDashboard() {
    const [stakingAmount, setStakingAmount] = useState<number | undefined>(0);
    const [dashboardLoading, setDashboardLoading] = useState<boolean>(false);

    const stakeHandle = () => {

    }

    return (
        <div className='flex flex-row justify-center gap-5 w-full h-full py-10 px-20'>
            <div className="flex flex-col justify-center bg-secondary gap-5 w-full h-full rounded-xl p-5">
                <span className="text-xl font-bold">Staking Your Token:</span>
                <div className="flex flex-col justify-center gap-2">
                    <div className="flex flex-row items-center justify-center gap-5">
                        <span className="text-base font-medium">Amount:</span>
                        <Input type='number' step={0.0001} value={stakingAmount || 0} onChange={(event) => {
                            setStakingAmount(Number.parseFloat(event.currentTarget.value))
                        }} />
                    </div>
                    <div className="flex flex-row items-center gap-2 text-sm font-medium ml-5">
                        <span className='text-primary/60'>Your balance: </span>
                        <span className="">0</span>
                        <span className="">$ESC</span>
                    </div>
                </div>
                <Button className='' onClick={stakeHandle}>Stake your token</Button>

            </div>
            <div className="flex flex-col justify-center bg-secondary w-full h-full rounded-xl p-5">
                <span className="text-xl font-bold">Staking Dashboard</span>
                {dashboardLoading
                    ? <></>
                    : <div className="flex flex-col justify-center gap-5 p-5">
                        <div className="flex flex-row items-center gap-2">
                            <span className="text-lg font-bold">Total Staking: </span>
                            <span className=''>0</span>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <span className="text-lg font-bold">Your Staking: </span>
                            <span className=''>0</span>
                        </div>
                    </div>}
            </div>
        </div>
    )
}

export default StakingDashboard
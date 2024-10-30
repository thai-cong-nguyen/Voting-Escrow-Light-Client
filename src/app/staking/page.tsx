import StakingDashboard from '@/components/staking/StakingDashboard'
import React from 'react'

function StakingPage() {
    return (
        <div className='min-h-screen bg-staking_bg bg-no-repeat bg-cover bg-local bg-center'>
            <StakingDashboard />
        </div>
    )
}

export default StakingPage
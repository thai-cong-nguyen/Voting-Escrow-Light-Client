import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '../ui/button'

function TransferDashboard() {
    return (
        <div className='flex flex-col items-center justify-center gap-4 w-full h-full'>
            <div className="flex flex-row items-center gap-2">
                <span>Receiver:</span>
                <Input />
            </div>
            <div className="flex flex-row items-center gap-2">
                <span>Amount:</span>
                <Input />
            </div>
            <Button>Transfer</Button>
        </div>
    )
}

export default TransferDashboard
'use client';
import React, { useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { SettingsIcon } from 'lucide-react';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Connection, NetworkInfo } from '@/utils/types.util';
import { useApiContext } from '@/providers/ApiProvider';
import { Switch } from '../ui/switch';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

interface SettingsProps {
    // network?: NetworkInfo;
}

function Settings({ }: SettingsProps) {
    const { connection, isCachedMetadata, setIsCachedMetadata, setConnection } = useApiContext();
    const [connectionConfig, setConnectionConfig] = useState<{
        connection: Connection,
        isCachedMetadata: boolean
    }>({
        connection: connection || Connection.RPC_ENDPOINT,
        isCachedMetadata: isCachedMetadata || false,
    })
    // const router = useRouter();

    return (
        <Dialog>
            <DialogTrigger className='flex flex-row items-center justify-center gap-5 rounded-full shadow-md bg-secondary text-primary text-lg font-bold w-fit p-2'>
                <SettingsIcon height={20} width={20} />
            </DialogTrigger>
            <DialogContent className='p-5 w-full'>
                <DialogHeader>
                    <DialogTitle className='flex flex-row items-center gap-1'>
                        <SettingsIcon height={20} width={20} />
                        <span className='text-xl font-bold'>Settings</span>
                    </DialogTitle>
                    <DialogDescription >
                    </DialogDescription>

                </DialogHeader>
                <div className='flex flex-col justify-center gap-5'>
                    <div className="flex flex-col justify-center gap-2">
                        <span className='text-base font-bold'>Connect via:</span>
                        <RadioGroup defaultValue={connectionConfig.connection} className="" onValueChange={(value: string) => {
                            if (value != connectionConfig.connection) {
                                setConnectionConfig({
                                    ...connectionConfig,
                                    connection: value == Connection.RPC_ENDPOINT ? Connection.RPC_ENDPOINT : Connection.LIGHT_CLIENT
                                })
                            }
                        }}>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value={Connection.RPC_ENDPOINT} id={Connection.RPC_ENDPOINT} />
                                <Label htmlFor="option-one">RPC Endpoint</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value={Connection.LIGHT_CLIENT} id={Connection.LIGHT_CLIENT} />
                                <Label htmlFor="option-two">Light Client (Smoldot)</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    {/* <Separator /> */}
                    <div className="flex flex-row items-center gap-2">
                        <span className='text-base font-bold'>Cache metadata?</span>
                        <Switch defaultChecked={connectionConfig.isCachedMetadata} checked={connectionConfig.isCachedMetadata} onCheckedChange={(checked: boolean) => {
                            if (checked != connectionConfig.isCachedMetadata) {
                                setConnectionConfig({
                                    ...connectionConfig,
                                    isCachedMetadata: checked
                                })
                            }
                        }} />
                    </div>
                </div>
                <DialogFooter className="flex flex-row items-center sm:justify-start justify-center gap-2 w-full">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button type='button' className='' onClick={() => {
                            if (connection != connectionConfig.connection || isCachedMetadata != connectionConfig.isCachedMetadata) {
                                setConnection(connectionConfig.connection);
                                setIsCachedMetadata(connectionConfig.isCachedMetadata);
                                window.location.reload();
                            }
                        }}>Save</Button>
                    </DialogClose>

                </DialogFooter>
            </DialogContent>
        </Dialog >

    )
}

export default Settings
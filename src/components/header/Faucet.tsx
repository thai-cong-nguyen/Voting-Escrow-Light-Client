'use client';
import React, { useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from "@chakra-ui/react"
import { useDebounce } from 'react-use';

const Faucet = () => {
    // const { isConnected, address } = useAccount();
    // const [inputData, setInputData] = React.useState<string | undefined>(isConnected ? address as string : undefined);
    // const [value] = useDebounce(inputData, 1000);
    return (
        <Dialog>
            <DialogTrigger>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 hover:opacity-80"><g clipPath="url(#clip0_58_106)"><rect width="16" height="16" rx="4" fill="#0284C7"></rect><path d="M13.0094 7.0098H12.5548V6.01306C12.5548 3.63489 10.6138 1.69388 8.2356 1.69388C5.85742 1.69388 3.91641 3.63489 3.91641 6.01306V16.3476H3.00711C2.72733 16.3476 2.5 16.575 2.5 16.8547V18.3061H7.27383V16.8547C7.27383 16.575 7.04651 16.3476 6.76672 16.3476H5.85742V6.01306C5.85742 4.70157 6.9241 3.65237 8.21811 3.65237C9.51212 3.65237 10.5788 4.71906 10.5788 6.01306V7.0098H10.1067C9.82687 7.0098 9.59955 7.23712 9.59955 7.51691V8.46118C9.59955 8.74097 9.82687 8.96829 10.1067 8.96829H12.9919C13.2717 8.96829 13.4991 8.74097 13.4991 8.46118V7.51691C13.5165 7.23712 13.2892 7.0098 13.0094 7.0098Z" fill="#B9E2F8"></path><path d="M11.8903 10.1224C11.8378 10 11.6979 9.93005 11.5755 9.93005C11.4356 9.93005 11.3132 10 11.2608 10.1224C11.2608 10.1224 10.5263 11.5388 10.369 11.8711C10.1766 12.2733 10.1766 12.6929 10.369 13.0951C10.5963 13.5498 11.0684 13.847 11.5755 13.847C11.7854 13.847 11.9952 13.7946 12.1876 13.7072C12.5023 13.5498 12.7471 13.27 12.8695 12.9203C12.9745 12.5705 12.957 12.2033 12.7996 11.8885L11.8903 10.1224Z" fill="#B9E2F8"></path></g><defs><clipPath id="clip0_58_106"><rect width="16" height="16" rx="4" fill="white"></rect></clipPath></defs></svg>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Do you want to get more Kakarotto?</DialogTitle>
                    <div className="">
                        This faucet will give you 100 Kakarotto every 24 hours.
                    </div>
                </DialogHeader>
                <Input placeholder='Input your address here'
                // value={ value} 
                // onChange={(e) => setInputData(e.target.value)} 
                />
                <Button onClick={() => {
                    // if (inputData && !isAddress(inputData)) {
                    //     toaster.create({
                    //         title: "Faucet Failed",
                    //         description: "Your wallet address is invalid",
                    //         type: "error",
                    //         placement: "bottom-end"
                    //     });
                    // }

                }}
                // disabled={!inputData}
                >Drip token</Button>
            </DialogContent>
        </Dialog>
    )
}

export default Faucet
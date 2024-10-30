import React from "react";
import Link from "next/link";
import Image from "next/image";
import WebsiteWallet from "@/wallets/WebsiteWallet";
import { useWalletContext } from "@/providers/WalletProvider";


export default function ConnectedWallet() {
    const { connectedWallet } = useWalletContext();
    const walletUrl = connectedWallet instanceof WebsiteWallet ? connectedWallet.walletUrl : undefined;

    return (
        <div className="flex flex-row items-center justify-center gap-2">
            <Link href={walletUrl || ""}>
                <Image src={connectedWallet?.logo || ""} alt={connectedWallet?.name || "Wallet"} width={32} />
            </Link>
            <div className="flex flex-col items-center justify-center">
                <span className="font-semibold">{connectedWallet?.name}</span>
                <span className="text-base">
                    {connectedWallet?.id} - v{connectedWallet?.version}
                </span>
            </div>
        </div>
    )
}
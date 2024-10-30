import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { ReloadIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { useWalletContext } from "@/providers/WalletProvider";
import Wallet from "@/wallets/Wallet";
import Image from "next/image";
import { useDisclosure } from "@chakra-ui/react";

interface WalletButtonProps {
    walletInfo: Wallet;
    afterSelectWallet?: () => void;
}

const WalletButton = ({ walletInfo, afterSelectWallet }: WalletButtonProps) => {
    const { name, id, logo, ready, installed } = walletInfo;
    const { enableWallet } = useWalletContext();

    const connectWallet = () => {
        enableWallet(id);

        afterSelectWallet && afterSelectWallet();
    };

    return (
        <Button
            onClick={connectWallet}
            disabled={!installed || (installed && !ready)}
            className="w-full text-lg flex flex-row items-center justify-center gap-4"
        >
            {
                installed && !ready ?
                    <>
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        <span>{name}</span>
                    </> :
                    <>
                        <Image src={logo} alt={`${name}`} width={24} height={24} />
                        <span>{name}</span>
                    </>
            }

        </Button>
    );
};

export enum ButtonStyle {
    BUTTON,
    MENU_ITEM,
}

type StyledButtonProps = React.ComponentProps<typeof Button>

interface WalletSelectionProps {
    buttonStyle?: ButtonStyle;
    buttonLabel?: string;
    buttonProps?: StyledButtonProps;
}

export default function WalletSelection({
    buttonStyle = ButtonStyle.BUTTON,
    buttonLabel = "Connect Wallet",
    buttonProps,
}: WalletSelectionProps) {
    const { open, onOpen, onClose } = useDisclosure();
    const { availableWallets } = useWalletContext();
    return (
        <>
            {buttonStyle === ButtonStyle.MENU_ITEM && (
                <MenubarItem
                // onClick={onOpen}
                >
                    {buttonLabel}
                </MenubarItem>
            )}
            {buttonStyle === ButtonStyle.BUTTON && (
                <Button
                    className="text-base rounded-full hover:shadow-md font-bold hover:scale-95 transition-all ease-linear duration-75 "
                    variant="outline"
                    onClick={onOpen}
                    {...buttonProps}
                >
                    {buttonLabel}
                </Button>
            )}
            <Dialog open={open} onOpenChange={onClose}>
                <DialogContent className="text-sm">
                    <DialogHeader>Select Wallet to Connect</DialogHeader>
                    <DialogTrigger />
                    <DialogContent className="mb-4">
                        <div className="">
                            {availableWallets.map((one) => (
                                <WalletButton
                                    key={one.id}
                                    walletInfo={one}
                                    afterSelectWallet={onClose}
                                />
                            ))}
                        </div>
                    </DialogContent>
                </DialogContent>
            </Dialog>
        </>
    );
}
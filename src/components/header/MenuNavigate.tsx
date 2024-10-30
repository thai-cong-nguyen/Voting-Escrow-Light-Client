"use client";
import { HomeIcon } from "@radix-ui/react-icons";
import { HandCoinsIcon, VoteIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type HeaderMenuLink = {
    label: string;
    href: string;
    icon?: React.ReactNode;
};

export const menuLinks: HeaderMenuLink[] = [
    {
        label: "Home",
        href: "/",
        icon: <HomeIcon height={20} width={20} />,
    },
    {
        label: "Staking",
        href: "/staking",
        icon: <HandCoinsIcon height={20} width={20} />,
    },
    {
        label: "Voting",
        href: "/voting",
        icon: <VoteIcon height={20} width={20} />,
    },
];

const MenuNavigate = () => {
    const pathName = usePathname();
    return (
        <div className="flex flex-row items-center gap-2 text-secondary w-full ">
            {menuLinks.map((link) => (
                <Link href={link.href} key={link.label} className={`flex items-center justify-center gap-2 ${pathName === link.href ? "bold" : "semibold"} py-2 px-4 rounded-full hover:scale-95 transition-all ease-linear duration-75 shadow-md ${pathName === link.href ? "#89d7e9" : ""} `}>
                    {link.icon}
                    <span className="text-xl font-bold">{link.label}</span>
                </Link>
            ))
            }
        </div >
    );
};

export default MenuNavigate;
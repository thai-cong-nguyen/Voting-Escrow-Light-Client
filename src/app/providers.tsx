import React from "react";

// Provider
import ThemeProvider from "@/providers/ThemeProvider";
import WalletProvider from "@/providers/WalletProvider";
import ApiProvider from "@/providers/ApiProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        // <ThemeProvider>
        <WalletProvider>
            <ApiProvider>
                {children}
            </ApiProvider>
        </WalletProvider>
        // </ThemeProvider>
    );
};

export default Providers;

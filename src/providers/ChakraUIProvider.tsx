'use client';
import * as React from 'react'
import { Provider as ChakraProvider } from "@/components/ui/provider"

export default function ChakraUIProvider({
    children
}: {
    children: React.ReactNode
}) {
    return <ChakraProvider>
        {children}
    </ChakraProvider>
}
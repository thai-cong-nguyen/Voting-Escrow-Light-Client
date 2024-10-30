// import { useMediaQuery } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { shortenAddress } from '@/utils/format.util';

export default function useDisplayAddress(inputAddress?: string) {
    const [displayAddress, setDisplayAddress] = useState<string | undefined>(inputAddress);
    // const [isMobile] = useMediaQuery('(max-width: 600px)');
    const isMobile = false;

    useEffect(() => {
        setDisplayAddress(
            isMobile ? shortenAddress(inputAddress) : inputAddress
        );
    }, [isMobile, inputAddress]);

    return displayAddress;
}
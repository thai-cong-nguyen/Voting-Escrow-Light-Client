import { useEffect, useState } from 'react';
import { useAppContext } from '@/providers/WalletProvider';
import { InjectedAccount } from '@polkadot/extension-inject/types';
import { Box, Button, Card, CardBody, CardFooter, CardHeader, HStack, Stack, Text } from '@chakra-ui/react';
import { formatBalance } from '@/utils/format.util';
import { FrameSystemAccountInfo } from 'dedot/chaintypes';
Card
// import TransferModalButton from './TransferModalButton';

const ConnectedAccount = () => {
    const { getConnectedAccount, disconnectSubWallet, dedotClient,
        // transfer 
    } = useAppContext();
    const [account, setAccount] = useState<InjectedAccount | undefined>(undefined);
    const [balance, setBalance] = useState<bigint | undefined>(undefined);

    useEffect(() => {
        getConnectedAccount().then((acc) => {
            setAccount(acc);
        });
    }, [getConnectedAccount]);

    useEffect(() => {
        if (!dedotClient || !account) return;
        let unsub: any;
        (async () => {
            unsub = await dedotClient?.query.system.account(account.address, (balance: FrameSystemAccountInfo) => {
                setBalance(balance?.data.free);
            });
        })();
        return () => {
            unsub && unsub();
        };
    }, [account, dedotClient]);

    return (
        <Stack spaceX={3} spaceY={3}>
            <Card.Root>
                <Card.Header>
                    <Text fontSize='lg' as='b'>
                        Connected Account
                    </Text>
                </Card.Header>
                <Card.Body>
                    <Box>
                        Name:{' '}
                        <Text color={'green'} as='b'>
                            {account?.name}
                        </Text>
                    </Box>
                    <Box>
                        Address:{' '}
                        <Text color={'orange'} as='b'>
                            {account?.address}
                        </Text>
                    </Box>
                    <Box>
                        Balance:{' '}
                        <Text color={'red'} fontSize={'lg'} as='b'>
                            {/* {balance ? formatBalance(balance, WESTEND.decimals) : 'loading ...'} */}
                        </Text>
                    </Box>
                </Card.Body>
                <Card.Footer>
                    <HStack spaceX={3} spaceY={3}>
                        {/* <TransferModalButton /> */}
                        <Button onClick={() => disconnectSubWallet()} colorScheme={'red'}>
                            Disconnect
                        </Button>
                    </HStack>
                </Card.Footer>
            </Card.Root>
        </Stack>
    );
};

export default ConnectedAccount;
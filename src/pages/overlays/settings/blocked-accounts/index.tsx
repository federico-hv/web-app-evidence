import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  CloseButton,
  Heading,
  HStack,
  VStack,
} from '@holdr-ui/react';
import { makePath, Paths } from '../../../../shared';

function BlockedAccountsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <VStack
      h={600}
      gap={4}
      divider={<Box h='1px' w='full' bgColor='rgba(152, 152, 255, 0.1)' />}
    >
      <HStack justify='space-between' px={5} pt={5}>
        <Heading size={6} weight={500}>
          Blocked Accounts
        </Heading>
        <CloseButton
          onClick={() =>
            navigate(
              location.state.previousLocation ??
                makePath([Paths.settings, Paths.setting.privacy]),
            )
          }
          variant='outline'
          colorTheme='white500'
          css={{
            height: '1.5rem !important',
            width: '1.5rem !important',
          }}
        />
      </HStack>
      <VStack px={5} flex={1} justify='space-between'></VStack>
    </VStack>
  );
}

export default BlockedAccountsPage;

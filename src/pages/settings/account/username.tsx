import {
  Input,
  VStack,
  HStack,
  Button,
  Box,
  FormControl,
} from '@holdr-ui/react';
import { HeaderLayout } from 'layouts';
import { Head } from 'components';
import { Paths } from 'shared';
import { useAuthContext } from 'hooks';

function UsernameSettingPage() {
  const { currentUser } = useAuthContext();
  return (
    <>
      <Head
        title='Update username'
        description='Change your username.'
        url={`${Paths.settings}/${Paths.setting.username}`}
      />
      <HeaderLayout title='Username'>
        <VStack as='form'>
          <Box px={4} pb={5} borderBottom={2} borderColor='base100'>
            <FormControl>
              <FormControl.Label>Username</FormControl.Label>
              <Input defaultValue={currentUser?.username} />
            </FormControl>
          </Box>
        </VStack>
        <HStack p={4} justify='flex-end'>
          <Button disabled={true}>Update</Button>
        </HStack>
      </HeaderLayout>
    </>
  );
}
UsernameSettingPage.displayName = 'UsernameSettingPage';

export default UsernameSettingPage;

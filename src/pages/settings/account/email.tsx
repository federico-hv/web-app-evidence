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

function EmailSettingPage() {
  return (
    <>
      <Head
        title='Update email'
        description='Change your email.'
        url={`${Paths.settings}/${Paths.setting.username}`}
      />
      <HeaderLayout title='Email'>
        <VStack as='form'>
          <Box px={4} pb={5} borderBottom={2} borderColor='base100'>
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input defaultValue='takdev@gmail.com' />
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
EmailSettingPage.displayName = 'EmailSettingPage';

export default EmailSettingPage;

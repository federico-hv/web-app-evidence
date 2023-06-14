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

function PhoneSettingPage() {
  return (
    <>
      <Head
        title='Update phone'
        description='Change your phone number.'
        url={`${Paths.settings}/${Paths.setting.phone}`}
      />
      <HeaderLayout title='Phone'>
        <VStack as='form'>
          <Box px={4} pb={5} borderBottom={2} borderColor='base100'>
            <FormControl>
              <FormControl.Label>Phone</FormControl.Label>
              <Input defaultValue={'+1555555555'} />
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
PhoneSettingPage.displayName = 'PhoneSettingPage';

export default PhoneSettingPage;

import { Input, VStack, HStack, Button, Box } from '@holdr-ui/react';
import { HeaderLayout } from 'layouts';
import { Head } from 'components';
import { Age, Paths } from 'shared';
import dayjs from 'dayjs';

function BirthdaySettingPage() {
  return (
    <>
      <Head
        title='Update birthday'
        description='Change your birthday.'
        url={`${Paths.settings}/${Paths.setting.birthday}`}
      />
      <HeaderLayout title='Birthday'>
        <VStack as='form'>
          <Box px={4} pb={5} borderBottom={2} borderColor='base100'>
            <Input
              type='date'
              min={dayjs().subtract(Age.max, 'y').format('YYYY-MM-DD')}
              max={dayjs().subtract(Age.min, 'y').format('YYYY-MM-DD')}
            />
          </Box>
        </VStack>
        <HStack p={4} justify='flex-end'>
          <Button disabled={true}>Update</Button>
        </HStack>
      </HeaderLayout>
    </>
  );
}
BirthdaySettingPage.displayName = 'BirthdaySettingPage';

export default BirthdaySettingPage;

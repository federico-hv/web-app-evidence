import {
  Text,
  VStack,
  HStack,
  Button,
  Radio,
  Input,
} from '@holdr-ui/react';
import { HeaderLayout } from 'layouts';
import { Head } from 'components';
import { Paths } from 'shared';

function GenderSettingPage() {
  return (
    <>
      <Head
        title='Update gender'
        description='Change your gender.'
        url={`${Paths.settings}/${Paths.setting.gender}`}
      />
      <HeaderLayout title='Gender'>
        <VStack
          as='form'
          gap={4}
          p={4}
          borderBottom={2}
          borderTop={2}
          borderColor='base100'
        >
          <VStack as='fieldset' gap={3}>
            <HStack justify='space-between' items='center'>
              <Text id='Gender_Male'>Male</Text>
              <Radio labelledBy='Gender_Male' name='gender' />
            </HStack>
            <HStack justify='space-between' items='center'>
              <Text id='Gender_Female'>Female</Text>
              <Radio labelledBy='Gender_Male' name='gender' />
            </HStack>
            <HStack justify='space-between' items='center'>
              <Text id='Gender_Specify'>Specify</Text>
              <Radio labelledBy='Gender_Male' name='gender' />
            </HStack>
          </VStack>
          <Input />
        </VStack>
        <HStack p={4} justify='flex-end'>
          <Button disabled={true}>Update</Button>
        </HStack>
      </HeaderLayout>
    </>
  );
}
GenderSettingPage.displayName = 'GenderSettingPage';

export default GenderSettingPage;

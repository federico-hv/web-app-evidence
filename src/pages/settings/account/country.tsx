import {
  VStack,
  HStack,
  Button,
  Box,
  FormControl,
  Select,
} from '@holdr-ui/react';
import { HeaderLayout } from 'layouts';
import { Head } from 'components';
import { Paths } from 'shared';
import countryList from 'country-list';
import { capitalize } from 'lodash';

function CountrySettingPage() {
  const countries = Object.keys(countryList.getNameList());
  return (
    <>
      <Head
        title='Update country'
        description='Change your country.'
        url={`${Paths.settings}/${Paths.setting.country}`}
      />
      <HeaderLayout title='Country'>
        <VStack as='form'>
          <Box px={4} pb={5} borderBottom={2} borderColor='base100'>
            <FormControl>
              <FormControl.Label>Country</FormControl.Label>
              <Select defaultValue='canada'>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {capitalize(country)}
                  </option>
                ))}
              </Select>
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
CountrySettingPage.displayName = 'CountrySettingPage';

export default CountrySettingPage;

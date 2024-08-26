import { Fragment, useState } from 'react';
import {
  TimePeriodEnum,
  useVisitsByCountrySuspenseQuery,
} from '../../../../features';
import {
  darkSelectCSS,
  RadialSurface2,
  SelectInputField,
} from '../../../../shared';
import {
  Box,
  Center,
  Circle,
  Heading,
  HStack,
  Text,
  VStack,
} from '@holdr-ui/react';
import { Chart } from 'react-google-charts';
import countries from '../../../../shared/components/country-picker/data/countries';

function VisitsByCountryChart() {
  const [period, setPeriod] = useState<TimePeriodEnum>(
    TimePeriodEnum.threeMonths,
  );

  const { data: visitsByCountryData } =
    useVisitsByCountrySuspenseQuery(period);

  const colors = ['#A2E2B3', '#FFE2A6', '#E28A97', '#B9B9FF', '#eca88b'];

  const data = visitsByCountryData.visitsByCountry.map((item) => [
    item.x,
    item.y,
  ]);

  return (
    <RadialSurface2 position='relative' w='100%' p={4} radius={3}>
      <HStack
        pb={2}
        w='100%'
        justify='space-between'
        borderBottom={1}
        borderColor='#9898FF1A'
      >
        <Heading size={5} weight={400}>
          Visits by Country
        </Heading>
        <Box>
          <SelectInputField
            position='popper'
            value={period.toString()}
            onValueChange={(value) =>
              setPeriod(value as unknown as TimePeriodEnum)
            }
            triggerCSS={{ width: 150, ...darkSelectCSS }}
            options={[
              { value: TimePeriodEnum.threeMonths, label: '3 months' },
              { value: TimePeriodEnum.sixMonths, label: '6 months' },
              { value: TimePeriodEnum.oneYear, label: '1 year' },
            ]}
            keySelector={({ label }) => label}
            labelSelector={({ label }) => label}
            valueSelector={({ value }) => value.toString()}
            name='countryVisitsPeriod'
          />
        </Box>
      </HStack>
      {data.length === 0 ? (
        <Center h='100%'>
          <Text size={2} weight={600} color='white600'>
            No data to display
          </Text>
        </Center>
      ) : (
        <HStack h='100%' gap={6}>
          <Chart
            chartType='PieChart'
            width='100%'
            height='100%'
            data={[['Country', 'Percentage of Visits'], ...data]}
            options={{
              pieHole: 0.5,
              is3D: false,
              legend: 'none',
              backgroundColor: 'transparent',
              colors: colors,
              borderColor: ['red', 'red', 'red', 'blue'],
              chartArea: {
                width: '90%',
                height: '70%',
              },
              pieSliceTextStyle: {
                color: '#000',
              },
              tooltip: {
                trigger: 'none', // remove tooltip
              },
            }}
          />
          <VStack flex='1' gap={1} justify='center'>
            {visitsByCountryData.visitsByCountry.map((item, idx) =>
              item.y === 0 ? (
                <Fragment key={item.x} />
              ) : (
                <HStack
                  key={item.x}
                  py='5px'
                  px='8px'
                  radius='10px'
                  border={1}
                  borderColor='rgba(152, 152, 255, 0.25)'
                  bgColor='rgba(152, 152, 255, 0.15)'
                  items='center'
                  gap={2}
                  w='fit-content'
                >
                  <Circle bgColor={colors[idx]} size='8px' />
                  <Text
                    css={{ whiteSpace: 'nowrap' }}
                    size={2}
                    weight={300}
                  >
                    {countries.find((country) => country.code === item.x)
                      ?.name ?? item.x}
                  </Text>
                </HStack>
              ),
            )}
          </VStack>
        </HStack>
      )}
    </RadialSurface2>
  );
}
export default VisitsByCountryChart;

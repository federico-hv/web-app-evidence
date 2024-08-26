import { useState } from 'react';
import dayjs from 'dayjs';
import { useSocialInteractionSuspenseQuery } from '../../../../features';
import {
  arrayFrom,
  Box,
  Center,
  Heading,
  HStack,
  Text,
} from '@holdr-ui/react';
import {
  darkSelectCSS,
  RadialSurface2,
  SelectInputField,
} from '../../../../shared';
import { Chart } from 'react-google-charts';

function SocialInteractionChart() {
  const [year, setYear] = useState<number>(dayjs().year());

  const { data: socialInteractionsData } =
    useSocialInteractionSuspenseQuery();

  const years = arrayFrom(dayjs().year() - 2023).map((n) => ({
    value: n + 2024,
    label: `${n + 2024}`,
  }));

  const data = socialInteractionsData.monthlySocialInteractions.map(
    (item) => [item.x, item.y],
  );

  return (
    <RadialSurface2 w='100%' p={4} radius={3}>
      <HStack
        pb={2}
        w='100%'
        justify='space-between'
        borderBottom={1}
        borderColor='#9898FF1A'
      >
        <Heading size={5} weight={400}>
          Social Interactions
        </Heading>
        <Box>
          <SelectInputField
            position='popper'
            value={year.toString()}
            onValueChange={(value) => setYear(parseInt(value))}
            triggerCSS={{ width: 150, ...darkSelectCSS }}
            options={years}
            keySelector={({ label }) => label}
            labelSelector={({ label }) => label}
            valueSelector={({ value }) => value.toString()}
            name='socialInteractionsPeriod'
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
        <Chart
          chartType='ColumnChart'
          width='100%'
          height='100%'
          data={[['Month', 'Price'], ...data]}
          options={{
            legend: 'none',
            backgroundColor: 'transparent',
            bar: { groupWidth: '16px' },
            series: {
              0: {
                color: '#9898FF', // Line color
                areaOpacity: 0.1, // Area opacity
              },
            },
            chartArea: {
              width: '90%',
              height: '70%',
            },
            vAxis: {
              gridlines: { color: '#3b3a59' },
              minorGridlines: { color: '#3b3a59' },
              textStyle: {
                color: '#B3B4AF',
                fontWeight: 300,
              },
            },
            hAxis: {
              gridLineColor: 'red',
              textStyle: { color: '#B3B4AF' },
            },
            tooltip: {
              trigger: 'none', // rmeove tooltip
            },
          }}
        />
      )}
    </RadialSurface2>
  );
}
export default SocialInteractionChart;

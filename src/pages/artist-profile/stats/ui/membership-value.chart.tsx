import { useMonthlyMembershipValuesSuspenseQuery } from '../../../../features';
import { RadialSurface2 } from '../../../../shared';
import { Center, Heading, HStack, Text, VStack } from '@holdr-ui/react';
import { Chart } from 'react-google-charts';

function MembershipValueChart() {
  const { data: membershipValueData } =
    useMonthlyMembershipValuesSuspenseQuery();

  const data = membershipValueData.monthlyMembershipValues.map((item) => [
    item.x,
    item.y,
  ]);

  return (
    <RadialSurface2 h='450px' w='100%' p={4} radius={3}>
      <HStack
        pb={2}
        items='center'
        justify='space-between'
        borderBottom={1}
        borderColor='#9898FF1A'
      >
        <Heading size={5} weight={400}>
          Membership Price
        </Heading>
      </HStack>
      {data.length === 0 ? (
        <Center h='100%'>
          <Text size={2} weight={600} color='white600'>
            No data to display
          </Text>
        </Center>
      ) : (
        <VStack flex={1}>
          <Chart
            chartType='AreaChart'
            width='100%'
            height='100%'
            data={[
              [
                { type: 'string', label: 'month' },
                { type: 'number', label: 'value' },
              ],
              ...data,
            ]}
            options={{
              legend: 'none',
              curveType: 'function', // Makes the line interpolation smoother
              backgroundColor: 'transparent',
              chartArea: {
                width: '80%',
                height: '70%',
              },
              series: {
                0: {
                  color: '#9898FF', // Line color
                  areaOpacity: 0.1, // Area opacity
                },
              },
              vAxis: {
                format: '$#,##0',
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
                slantedText: false,
                maxAlternation: 1,
              },
              tooltip: {
                trigger: 'none', // rmeove tooltip
              },
            }}
          />
        </VStack>
      )}
    </RadialSurface2>
  );
}

export default MembershipValueChart;

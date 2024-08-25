import {
  Box,
  Circle,
  GeneralContextProvider,
  Grid,
  GridItem,
  Heading,
  HStack,
  Progress,
  Text,
  useGeneralContext,
  VStack,
} from '@holdr-ui/react';
import {
  darkSelectCSS,
  formatNumberWithCommas,
  GQLRenderer,
  InformationTooltip,
  makePercentage,
  prefix,
  RadialSurface2,
  SelectInputField,
  voidFn,
} from '../../../shared';
import { ArtistProfileStatistic } from './ui';
import {
  IClubAnalyticsResponse,
  useClubAnalyticsSuspenseQuery,
} from '../../../features';
import { Chart, ReactGoogleChartEvent } from 'react-google-charts';
import millify from 'millify';
import { useMonthlyMembershipValuesSuspenseQuery } from '../../../features/stats/queries/use-monthly-membership-values.query';
import dayjs from 'dayjs';

export const data = [
  ['Country', 'Popularity'],
  ['Canada', 200],
  ['United States', 300],
  ['United Kingdom', 400],
  ['France', 600],
];

const countries = [
  {
    country: 'Canada',
    color: '#A2E2B3',
  },
  {
    country: 'France',
    color: '#FFE2A6',
  },
  {
    country: 'United Kingdom',
    color: '#E28A97',
  },
  {
    country: 'United States',
    color: '#B9B9FF',
  },
  {
    country: 'Other',
    color: '#eca88b',
  },
];

const lineChartData = [
  [
    { type: 'string', label: 'Month' },
    { type: 'number', label: 'Price ($)' },
  ],
  ['Jan', 0],
  ['Feb', 50],
  ['Mar', 100],
  ['Apr', 150],
  ['May', 200],
  ['Jun', 250],
  ['Jul', 300],
  ['Aug', 350],
  ['Sep', 400],
  ['Oct', 350],
  ['Nov', 300],
  ['Dec', 200],
];

export const barChartData = [
  ['Month', 'Price'],
  ['Jan', 20],
  ['Feb', 25],
  ['Mar', 30],
  ['Apr', 35],
  ['May', 40],
  ['Jun', 45],
  ['Jul', 50],
  ['Aug', 55],
  ['Sep', 60],
  ['Oct', 65],
  ['Nov', 70],
  ['Dec', 75],
];

const donutData = [
  ['Country', 'Percentage of Visits'],
  ['Canada', 33],
  ['France', 6],
  ['United Kingdom', 10],
  ['United States', 48],
  ['Other', 3],
];

const geoChartEvents: ReactGoogleChartEvent[] = [
  {
    eventName: 'select',
    callback: ({ chartWrapper }) => {
      const chart = chartWrapper.getChart();
      const selection = chart.getSelection();
      if (selection.length === 0) return;
      const region = data[selection[0].row + 1];
      console.log('Selected : ' + region);
    },
  },
];

function ClubProgress() {
  const {
    state: {
      clubSummary: { milestones },
    },
  } = useGeneralContext<IClubAnalyticsResponse>();

  const percentage = milestones.numerator / milestones.denominator;

  return (
    <RadialSurface2 shrink={0} w={227} p={4} radius={3}>
      <VStack>
        <HStack gap={3} mb={4}>
          <Heading size={2} weight={400}>
            Your Club Progress
          </Heading>
          {/*<InformationTooltip*/}
          {/*  color='white700'*/}
          {/*  sideOffset={4}*/}
          {/*  size='xs'*/}
          {/*  description=''*/}
          {/*/>*/}
        </HStack>
        <VStack gap={3}>
          <Box>
            <Heading size={6} weight={600}>
              {makePercentage(percentage)}% Complete
            </Heading>
          </Box>
          <Box>
            <Heading size='14px' weight={400}>
              Level 1
            </Heading>
          </Box>
          <VStack gap={1}>
            <Progress
              value={percentage}
              colorTheme='purple500'
              size='xl'
            />
            <Text size={1} color='white700'>
              {formatNumberWithCommas(milestones.numerator)} /{' '}
              {formatNumberWithCommas(milestones.denominator)} members
            </Text>
          </VStack>
        </VStack>
      </VStack>
    </RadialSurface2>
  );
}

function ClubValueSummary() {
  const { state } = useGeneralContext<IClubAnalyticsResponse>();

  return (
    <Grid w='100%' gap={3} templateColumns='repeat(3 , 1fr)'>
      <GridItem>
        <ArtistProfileStatistic
          tooltip='The total amount of Memberships sold / Memberships remaining'
          label='Memberships sold'
          value={`${state.clubSummary.membershipCount.numerator}/${state.clubSummary.membershipCount.denominator}`}
        />
      </GridItem>
      <GridItem>
        <ArtistProfileStatistic
          tooltip='The most recent cost that a fan spent to purchase a Membership to your Club'
          label='Last memberhsip sale'
          value={prefix('$', state.clubSummary.lastSale.value.toFixed(2))}
          percentage={makePercentage(
            state.clubSummary.lastSale.percentage,
          )}
        />
      </GridItem>
      <GridItem>
        <ArtistProfileStatistic
          tooltip='The average price of your memberships based on sale history'
          label='Avg. membership sale'
          value={prefix(
            '$',
            state.clubSummary.averagePrice.value.toFixed(2),
          )}
          percentage={makePercentage(
            state.clubSummary.averagePrice.percentage,
          )}
        />
      </GridItem>
      <GridItem>
        <ArtistProfileStatistic
          tooltip='The average number of participants in Live Auctions in a 3-month period.'
          label='average bidders'
          value={millify(state.clubSummary.averageBidders.value)}
          percentage={makePercentage(
            state.clubSummary.averageBidders.percentage,
          )}
        />
      </GridItem>
      <GridItem>
        <ArtistProfileStatistic
          tooltip='The total number of times a specific web page has been visited by users within a 1-month timeframe.'
          label='club views'
          value={state.clubSummary.clubViews.value}
          percentage={makePercentage(
            state.clubSummary.clubViews.percentage,
          )}
        />
      </GridItem>
      <GridItem>
        <ArtistProfileStatistic
          tooltip='The average time when fans are most active based on pageviews and social interactions.'
          label='Peak engagement time'
          value={state.socialSummary.peakEngagementTime}
        />
      </GridItem>
    </Grid>
  );
}

function ClubSummary() {
  const { data } = useClubAnalyticsSuspenseQuery();

  return (
    <GeneralContextProvider value={{ state: data, update: voidFn }}>
      <HStack gap={4}>
        <ClubProgress />
        <ClubValueSummary />
      </HStack>
    </GeneralContextProvider>
  );
}

function MembershipValueChart() {
  const { data: membershipValueData } =
    useMonthlyMembershipValuesSuspenseQuery();

  const data = membershipValueData.monthlyMembershipValues.map((item) => [
    dayjs(item.date).format('MMMM'),
    item.value,
  ]);

  console.log();

  return (
    <RadialSurface2 w='100%' p={4} radius={3}>
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
      {data.length > 0 && (
        <HStack>
          <Chart
            chartType='AreaChart'
            width='100%'
            height='400px'
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
        </HStack>
      )}
    </RadialSurface2>
  );
}

function VisitsByCountryChart() {
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
            value='3'
            triggerCSS={{ width: 150, ...darkSelectCSS }}
            options={[
              { value: '3', label: '3 months' },
              { value: '6', label: '6 months' },
              { value: '12', label: '1 year' },
            ]}
            keySelector={({ label }) => label}
            labelSelector={({ label }) => label}
            valueSelector={({ value }) => value.toString()}
            name='countryVisitsPeriod'
          />
        </Box>
      </HStack>
      <HStack h='100%' gap={6}>
        <Chart
          chartType='PieChart'
          width='100%'
          height='100%'
          data={donutData}
          options={{
            pieHole: 0.5,
            is3D: false,
            legend: 'none',
            backgroundColor: 'transparent',
            colors: [
              '#A2E2B3',
              '#FFE2A6',
              '#E28A97',
              '#B9B9FF',
              '#eca88b',
            ],
            borderColor: ['red', 'red', 'red', 'blue'],
            chartArea: {
              width: '90%',
              height: '70%',
            },
            pieSliceTextStyle: {
              color: '#000',
            },
            tooltip: {
              trigger: 'none', // rmeove tooltip
            },
          }}
        />
        <VStack flex='1' gap={1} justify='center'>
          {countries.map((item) => (
            <HStack
              key={item.country}
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
              <Circle bgColor={item.color} size='8px' />
              <Text css={{ whiteSpace: 'nowrap' }} size={2} weight={300}>
                {item.country}
              </Text>
            </HStack>
          ))}
        </VStack>
      </HStack>
    </RadialSurface2>
  );
}

function SocialInteractionChart() {
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
            value='2024'
            triggerCSS={{ width: 150, ...darkSelectCSS }}
            options={[{ value: '2024', label: '2024' }]}
            keySelector={({ label }) => label}
            labelSelector={({ label }) => label}
            valueSelector={({ value }) => value.toString()}
            name='socialInteractionsPeriod'
          />
        </Box>
      </HStack>
      <Chart
        chartType='ColumnChart'
        width='100%'
        height='100%'
        data={barChartData}
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
    </RadialSurface2>
  );
}

function ArtistProfileStatsPage() {
  return (
    <GQLRenderer>
      <VStack gap={4}>
        <ClubSummary />
        <MembershipValueChart />
        <HStack h={400} gap={4}>
          <VisitsByCountryChart />
          <SocialInteractionChart />
        </HStack>
      </VStack>
    </GQLRenderer>
  );
}
ArtistProfileStatsPage.displayName = 'ArtistProfileStatsPage';

export default ArtistProfileStatsPage;

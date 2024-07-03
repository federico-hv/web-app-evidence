import {
  Box,
  Grid,
  GridItem,
  Heading,
  HStack,
  Progress,
  Select,
  SelectContent,
  SelectItem,
  SelectItemList,
  SelectTrigger,
  Text,
  VStack,
} from '@holdr-ui/react';
import { RadialSurface2 } from '../../../shared';
import { ArtistProfileStatistic } from './ui';

import {
  Chart,
  ReactGoogleChartEvent,
  ReactGoogleChartProps,
} from 'react-google-charts';

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
];

const lineChartData = [
  [
    { type: 'string', label: 'Month' },
    { type: 'number', label: 'Values' },
    { id: 'i0', type: 'number', role: 'interval' },
    { id: 'i1', type: 'number', role: 'interval' },
    { id: 'i2', type: 'number', role: 'interval' },
    { id: 'i3', type: 'number', role: 'interval' },
    { id: 'i4', type: 'number', role: 'interval' },
    { id: 'i5', type: 'number', role: 'interval' },
  ],
  ['Jan', 0, -10, 10, -5, 5, 8, 12],
  ['Feb', 50, 40, 60, 35, 45, 55, 65],
  ['Mar', 100, 90, 110, 85, 95, 105, 115],
  ['Apr', 150, 140, 160, 135, 145, 155, 165],
  ['May', 200, 190, 210, 185, 195, 205, 215],
  ['Jun', 250, 240, 260, 235, 245, 255, 265],
  ['Jul', 300, 290, 310, 285, 295, 305, 315],
  ['Aug', 350, 340, 360, 335, 345, 355, 365],
  ['Sep', 400, 390, 410, 385, 395, 405, 415],
  ['Oct', 350, 340, 360, 335, 345, 355, 365],
  ['Nov', 300, 290, 310, 285, 295, 305, 315],
  ['Dec', 200, 190, 210, 185, 195, 205, 215],
];

const lineChartOptions = {
  curveType: 'function',
  intervals: { style: 'none' },
  legend: 'none',

  backgroundColor: 'transparent',
  vAxis: {
    gridlines: {
      color: '#9898FF',
    },
    titleTextStyle: {
      color: '#FF5733',
      fontSize: 14,
      bold: true,
    },
    textStyle: { color: 'white' },
    ticks: [0, 100, 200, 300, 400],
  },
  hAxis: {
    gridlines: {
      color: 'transparent',
    },
    textStyle: { color: 'white' },
    slantedText: false,
    maxAlternation: 1,
  },
  chartArea: {
    width: '80%',
    height: '70%',
  },
  series: {
    0: {
      color: '#9898FF',
      pointSize: 8,
      pointShape: 'circle',
    },
  },
  bar: { groupWidth: '16px' },
  pointSize: 5,
};

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

export const barChartOptions = {
  backgroundColor: 'transparent',
  legend: 'none',
  vAxis: {
    gridlines: {
      color: '#9898FF',
      opacity: 0.8,
    },
    textStyle: { color: 'white' },
  },
  hAxis: {
    gridlines: {
      color: 'transparent',
    },
    textStyle: { color: 'white' },
    slantedText: false,
    maxAlternation: 1,
  },
  chartArea: {
    width: '90%',
    height: '70%',
  },
  series: {
    0: { color: '#9898FF' },
  },
  bar: { groupWidth: '16px' },
  annotations: {
    textStyle: {
      fontSize: 12,
      color: 'rgba(0,0,0,0)',
    },
  },
};

const donutData = [
  ['Country', 'Percentage of Visits'],
  ['Canada', 36],
  ['France', 6],
  ['United Kingdom', 10],
  ['United States', 48],
];

const donutOptions = {
  pieHole: 0.5,
  is3D: false,
  legend: 'none',
  backgroundColor: 'transparent',
  colors: ['#A2E2B3', '#FFE2A6', '#E28A97', '#B9B9FF'],
  borderColor: ['red', 'red', 'red', 'blue'],
  chartArea: {
    width: '100%',
    height: '70%',
  },
  pieSliceTextStyle: {
    color: '#000',
  },
};

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

const geoChartOptions = {
  backgroundColor: 'transparent',
  colorAxis: {
    colors: ['#A2E2B3', '#B9B9FF', '#E28A97', '#FFE2A6'],
  },
  legend: 'none',
};

const years = ['2024', '2023', '2022', '2021', '2020'];

const months = [
  '3 months',
  '6 months',
  '6 months',
  '9 months',
  '12 months',
];

function ArtistProfileDashboardPage() {
  return (
    <VStack gap={4}>
      <HStack gap={4}>
        <RadialSurface2 shrink={0} w={227} p={4} radius={3}>
          <VStack>
            <Heading mb={4} size={2} weight={400}>
              Your Club Progress
            </Heading>
            <VStack gap={3}>
              <Box>
                <Heading size={6} weight={600}>
                  20% Complete
                </Heading>
              </Box>
              <Box>
                <Heading size='14px' weight={400}>
                  Level 2
                </Heading>
              </Box>
              <VStack gap={1}>
                <Progress value={20} colorTheme='purple500' size='xl' />
                <Text size={1} color='white700'>
                  100 / 10,000 members
                </Text>
              </VStack>
            </VStack>
          </VStack>
        </RadialSurface2>
        <Grid w='100%' gap={3} templateColumns='repeat(3 , 1fr)'>
          <GridItem>
            <ArtistProfileStatistic
              label='current value'
              value='$0.00'
              percentage={1.2}
            />
          </GridItem>
          <GridItem>
            <ArtistProfileStatistic
              label='average value'
              value={400}
              percentage={-1.2}
            />
          </GridItem>
          <GridItem>
            <ArtistProfileStatistic
              label='club views'
              value={0}
              percentage={0}
            />
          </GridItem>
          <GridItem>
            <ArtistProfileStatistic
              label='average bidders'
              value={201}
              percentage={1.9}
            />
          </GridItem>
          <GridItem>
            <ArtistProfileStatistic
              label='memberships sold'
              value='100/250'
            />
          </GridItem>
          <GridItem>
            <ArtistProfileStatistic
              label='peak engagement time'
              value='8:00PM PST'
            />
          </GridItem>
        </Grid>
      </HStack>
      <RadialSurface2 w='100%' p={4} radius={3}>
        <HStack
          pb={2}
          items='center'
          justify='space-between'
          borderBottom={1}
          borderColor='#9898FF1A'
        >
          <Heading size={5} weight={400}>
            Membership Value
          </Heading>
          <Select defaultValue='3 months'>
            <SelectTrigger
              radius={2}
              css={{
                border: '1px solid rgba(152, 152, 255, 0.1)',
                background: 'rgba(152, 152, 255, 0.15)',
              }}
            />
            <SelectContent>
              <SelectItemList
                _active={{ color: '$purple200' }}
                _hover={{ background: 'rgba(14, 14, 27, 0.50)' }}
                _highlighted={{ background: 'rgba(14, 14, 27, 0.50)' }}
                divider={
                  <Box
                    h='1px'
                    w='100%'
                    css={{
                      background: 'rgba(152, 152, 255, 0.1)',
                    }}
                  />
                }
                position='relative'
                bgColor='rgba(49, 49, 73, 0.85)'
                borderColor='rgba(152, 152, 255, 0.1)'
                border={1}
                borderTop={0}
                fontSize={2}
                css={{
                  boxShadow: '0px 4px 12px 0px rgba(14, 14, 27, 0.08)',
                  backdropFilter: 'blur(40px)',
                }}
              >
                {months.map((month) => (
                  <SelectItem
                    py={2}
                    radius={1}
                    value={month}
                    label={month}
                  />
                ))}
              </SelectItemList>
            </SelectContent>
          </Select>
        </HStack>
        <HStack>
          <VStack position='absolute'>
            <Text size={20} ml={3}>
              $
            </Text>
          </VStack>
          <Chart
            chartType='LineChart'
            width='100%'
            height='400px'
            data={lineChartData}
            options={lineChartOptions}
          />
        </HStack>
      </RadialSurface2>
      <HStack gap={4}>
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
            <Select defaultValue='3 months'>
              <SelectTrigger
                radius={2}
                css={{
                  border: '1px solid rgba(152, 152, 255, 0.1)',
                  background: 'rgba(152, 152, 255, 0.15)',
                }}
              />
              <SelectContent>
                <SelectItemList
                  _active={{ color: '$purple200' }}
                  _hover={{ background: 'rgba(14, 14, 27, 0.50)' }}
                  _highlighted={{ background: 'rgba(14, 14, 27, 0.50)' }}
                  divider={
                    <Box
                      h='1px'
                      w='100%'
                      css={{
                        background: 'rgba(152, 152, 255, 0.1)',
                      }}
                    />
                  }
                  position='relative'
                  bgColor='rgba(49, 49, 73, 0.85)'
                  borderColor='rgba(152, 152, 255, 0.1)'
                  border={1}
                  borderTop={0}
                  fontSize={2}
                  css={{
                    boxShadow: '0px 4px 12px 0px rgba(14, 14, 27, 0.08)',
                    backdropFilter: 'blur(40px)',
                  }}
                >
                  {months.map((month) => (
                    <SelectItem
                      py={2}
                      radius={1}
                      value={month}
                      label={month}
                    />
                  ))}
                </SelectItemList>
              </SelectContent>
            </Select>
          </HStack>
          <HStack>
            <VStack flex='1.4'>
              <Chart
                chartType='PieChart'
                width='100%'
                height='400px'
                data={donutData}
                options={donutOptions}
              />
            </VStack>

            <VStack flex='1' gap={1} justify='center' ml={'24px'}>
              {countries.map((item) => (
                <HStack
                  py='4px'
                  px='8px'
                  css={{
                    border: '3px solid $purpleTint400',
                    background: 'rgba(152, 152, 255, 0.25)',
                    borderRadius: '10px',
                  }}
                  items='center'
                  gap={2}
                  w={'fit-content'}
                >
                  <Box
                    w='15px'
                    h='15px'
                    css={{
                      background: item.color,
                      borderRadius: '60px',
                    }}
                  />
                  <Text size={'14px'} weight={300}>
                    {item.country}
                  </Text>
                </HStack>
              ))}
            </VStack>
          </HStack>
        </RadialSurface2>
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
            <Select defaultValue='2024'>
              <SelectTrigger
                radius={2}
                css={{
                  border: '1px solid rgba(152, 152, 255, 0.1)',
                  background: 'rgba(152, 152, 255, 0.15)',
                }}
              />
              <SelectContent>
                <SelectItemList
                  _active={{ color: '$purple200' }}
                  _hover={{ background: 'rgba(14, 14, 27, 0.50)' }}
                  _highlighted={{ background: 'rgba(14, 14, 27, 0.50)' }}
                  divider={
                    <Box
                      h='1px'
                      w='100%'
                      css={{
                        background: 'rgba(152, 152, 255, 0.1)',
                      }}
                    />
                  }
                  position='relative'
                  bgColor='rgba(49, 49, 73, 0.85)'
                  borderColor='rgba(152, 152, 255, 0.1)'
                  border={1}
                  borderTop={0}
                  fontSize={2}
                  css={{
                    boxShadow: '0px 4px 12px 0px rgba(14, 14, 27, 0.08)',
                    backdropFilter: 'blur(40px)',
                  }}
                >
                  {years.map((year) => (
                    <SelectItem
                      py={2}
                      radius={1}
                      value={year}
                      label={year}
                    />
                  ))}
                </SelectItemList>
              </SelectContent>
            </Select>
          </HStack>
          <Chart
            chartType='ColumnChart'
            width='100%'
            height='400px'
            data={barChartData}
            options={barChartOptions}
          />
        </RadialSurface2>
      </HStack>
      <RadialSurface2 w='100%' p={4} radius={3}>
        <Box pb={2} w='100%' borderBottom={1} borderColor='#9898FF1A'>
          <Heading size={5} weight={400}>
            Membership Activity
          </Heading>
        </Box>
        <VStack mt={6} minHeight={300}>
          <HStack></HStack>
        </VStack>
      </RadialSurface2>
    </VStack>
  );
}
ArtistProfileDashboardPage.displayName = 'ArtistProfileDashboardPage';

export default ArtistProfileDashboardPage;

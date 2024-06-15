import { Route, Routes } from 'react-router';
import { Navigate } from 'react-router-dom';
import { ArtistProfilePage } from '../../pages';
import {
  Avatar,
  AvatarBadge,
  Box,
  Countdown,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  IconButton,
  Progress,
  Select,
  SelectContent,
  SelectItem,
  SelectItemList,
  SelectTrigger,
  StringNumeric,
  Text,
  VStack,
} from '@holdr-ui/react';
import { BoxProps } from '@holdr-ui/react/dist/components/box/src/box.types';
import GainLossIndicator from '../../shared/components/gain-loss-indicator';
import { arrayFrom, TextGroup, TextGroupSubheading } from '../../shared';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { FlatList } from '../../tmp/flat-list';

dayjs.extend(localizedFormat);

function RadialBox2({ children, ...props }: BoxProps) {
  return (
    <Box
      w='fit-content'
      css={{
        border: '1px solid rgba(152, 152, 255, 0.10)',
        background:
          'radial-gradient(50% 100% at 50% 100%, rgba(133, 133, 255, 0.15) 0%, rgba(133, 133, 255, 0.05) 100%), linear-gradient(180deg, rgba(208, 208, 255, 0.08) 0%, rgba(208, 208, 255, 0.01) 100%)',
      }}
      {...props}
    >
      {children}
    </Box>
  );
}

function ProfileStatistic({
  label,
  value,
  percentage,
}: {
  label: string;
  value: StringNumeric;
  percentage?: number;
}) {
  return (
    <RadialBox2 w='100%' h='fit-content' p={4} radius={3}>
      <VStack gap={3}>
        <HStack>
          <Heading
            casing='capitalize'
            size='14px'
            // py='6px'
            weight={400}
            css={{
              lineHeight: '115%',
            }}
          >
            {label}
          </Heading>
        </HStack>
        <HStack justify='space-between' items='flex-start' fontSize='18px'>
          <Text>{value}</Text>
          {percentage !== undefined && (
            <HStack gap={2} items='center'>
              {percentage !== 0 && (
                <GainLossIndicator isGain={percentage > 0} />
              )}
              <Text size={2}>{Math.abs(percentage).toFixed(1)}%</Text>
            </HStack>
          )}
        </HStack>
      </VStack>
    </RadialBox2>
  );
}

function DashboardContent() {
  return (
    <VStack gap={4}>
      <HStack gap={4}>
        <RadialBox2 shrink={0} w={227} p={4} radius={3}>
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
        </RadialBox2>
        <Grid w='100%' gap={3} templateColumns='repeat(3 , 1fr)'>
          <GridItem>
            <ProfileStatistic
              label='current value'
              value='$0.00'
              percentage={1.2}
            />
          </GridItem>
          <GridItem>
            <ProfileStatistic
              label='average value'
              value={400}
              percentage={-1.2}
            />
          </GridItem>
          <GridItem>
            <ProfileStatistic
              label='club views'
              value={0}
              percentage={0}
            />
          </GridItem>
          <GridItem>
            <ProfileStatistic
              label='average bidders'
              value={201}
              percentage={1.9}
            />
          </GridItem>
          <GridItem>
            <ProfileStatistic label='memberships sold' value='100/250' />
          </GridItem>
          <GridItem>
            <ProfileStatistic
              label='peak engagement time'
              value='8:00PM PST'
            />
          </GridItem>
        </Grid>
      </HStack>
      <RadialBox2 w='100%' p={4} radius={3}>
        <HStack
          pb={2}
          items='center'
          justify='space-between'
          w='100%'
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
                <SelectItem
                  py={2}
                  radius={1}
                  value='3 months'
                  label='3 months'
                />
                <SelectItem
                  py={2}
                  radius={1}
                  value='6 months'
                  label='6 months'
                />
                <SelectItem
                  py={2}
                  radius={1}
                  value='9 months'
                  label='9 months'
                />
                <SelectItem
                  py={2}
                  radius={1}
                  value='12 months'
                  label='12 months'
                />
              </SelectItemList>
            </SelectContent>
          </Select>
        </HStack>
        <Box mt={6} h={176} />
      </RadialBox2>
      <HStack gap={4}>
        <RadialBox2 w='100%' p={4} radius={3}>
          <Box pb={2} w='100%' borderBottom={1} borderColor='#9898FF1A'>
            <Heading size={5} weight={400}>
              Visits by Country
            </Heading>
          </Box>
          <Box mt={6} h={176} />
        </RadialBox2>
        <RadialBox2 w='100%' p={4} radius={3}>
          <Box pb={2} w='100%' borderBottom={1} borderColor='#9898FF1A'>
            <Heading size={5} weight={400}>
              Engagement
            </Heading>
          </Box>
          <Box mt={6} h={176} />
        </RadialBox2>
      </HStack>
      <RadialBox2 w='100%' p={4} radius={3}>
        <Box pb={2} w='100%' borderBottom={1} borderColor='#9898FF1A'>
          <Heading size={5} weight={400}>
            Membership Activity
          </Heading>
        </Box>
        <VStack mt={6} minHeight={300}>
          <HStack></HStack>
        </VStack>
      </RadialBox2>
    </VStack>
  );
}

function ClubMembersContent() {
  return (
    <RadialBox2 w='100%' h='100%' p={4} radius={3}>
      <Box pb={2} w='100%' borderBottom={1} borderColor='#9898FF1A'>
        <Heading size={5} weight={400}>
          My Members
        </Heading>
      </Box>
      <VStack mt={6} gap={2}>
        <HStack>
          <Box flex={1}>
            <Text p={1} size='14px' weight={500} color='white700'>
              Name
            </Text>
          </Box>
          <Box basis={200}>
            <Text p={1} size='14px' weight={500} color='white700'>
              Member Since
            </Text>
          </Box>
          <Box basis={200}>
            <Text p={1} size='14px' weight={500} color='white700'>
              Purchase Price
            </Text>
          </Box>
        </HStack>
        <FlatList
          direction='vertical'
          data={arrayFrom(10).map((id) => ({ id }))}
          renderItem={() => (
            <HStack items='center'>
              <Box flex={1} p={1}>
                <HStack items='center' gap={3}>
                  <Avatar size='40px'>
                    {Math.random() > 0.5 && (
                      <AvatarBadge
                        zIndex={1}
                        size='12px'
                        bgColor='success500'
                        b={10}
                        r={2}
                        border={2}
                        borderColor='rgb(43, 42, 60)'
                      />
                    )}
                  </Avatar>
                  <TextGroup mb={2}>
                    <TextGroupSubheading size={3} weight={500}>
                      Display name
                    </TextGroupSubheading>
                    <TextGroupSubheading mt={-5} weight={300} size={1}>
                      @username
                    </TextGroupSubheading>
                  </TextGroup>
                </HStack>
              </Box>
              <Box basis={200} p={1}>
                <Text weight={300}>{dayjs(new Date()).format('ll')}</Text>
              </Box>
              <Box basis={200} p={1}>
                <Text weight={300}>${'200.00'}</Text>
              </Box>
            </HStack>
          )}
          keyExtractor={({ id }) => id}
        />
      </VStack>
    </RadialBox2>
  );
}

function ArtistWatchlistItem() {
  const price = 829.12;

  return (
    <HStack items='center'>
      <HStack flex={1} gap={2} items='center'>
        <Avatar size='44px' variant='squircle' name='D D'></Avatar>
        <VStack mb={1}>
          <HStack gap={1} items='center'>
            <Text weight={500}>Abraham Curtis’ Club</Text>
            <Icon name='verified-outline' />
          </HStack>
          <Text color='white700' size={1} weight={300}>
            @AbCurt
          </Text>
        </VStack>
      </HStack>
      <Box basis='156px'>
        <Text weight={300}>${price.toFixed(2)}</Text>
      </Box>
      <Box basis='180px'>
        <Countdown
          color='white500'
          targetDate={dayjs().add(1, 'day').toDate()}
        />
      </Box>
      <Box basis='108px'>
        <Box
          radius={1}
          px={1}
          w='fit-content'
          border={1}
          borderColor='#5CE581'
        >
          <Text weight={500} color='#5CE581' size={2}>
            LIVE
          </Text>
        </Box>
      </Box>
      <Box basis='40px'>
        <IconButton
          colorTheme='purple600'
          icon='more-fill'
          ariaLabel='options'
          variant='ghost'
        />
      </Box>
    </HStack>
  );
}

function WatchlistContent() {
  return (
    <RadialBox2 w='100%' h='100%' p={4} radius={3}>
      <Box pb={2} w='100%' borderBottom={1} borderColor='#9898FF1A'>
        <Heading size={5} weight={400}>
          Watchlist
        </Heading>
      </Box>
      <VStack h='full' radius={2}>
        <HStack py={4}>
          <Box flex={1}>
            <Text weight={500}>Club</Text>
          </Box>
          <Box basis='156px'>
            <Text weight={500}>Entry Price</Text>
          </Box>
          <Box basis='180px'>
            <Text weight={500}>Ends In</Text>
          </Box>
          <Box basis='108px'>
            <Text weight={500}>Status</Text>
          </Box>
          <Box basis='40px' />
        </HStack>
        <VStack h='calc(100%)' py={4} gap={5}>
          <ArtistWatchlistItem />
        </VStack>
      </VStack>
    </RadialBox2>
  );
}

const ArtistProfileRoutes = () => (
  <Routes>
    <Route element={<ArtistProfilePage />}>
      <Route path='' element={<Navigate to='dashboard' replace />} />
      <Route path='dashboard' element={<DashboardContent />} />
      <Route path='members' element={<ClubMembersContent />} />
      <Route path='watchlist' element={<WatchlistContent />} />
    </Route>
  </Routes>
);

export default ArtistProfileRoutes;

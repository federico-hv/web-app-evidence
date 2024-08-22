import {
  Button,
  Heading,
  HStack,
  Separator,
  Square,
  VStack,
} from '@holdr-ui/react';
import { FlatList } from '../../../../../tmp/flat-list';
import {
  DateUtility,
  makeButtonLarger,
  makePath,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  useNavigateWithPreviousLocation,
} from '../../../../../shared';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';

export interface IMembershipEvent {
  id: string;
  date: Date;
  location: string;
  venue: string;
  eventPerkId: number;
}

export interface IMembershipEventCollection {
  month: string;
  events: IMembershipEvent[];
}

function MembershipEventSection({
  data: { month, events },
}: {
  data: IMembershipEventCollection;
}) {
  const { slug } = useParams();

  const navigate = useNavigateWithPreviousLocation(location.pathname);

  const goto = (id: number) =>
    navigate(
      makePath(['memberships', slug ?? '', 'event-perk', id.toString()]),
    );

  return (
    <VStack>
      <HStack gap={2}>
        <Heading size={6} weight={500} color='purple500'>
          {month}
        </Heading>
        <Heading size={6} weight={500}>
          Event Perks
        </Heading>
      </HStack>
      <VStack
        mt={4}
        p={8}
        gap={6}
        radius={3}
        css={{
          boxShadow: '0px 0px 15px 0px #00000026',
        }}
      >
        <FlatList
          gap={6}
          direction='vertical'
          divider={<Separator bgColor='base50' thickness={1} />}
          data={events}
          keyExtractor={(event) => event.id}
          renderItem={(event) => (
            <HStack items='center' justify='space-between'>
              <HStack items='center' gap={4}>
                <Square
                  shrink={0}
                  p={1}
                  bgColor='white600'
                  size={70}
                  radius={1}
                >
                  <TextGroup items='center' gap={0}>
                    <TextGroupSubheading weight={500}>
                      {dayjs(event.date).format('MMM')}
                    </TextGroupSubheading>
                    <TextGroupSubheading weight={500} size={6}>
                      {dayjs(event.date).format('D')}
                    </TextGroupSubheading>
                  </TextGroup>
                </Square>
                <TextGroup gap={1}>
                  <TextGroupHeading>{event.location}</TextGroupHeading>
                  <TextGroup gap={0}>
                    <TextGroupSubheading>
                      {event.venue}
                    </TextGroupSubheading>
                    <TextGroupSubheading color='white700' size={2}>
                      {DateUtility.getWeekday(event.date)} —{' '}
                      {DateUtility.getTime(event.date)}
                    </TextGroupSubheading>
                  </TextGroup>
                </TextGroup>
              </HStack>
              <Button
                onClick={() => goto(event.eventPerkId)}
                colorTheme='purple500'
                radius={1}
                className={makeButtonLarger('2.5rem')}
                css={{ px: '$7' }}
              >
                View Perk
              </Button>
            </HStack>
          )}
        />
        <Button
          variant='outline'
          colorTheme='purple500'
          radius={1}
          fullWidth
          className={makeButtonLarger('2.5rem')}
        >
          See more
        </Button>
      </VStack>
    </VStack>
  );
}

export default MembershipEventSection;

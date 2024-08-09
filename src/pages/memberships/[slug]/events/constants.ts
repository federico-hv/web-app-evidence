import dayjs from 'dayjs';
import { IMembershipEvent } from './ui/membership-event.section';

export const dummyMembershipEvents: IMembershipEvent[] = [
  {
    id: 'event3',
    date: dayjs().add(1, 'month').toDate(),
    location: 'Newark, NJ',
    venue: 'Prudential Center',
    eventPerkId: 1,
  },
  {
    id: 'event2',
    date: dayjs().add(1, 'month').add(1, 'd').toDate(),
    location: 'Buffalo, NY',
    venue: 'Key Bank Center',
    eventPerkId: 2,
  },
  {
    id: 'event3',
    date: dayjs().add(1, 'month').add(5, 'd').toDate(),
    location: 'Philadelphia, PA',
    venue: 'Wells Fargo Center',
    eventPerkId: 3,
  },
  {
    id: 'event1',
    date: dayjs().add(1, 'month').add(7, 'd').toDate(),
    location: 'New York, NY',
    venue: 'Madison Square Garden',
    eventPerkId: 4,
  },
];

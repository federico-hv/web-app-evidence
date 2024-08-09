import dayjs from 'dayjs';
import { IMembershipEvent } from './ui/membership-event.section';

export const dummyMembershipEvents: IMembershipEvent[] = [
  {
    id: 'event3',
    date: dayjs('2024-09-6 10:00PM').toDate(),
    location: 'Newark, NJ',
    venue: 'Prudential Center',
    eventPerkId: 1,
  },
  {
    id: 'event2',
    date: dayjs('2024-09-11 7:00PM').toDate(),
    location: 'Buffalo, NY',
    venue: 'Key Bank Center',
    eventPerkId: 2,
  },
  {
    id: 'event3',
    date: dayjs('2024-09-13 8:00PM').toDate(),
    location: 'Philadelphia, PA',
    venue: 'Wells Fargo Center',
    eventPerkId: 3,
  },
  {
    id: 'event1',
    date: dayjs('2024-09-15 9:00PM').toDate(),
    location: 'New York, NY',
    venue: 'Madison Square Garden',
    eventPerkId: 4,
  },
];

import dayjs from 'dayjs';
import {
  getRandomNumber,
  getRandomNumberInRange,
} from '../../../../shared';

export function useSuspenseGetInactiveBidders(clubId: string) {
  console.log(clubId);

  return {
    data: [
      {
        id: 1,
        displayName: 'Eleanor Summers',
        createdAt: dayjs().subtract(getRandomNumber(24), 'h').toDate(),
        amount: getRandomNumberInRange(250, 1000),
      },
      {
        id: 2,
        displayName: 'Michael Green',
        createdAt: dayjs().subtract(getRandomNumber(24), 'h').toDate(),
        amount: getRandomNumberInRange(250, 1000),
      },
      {
        id: 3,
        displayName: 'Laura McCarthy',
        createdAt: dayjs().subtract(getRandomNumber(24), 'h').toDate(),
        amount: getRandomNumberInRange(250, 1000),
      },
      {
        id: 4,
        displayName: 'David Finch',
        createdAt: dayjs().subtract(getRandomNumber(24), 'h').toDate(),
        amount: getRandomNumberInRange(250, 1000),
      },
      {
        id: 5,
        displayName: 'Olivia Walters',
        createdAt: dayjs().subtract(getRandomNumber(24), 'h').toDate(),
        amount: getRandomNumberInRange(250, 1000),
      },
    ],
  };
}

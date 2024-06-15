import dayjs from 'dayjs';
import {
  getRandomNumber,
  getRandomNumberInRange,
} from '../../../../shared';

export function useSuspenseGetActiveBidders(clubId: string) {
  return {
    data: [
      {
        id: 1,
        displayName: 'Zaire Dorwart',
        createdAt: dayjs().subtract(getRandomNumber(24), 'h').toDate(),
        amount: getRandomNumberInRange(250, 1000),
      },
      {
        id: 2,
        displayName: 'Roger Lubin',
        createdAt: dayjs().subtract(getRandomNumber(24), 'h').toDate(),
        amount: getRandomNumberInRange(250, 1000),
      },
      {
        id: 3,
        displayName: 'Ahmad Stanton',
        createdAt: dayjs().subtract(getRandomNumber(24), 'h').toDate(),
        amount: getRandomNumberInRange(250, 1000),
      },
      {
        id: 4,
        displayName: 'Ann Bergson',
        createdAt: dayjs().subtract(getRandomNumber(24), 'h').toDate(),
        amount: getRandomNumberInRange(250, 1000),
      },
      {
        id: 5,
        displayName: 'Hanna Press',
        createdAt: dayjs().subtract(getRandomNumber(24), 'h').toDate(),
        amount: getRandomNumberInRange(250, 1000),
      },
    ],
  };
}

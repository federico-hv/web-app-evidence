import { DirectionNames } from '../types';

export const slideAnimation = (
  direction: DirectionNames,
  speed: number,
) => [
  { x: direction === 'left' ? '100%' : '-100%' },
  { ease: 'easeIn', duration: speed },
];

export const slideAnimateOut = () => [{ x: 0 }, { duration: 0 }];

import { useState } from 'react';
import { DirectionNames } from '../types';

/**
 * Creates a circular array from contents.
 *
 * example: an array with elements [0, 1, 2, 3, 4, 5]
 * will become [3, 4, 5, 0, 1, 2]
 * therefore, array becomes [last half, first half]
 *
 * @param contents array to become circular
 *
 * @returns array - new circular array
 *          slideArray - slides array in certain direction
 */
export function useCircularArray<T>(contents: T[]) {
  const length = contents.length;

  const [array, setArray] = useState<T[]>([
    ...contents.slice(Math.ceil(length / 2), length),
    ...contents.slice(0, Math.floor(length / 2)),
  ]);

  /**
   * Slides the array in specified direction number of times
   *
   * @param direction of array slide
   * @param times number of indices array should slide
   */
  function slideArray(direction: DirectionNames, times: number) {
    direction === 'left'
      ? setArray([
          ...array.slice(length - times),
          ...array.slice(0, length - times),
        ])
      : setArray([...array.slice(times), ...array.slice(0, times)]);
  }

  return { array, slideArray };
}

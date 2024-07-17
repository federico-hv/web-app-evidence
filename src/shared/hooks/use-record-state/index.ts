import { Dispatch, SetStateAction, useState } from 'react';

/**
 * A hook that stores state in an
 * object of specified shape.
 *
 * Usage example:
 *
 * ```
 * const [state, update, set] = useRecordState<{name: string}>({name: ''});
 * ```
 *
 * @param initial the initial state.
 *
 */
export function useRecordState<T>(
  initial: T,
): [
  T,
  (next: Partial<T>, cb?: (current: T) => void) => void,
  Dispatch<SetStateAction<T>>,
] {
  const [state, set] = useState<T>(initial);

  const update = (next: Partial<T>, cb?: (current: T) => void) =>
    set((prev) => {
      if (cb !== undefined) cb({ ...prev, ...next });
      return { ...prev, ...next };
    });

  return [state, update, set];
}

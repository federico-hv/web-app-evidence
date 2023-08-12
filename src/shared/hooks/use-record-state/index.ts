import { Dispatch, SetStateAction, useState } from 'react';

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

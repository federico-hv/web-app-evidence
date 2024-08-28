import { Dispatch, SetStateAction, useState } from 'react';

type ItemFn<T> = (item: T, idx?: number) => void;

export function useArrayState<T>(
  initialState = [] as T[],
): [
  T[],
  ItemFn<T>,
  (idx: number, item: T) => void,
  (filter: (item: T, idx?: number) => boolean) => void,
  Dispatch<SetStateAction<T[]>>,
] {
  const [state, set] = useState<T[]>(initialState);

  const push = (item: T) => set((prev) => [...prev, item]);
  const remove = (filter: (item: T, idx: number) => boolean) =>
    set((prev) => {
      return prev.filter((item, idx) => {
        return filter(item, idx);
      });
    });
  const replace = (idx: number, item: T) =>
    set((prev) => [...prev.slice(0, idx), item, ...prev.slice(idx + 1)]);

  return [state, push, replace, remove, set];
}

import { useState } from 'react';

export function useRecordState<T>(initial: T) {
  const [state, set] = useState<T>(initial);

  const update = (next: Partial<T>) =>
    set((prev) => ({ ...prev, ...next }));

  return { state, update };
}

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function useTabPathname(
  defaultValue?: string,
): [string, (value: string) => void, Dispatch<SetStateAction<string>>] {
  const location = useLocation();

  const pathItems = location.pathname.split('/');

  const tab = pathItems[pathItems.length - 1];

  const [state, set] = useState(defaultValue || tab);

  const update = (value: string) => set(() => value);

  useEffect(() => {
    set(tab);
  }, [tab]);

  return [state, update, set];
}

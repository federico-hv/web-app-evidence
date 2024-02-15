import { useEffect } from 'react';

export function useScrollToWindowTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
}

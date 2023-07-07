import { useLocation } from 'react-router-dom';

export function useUsername() {
  return useLocation().pathname.split('/')[1];
}

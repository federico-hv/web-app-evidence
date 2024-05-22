import { useLocation } from 'react-router-dom';

/**
 * TODO: Resolve similarity to use Previous Location
 *
 *  Useful way of checking what the prev path was and whether to go back there or to the default root
 * @param defaultLocation
 */
export function usePrevPath(defaultLocation: string) {
  const { state } = useLocation();
  if (state) {
    return state.prevPath;
  }
  return defaultLocation;
}

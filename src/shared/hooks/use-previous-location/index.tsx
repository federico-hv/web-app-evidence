import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

/**
 * Reloads the page and sets a previous location
 * to the location state.
 *
 * @param fallback the path to set as the previous location
 */
export function usePreviousLocation(fallback: string) {
  const location = useLocation();
  const navigate = useNavigate();
  const pathName = location.pathname;

  useEffect(() => {
    if (!location.state?.previousLocation) {
      navigate(pathName, {
        state: {
          previousLocation: fallback,
        },
      });
    }
  }, []);

  return !location.state?.previousLocation
    ? fallback
    : location.state.previousLocation;
}

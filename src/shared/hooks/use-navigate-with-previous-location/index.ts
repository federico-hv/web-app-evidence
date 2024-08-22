import { useNavigate } from 'react-router-dom';
import { usePreviousLocation } from '../use-previous-location';

/**
 * Returns a function that navigates to route with matching path name when a condition is satisfied.
 */
export function useNavigateWithPreviousLocation(fallback: string) {
  const previousLocation = usePreviousLocation(fallback);
  const navigate = useNavigate();

  /**
   * Navigates to route with matching path name when a condition is satisfied.
   *
   * @param path the path name
   * @param when the condition to be satisfied.
   */

  return (path: string) => {
    navigate(path, {
      state: { previousLocation },
    });
  };
}

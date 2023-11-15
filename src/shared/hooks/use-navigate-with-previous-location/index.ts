import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Returns a function that navigates to route with matching path name when a condition is satisfied.
 */
export function useNavigateWithPreviousLocation() {
  const location = useLocation();
  const navigate = useNavigate();

  /**
   * Navigates to route with matching path name when a condition is satisfied.
   *
   * @param path the path name
   * @param when the condition to be satisfied.
   */

  return (path: string, when: boolean) => {
    if (when) {
      navigate(path, {
        state: { previousLocation: location },
      });
    }
  };
}

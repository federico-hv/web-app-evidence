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

  // 👇🏾 This is supposed to help when a user goes to a dialog page by
  //    copy-pasting the link into the browser. There won't be a previous
  //    location.
  // STATUS: Testing for bugs
  // useEffect(() => {
  //   console.log(location.state);
  //
  //   if (!location.state?.previousLocation) {
  //     console.log(`navigate to ${pathName}`);
  //     navigate(pathName, {
  //       state: {
  //         previousLocation: fallback,
  //       },
  //     });
  //   }
  // }, []);

  return !location.state?.previousLocation
    ? fallback
    : location.state.previousLocation;
}

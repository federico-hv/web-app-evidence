import { Navigate, useLocation } from 'react-router-dom';
import { Fragment } from 'react';

interface LoadWithoutPreviousLocationProps {
  default: string;
}

/**
 * Loading a dialog page without a previous location renders the
 * dialog on top of an empty page. To circumvent this, we provide
 * this component, which takes a previous location to use as a placeholder.
 *
 * @param default
 *
 */
function LoadWithoutPreviousLocation({
  default: previousLocation,
}: LoadWithoutPreviousLocationProps) {
  const location = useLocation();

  if (!location.state?.previousLocation) {
    return (
      <Navigate to={location.pathname} state={{ previousLocation }} />
    );
  }

  return <Fragment />;
}
LoadWithoutPreviousLocation.displayName = 'LoadWithoutPreviousLocation';

export default LoadWithoutPreviousLocation;

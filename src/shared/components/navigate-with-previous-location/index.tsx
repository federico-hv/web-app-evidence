import { Navigate, useLocation } from 'react-router-dom';
import { NavigateWithPreviousLocationProps } from './types';

function NavigateWithPreviousLocation({
  to,
  fallback,
}: NavigateWithPreviousLocationProps) {
  const location = useLocation();

  const previousLocation = location.state?.previousLocation || fallback;

  return (
    <Navigate
      to={to}
      state={{
        previousLocation,
      }}
    />
  );
}

export default NavigateWithPreviousLocation;

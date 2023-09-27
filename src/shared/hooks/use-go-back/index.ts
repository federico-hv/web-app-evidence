import { useLocation, useNavigate } from 'react-router-dom';

export function useGoBack(fallback = '/') {
  const location = useLocation();
  const navigate = useNavigate();

  return () => {
    if (!location.state) {
      navigate(fallback);
    } else {
      navigate(location.state.from.pathname);
    }
  };
}

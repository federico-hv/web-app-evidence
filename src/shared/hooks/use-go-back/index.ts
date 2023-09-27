import { useLocation, useNavigate } from 'react-router-dom';

export const useGoBack = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return () => {
    if (!location.state) {
      navigate('/');
    } else {
      navigate(location.state.from.pathname);
    }
  };
};

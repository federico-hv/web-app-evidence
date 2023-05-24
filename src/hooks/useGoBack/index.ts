import { useNavigate } from 'react-router-dom';

export const useGoBack = () => {
  const navigate = useNavigate();

  return () => {
    if (window.history.state && window.history.state.id > 0) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };
};

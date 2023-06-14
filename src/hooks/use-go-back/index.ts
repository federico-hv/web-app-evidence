import { useNavigate } from 'react-router-dom';

export const useGoBack = () => {
  const navigate = useNavigate();

  return () => {
    navigate(-1);
    // if (window.history.state && window.history.state.id > 0) {
    //   navigate(-1);
    // } else {
    //   navigate('/');
    // }
  };
};

import { useNavigate } from 'react-router-dom';

export function usePageNavigation() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const goHome = () => {
    navigate('/dashboard');
  };

  const goTo = (path: string) => {
    navigate(path);
  };

  return { goBack, goHome, goTo, navigate };
}

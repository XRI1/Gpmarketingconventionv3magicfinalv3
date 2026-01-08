import { ComponentType } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';

interface OldNavigationProps {
  onBack?: () => void;
  onHome?: () => void;
  onNavigate?: (page: string) => void;
  onPointsEarned?: (points: number) => void;
}

export function withRouterNavigation<P extends object>(
  Component: ComponentType<P & OldNavigationProps>
): ComponentType<Omit<P, keyof OldNavigationProps>> {
  return function WrappedComponent(props: Omit<P, keyof OldNavigationProps>) {
    const navigate = useNavigate();
    const { setUserPoints } = useAppContext();

    const navigationProps: OldNavigationProps = {
      onBack: () => navigate(-1),
      onHome: () => navigate('/dashboard'),
      onNavigate: (page: string) => {
        // Handle different page formats
        const path = page.startsWith('/') ? page : `/${page}`;
        navigate(path);
      },
      onPointsEarned: (points: number) => {
        setUserPoints(prev => prev + points);
      },
    };

    return <Component {...(props as P)} {...navigationProps} />;
  };
}

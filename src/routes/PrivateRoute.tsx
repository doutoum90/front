import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

type PrivateRouteProps = {
  children: any;
};

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}
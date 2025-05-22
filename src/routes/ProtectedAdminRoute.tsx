// ProtectedAdminRoute.tsx
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthAdmin } from '../contexts/AuthAdminContext';
import { AuthAdminContext } from '../contexts/AuthAdminContext'

export const ProtectedAdminRoute = () => {
  const { adminUser } = useAuthAdmin();
  const location =  useContext(AuthAdminContext);
  return adminUser ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};
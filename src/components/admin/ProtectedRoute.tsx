import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthAdmin } from '../../contexts/AuthAdminContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedAdminRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { adminUser } = useAuthAdmin();
  const location = useLocation();

  if (!adminUser) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedAdminRoute; 
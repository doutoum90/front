import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes/route';
import { AuthNavigationHandler } from './contexts/AuthNavigationHandler';
import { AuthProvider } from './contexts/AuthContext';

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <AuthNavigationHandler />,
      children: routes,
    },
  ]);

  return (
    <AuthProvider
      onLoginSuccess={() => { }}
      onLogout={() => { }}
    >
      <RouterProvider router={router} />
    </AuthProvider>
  );
};
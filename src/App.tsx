import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes/route';
import { AuthNavigationHandler } from './contexts/AuthNavigationHandler';

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <AuthNavigationHandler />, // Layout racine
      children: routes // Toutes les routes imbriquées
    }
  ]);

  return <RouterProvider router={router} />;
};
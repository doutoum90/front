import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CSSReset } from '@chakra-ui/react';
import { routes } from './routes/route';
import { AuthProvider } from './contexts/AuthContext';
import { AuthAdminProvider } from './contexts/AuthAdminContext';
import theme from './theme/theme';

export default function App() {
  const router = createBrowserRouter(routes);

  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <AuthProvider
        onLoginSuccess={() => { }}
        onLogout={() => { }}>
        <AuthAdminProvider
          onLoginSuccess={() => { }}
          onLogout={() => { }}>
          <RouterProvider router={router} />
        </AuthAdminProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
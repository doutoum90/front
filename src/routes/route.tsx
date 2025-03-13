import { JSX, lazy, Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { PrivateRoute } from './PrivateRoute';
import { PublicLayout } from '../layouts/PublicLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { PrivateLayout } from '../layouts/PrivateLayout';

// Chargement paresseux avec gestion de loading
const lazyLoad = (Component: React.LazyExoticComponent<() => JSX.Element>) => (
  <Suspense fallback={<LoadingSpinner />}>
    <Component />
  </Suspense>
);

// Composants publics
const Home = lazy(() => import('../components/public/Home'));
const About = lazy(() => import('../components/public/About'));
const Actions = lazy(() => import('../components/public/Actions'));
const Formules = lazy(() => import('../components/public/Formules'));
const Faq = lazy(() => import('../components/public/Faq'));
const Contact = lazy(() => import('../components/public/Contact'));
const PrivacyPolicy = lazy(() => import('../components/public/PrivacyPolicy'));
const TermsOfService = lazy(() => import('../components/public/TermsOfService'));

const FreeTrialPage = lazy(() => import('../components/public/FreeTrialPage/FreeTrialPage'));
const TrialConfirmation = lazy(() => import('../components/public/FreeTrialPage/TrialConfirmation'));

const LoginForm = lazy(() => import('../components/auths/LoginForm'));
const PasswordReset = lazy(() => import('../components/auths/PasswordReset'));
const RegisterForm = lazy(() => import('../components/auths/RegisterForm'));
// Composants privés
const Dashboard = lazy(() => import('../components/protected/Dashboard'));
const Profile = lazy(() => import('../components/protected/Profile'));
const Settings = lazy(() => import('../components/protected/Setting'));
const SubscriptionFlow = lazy(() => import('../components/public/SubscriptionFlow'));

export const routes = [
  {
    path: '/',
    element: <PublicLayout><Outlet /></PublicLayout>,
    children: [
      // Routes publiques
      { path: '', element: lazyLoad(Home) },
      { path: 'about', element: lazyLoad(About) },
      { path: 'actions', element: lazyLoad(Actions) },
      { path: 'formules', element: lazyLoad(Formules) },
      { path: 'faq', element: lazyLoad(Faq) },
      { path: 'contact', element: lazyLoad(Contact) },
      { path: 'privacy', element: lazyLoad(PrivacyPolicy) },
      { path: 'terms', element: lazyLoad(TermsOfService) },
      { path: 'subscription', element: lazyLoad(SubscriptionFlow) },
      { path: 'free-trial', element: lazyLoad(FreeTrialPage) },
      { path: 'trial-confirmation', element: lazyLoad(TrialConfirmation) },
    ],
  },
  {
    path: 'auth',
    element: <AuthLayout><Outlet /></AuthLayout>,
    children: [
      { path: 'login', element: lazyLoad(LoginForm) },
      { path: 'register', element: lazyLoad(RegisterForm) },
      { path: 'password-reset', element: lazyLoad(PasswordReset) },
    ],
  },
  // Routes privées avec layout commun
  {
    path: 'espace-membre',
    element: (
      <PrivateRoute>
        <PrivateLayout>
          <Outlet />
        </PrivateLayout>
      </PrivateRoute>
    ),
    children: [
      { path: 'dashboard', element: lazyLoad(Dashboard) },
      { path: 'profile', element: lazyLoad(Profile) },
      { path: 'settings', element: lazyLoad(Settings) },
    ],
  },
  // Gestion des erreurs et redirections
  { path: '404', element: <div>Page non trouvée</div> },
  { path: '*', element: <Navigate to="/404" replace /> },
];

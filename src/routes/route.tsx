import { JSX, lazy, Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { PrivateRoute } from './PrivateRoute';
import { PublicLayout } from '../layouts/PublicLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { PrivateLayout } from '../layouts/PrivateLayout';

const lazyLoad = (Component: React.LazyExoticComponent<() => JSX.Element>) => (
  <Suspense fallback={<LoadingSpinner />}>
    <Component />
  </Suspense>
);

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
const CompetitorsPage = lazy(() => import('../components/protected/CompetitorsPage'));

const EcranBoard = lazy(() => import('../components/public/FreeTrialPage/EcranBoard'));
const LoginForm = lazy(() => import('../components/auths/LoginForm'));
const PasswordReset = lazy(() => import('../components/auths/PasswordReset'));
const RegisterForm = lazy(() => import('../components/auths/RegisterForm'));
// Composants privés
const Dashboard = lazy(() => import('../components/protected/Dashboard'));
const Profile = lazy(() => import('../components/protected/Profile'));
const Settings = lazy(() => import('../components/protected/Setting'));
const SubscriptionFlow = lazy(() => import('../components/public/SubscriptionFlow'));
const Autres = lazy(() => import('../components/protected/Autres'));

const VeilleConcurrentielle = lazy(() => import('../components/protected/VeilleConcurrentielle'));
const Alerts = lazy(() => import('../components/protected/Alerts'));
const Payments = lazy(() => import('../components/protected/Payments'));
const Regulations = lazy(() => import('../components/protected/Regulations'));


const Opportunites = lazy(() => import('../components/protected/Opportunites'));
const AnalyseMarche = lazy(() => import('../components/protected/AnalyseMarche'));

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
      { path: 'profil', element: lazyLoad(Profile) },
      { path: 'parametres', element: lazyLoad(Settings) },
      { path: 'ecran-board', element: lazyLoad(EcranBoard) },
      { path: 'veille-concurentielle', element: lazyLoad(VeilleConcurrentielle) },
      { path: 'analyse-de-marche', element: lazyLoad(AnalyseMarche) },
      { path: 'surveillance-des-opportunites-et-risques', element: lazyLoad(Opportunites) },
      { path: 'rapport-sur-mesure', element: lazyLoad(Regulations) },
      { path: 'subscription', element: lazyLoad(SubscriptionFlow) },
      { path: 'payments', element: lazyLoad(Payments) },

    ],
  },
  // Gestion des erreurs et redirections
  { path: '404', element: <div>Page non trouvée</div> },
  { path: '*', element: <Navigate to="/404" replace /> },
];

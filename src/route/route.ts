/* import { Home } from '../components/Home'
import { LoginForm } from '../components/LoginForm'
import { Dashboard } from '../components/Dashboard'

export const routes = [
    path: '/',
    errorElement: <ErrorPage />,
    element: (
        <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/login',
        element: <LoginForm />
    },
    {
        path: '/dashboard',
        element: <Dashboard />
    }
]
]
 */
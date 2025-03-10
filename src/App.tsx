import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LoginForm } from './components/auths/LoginForm';
import { Dashboard } from './components/Dashboard';
import { About } from './components/public/About';
import { Contact } from './components/public/Contact';
import { PasswordReset } from './components/auths/PasswordReset';
import { PrivateRoute } from './routes/PrivateRoute';
import { Home } from './components/public/Home';
import { RegisterForm } from './components/auths/RegisterForm';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/password-reset" element={<PasswordReset />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
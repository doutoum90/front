import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const useLogin = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isFetching, setIsFetching] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setIsFetching(true);
            setError('');
            await login({ email, password });
            navigate('/espace-membre/dashboard');
        } catch (err) {
            setError('Identifiants incorrects ou problème de connexion');
        } finally {
            setIsFetching(false);
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        error,
        isFetching,
        handleSubmit,
    };
};
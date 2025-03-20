import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const usePasswordReset = () => {
    const { resetPassword } = useAuth();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isFetching, setIsFetching] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setIsFetching(true);
            setError('');
            await resetPassword(email);
            setSuccess(true);
        } catch (err) {
            setError('Une erreur est survenue lors de la réinitialisation');
        } finally {
            setIsFetching(false);
        }
    };

    return {
        email,
        setEmail,
        error,
        success,
        isFetching,
        handleSubmit,
    };
};
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const useProfile = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const formatDate = (createdAt?: string) =>
        createdAt
            ? `Membre depuis ${new Date(createdAt).toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            })}`
            : '';

    const handleEditProfile = () => navigate('/espace-membre/parametres');

    return {
        user,
        formatDate,
        handleEditProfile,
    };
};
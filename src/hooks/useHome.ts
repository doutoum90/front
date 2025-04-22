import { useNavigate } from 'react-router-dom';
import { TITLES, HOME_PARAGRAPHS } from '../constantes';

export const useHome = () => {
    const navigate = useNavigate();

    const handleStartTrial = () => {
        navigate('/subscription');
    };

    return {
        titles: TITLES,
        paragraphs: HOME_PARAGRAPHS,
        handleStartTrial
    };
}; 
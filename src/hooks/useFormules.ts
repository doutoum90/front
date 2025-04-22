import { useNavigate } from 'react-router-dom';
import { FONCTIONNALITES, FORMULE_TITLES, COMMENTAIRES, SUBSCRIBE_BUTTON, FONCTIONNALITES_HEADER } from '../constantes';

export const useFormules = () => {
    const navigate = useNavigate();

    const handleSubscribe = (rowName: string) => {
        navigate(`/subscription?plan=${rowName.charAt(0).toUpperCase() + rowName.slice(1)}`);
    };

    const handleGlobalSubscribe = () => {
        navigate('/subscription');
    };

    const computeRow = (row: any, rowName: string) => {
        if (row.type === 'btn') {
            return {
                type: 'button',
                onClick: () => handleSubscribe(rowName),
                label: SUBSCRIBE_BUTTON
            };
        } else if (row.type === 'text') {
            return {
                type: 'text',
                content: row[rowName]
            };
        } else if (row.type === 'check') {
            return {
                type: 'check',
                value: row[rowName]
            };
        }
    };

    return {
        titles: FORMULE_TITLES,
        features: FONCTIONNALITES,
        comments: COMMENTAIRES,
        headers: FONCTIONNALITES_HEADER,
        subscribeButton: SUBSCRIBE_BUTTON,
        computeRow,
        handleGlobalSubscribe
    };
}; 
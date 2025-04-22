import { apiFetch } from './api';

interface ContactFormData {
    message: string;
    email: string;
    name: string;
    subject: string;
}

export const contactService = {
    sendContactMessage: async (formData: ContactFormData) => {
        const response = await apiFetch('/api/support/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
            throw new Error('Erreur lors de l\'envoi du message');
        }
        
        return response;
    }
}; 
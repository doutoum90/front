import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { contactService } from '../services/contactService';

interface ContactForm {
    message: string;
    email: string;
    name: string;
    subject: string;
}

const initialFormState: ContactForm = {
    message: '',
    email: '',
    name: '',
    subject: ''
};

export const useContactForm = () => {
    const [formData, setFormData] = useState<ContactForm>(initialFormState);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const toast = useToast();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const resetForm = () => {
        setFormData(initialFormState);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await contactService.sendContactMessage(formData);
            toast({
                title: 'Message envoyé',
                description: 'Votre message a été envoyé avec succès.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            resetForm();
        } catch (error) {
            toast({
                title: 'Erreur',
                description: 'Une erreur est survenue lors de l\'envoi du message.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        formData,
        isSubmitting,
        handleInputChange,
        handleSubmit
    };
}; 
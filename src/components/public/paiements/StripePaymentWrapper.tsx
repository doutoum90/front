import { useState, useEffect } from 'react';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { PaymentForm } from '../Subscrptions/PaymentForm';
import { StripePaymentWrapperProps } from '../../../types';
import { Spinner } from '@chakra-ui/react';


export const StripePaymentWrapper = ({ plan, user, onSuccess }: StripePaymentWrapperProps) => {
    const [stripePromise, setStripePromise] = useState<Stripe | null>(null);

    useEffect(() => {
        const initializeStripe = async () => {
            const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY!);
            setStripePromise(stripe);
        };
        initializeStripe();
    }, []);

    if (!stripePromise) {
        return <Spinner />;
    }

    return (
        <Elements stripe={stripePromise}>
            <PaymentForm plan={plan} user={user} onSuccess={onSuccess} />
        </Elements>
    );
};
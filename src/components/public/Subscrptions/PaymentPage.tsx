import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentForm } from './PaymentForm';
import { PaymentPageProps } from '../../../types';

const stripePromise = loadStripe(
    import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_51R2VPYQMk6qRSmo1Hyhn24U7qXcHZoWVsDj0N9KejrLAaGjQc1IEIUzWyPla6ieTpztbur8MQfGlhaTFAOPhmf3R00ikVtdpEG'
);

export const PaymentPage = ({ user, plan, onSuccess }: PaymentPageProps) => {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm
                user={user}
                plan={plan}
                onSuccess={onSuccess}
            />
        </Elements>
    );
};
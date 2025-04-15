import { useState } from 'react';
import { Box, Stepper, Step, StepIndicator, StepStatus, StepIcon, StepNumber, StepTitle, StepDescription, StepSeparator, VStack, HStack, Button } from '@chakra-ui/react';
import { useAuth } from '../../../contexts/AuthContext';
import { UserData, SubscriptionPlan } from '../../../types';
import { PlanSelection } from './PlanSelection';
import { PaymentPage } from './PaymentPage';
import { ConfirmationScreen } from './ConfirmationScreen';
import { AccountCreationForm } from './AccountCreationForm';
import { SubscriptionStepsData } from '../../../types';
import { useSearchParams } from 'react-router-dom';

const SubscriptionFlow = () => {
    const [searchParams] = useSearchParams();
    const planFromUrl = searchParams.get('plan') as "Essentiel" | "PRO" | "Expert";
    const [activeStep, setActiveStep] = useState(0);
    const [stepData, setStepData] = useState<SubscriptionStepsData>({});
    const { register } = useAuth();

    const steps = planFromUrl ? [
        { title: 'Compte', description: 'Création du profil' },
        { title: 'Paiement', description: 'Informations de paiement' },
        { title: 'Confirmation', description: 'Récapitulatif' },
    ] : [
        { title: 'Compte', description: 'Création du profil' },
        { title: 'Abonnement', description: 'Choix de votre formule' },
        { title: 'Paiement', description: 'Informations de paiement' },
        { title: 'Confirmation', description: 'Récapitulatif' },
    ];

    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep(activeStep - 1);
        }
    };

    const handleAccountCreation = async (data: UserData) => {
        setStepData({ ...stepData, userData: data });
        if (planFromUrl) {
            // Si le plan est dans l'URL, on passe directement au paiement
            const plan: SubscriptionPlan = {
                id: '',
                name: planFromUrl,
                price: 0, // À ajuster selon votre logique
                features: []
            };
            await handleSelectPlan(plan, false);
        } else {
            setActiveStep(1);
        }
    };

    const handleSelectPlan = async (plan: SubscriptionPlan, trialActive: boolean) => {
        try {
            await register({
                ...stepData.userData!,
                trialActive,
                typeAbonnement: plan.name,
            });
            setStepData({ ...stepData, trialActive, selectedPlan: plan });
            setActiveStep(planFromUrl ? 1 : 2);
        } catch (error) {
            console.error('Erreur lors du démarrage de l\'essai:', error);
        }
    };

    const handlePaymentSuccess = () => {
        setStepData({ ...stepData, trialActive: false });
        setActiveStep(planFromUrl ? 2 : 3);
    };

    return (
        <HStack spacing={0} width="100%" maxWidth="100vw" pt={12} px={{ base: 4, md: 8 }}>
            <VStack width="100%" maxWidth="container.xl" marginX="auto">
                <Box maxW="6xl" mx="auto" py={10}>
                    <Stepper index={activeStep} mb={10}>
                        {steps.map((step, index) => (
                            <Step key={index}>
                                <StepIndicator>
                                    <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
                                </StepIndicator>
                                <Box flexShrink="0">
                                    <StepTitle>{step.title}</StepTitle>
                                    <StepDescription>{step.description}</StepDescription>
                                </Box>
                                <StepSeparator />
                            </Step>
                        ))}
                    </Stepper>

                    {activeStep === 0 && (
                        <AccountCreationForm onSuccess={handleAccountCreation} />
                    )}

                    {!planFromUrl && activeStep === 1 && (
                        <>
                            <PlanSelection onSelectPlan={handleSelectPlan} />
                            <Button mt={4} onClick={handleBack} variant="outline">Retour</Button>
                        </>
                    )}

                    {((planFromUrl && activeStep === 1) || (!planFromUrl && activeStep === 2)) &&
                        stepData.selectedPlan && stepData.userData && (
                            <>
                                <PaymentPage
                                    user={stepData.userData}
                                    plan={stepData.selectedPlan}
                                    onSuccess={handlePaymentSuccess}
                                />
                                <Button mt={4} onClick={handleBack} variant="outline">Retour</Button>
                            </>
                        )}

                    {((planFromUrl && activeStep === 2) || (!planFromUrl && activeStep === 3)) &&
                        stepData.userData && stepData.selectedPlan && (
                            <ConfirmationScreen
                                user={stepData.userData}
                                plan={stepData.selectedPlan}
                                trialActive={stepData.trialActive!}
                            />
                        )}
                </Box>
            </VStack>
        </HStack>
    );
};

export default SubscriptionFlow;
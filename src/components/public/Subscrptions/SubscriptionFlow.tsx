import { useState } from 'react';
import { Box, Stepper, Step, StepIndicator, StepStatus, StepIcon, StepNumber, StepTitle, StepDescription, StepSeparator, VStack, HStack, Button } from '@chakra-ui/react';
import { useAuth } from '../../../contexts/AuthContext';
import { UserData, SubscriptionPlan } from '../../../types';
import { PlanSelection } from './PlanSelection';
import { PaymentPage } from './PaymentPage';
import { ConfirmationScreen } from './ConfirmationScreen';
import { AccountCreationForm } from './AccountCreationForm';
import { SubscriptionStepsData } from '../../../types';

enum SubscriptionSteps {
    ACCOUNT_CREATION,
    PLAN_SELECTION,
    PAYMENT,
    CONFIRMATION,
}

export const SubscriptionFlow = () => {
    const [activeStep, setActiveStep] = useState(SubscriptionSteps.ACCOUNT_CREATION);
    const [stepData, setStepData] = useState<SubscriptionStepsData>({});
    const { register } = useAuth();

    const steps = [
        { title: 'Compte', description: 'Création du profil' },
        { title: 'Abonnement', description: 'Choix de votre formule' },
        { title: 'Paiement', description: 'Informations de paiement' },
        { title: 'Confirmation', description: 'Récapitulatif' },
    ];

    const handleBack = () => {
        if (activeStep > SubscriptionSteps.ACCOUNT_CREATION) {
            setActiveStep(activeStep - 1);
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
            setActiveStep(SubscriptionSteps.PAYMENT);
        } catch (error) {
            console.error('Erreur lors du démarrage de l\'essai:', error);
            // Ajouter une alerte utilisateur ici si nécessaire
        }
    };
    const handlePaymentSuccess = () => {
        setStepData({ ...stepData, trialActive: false });
        setActiveStep(SubscriptionSteps.CONFIRMATION);
    }

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

                    {activeStep === SubscriptionSteps.ACCOUNT_CREATION && (
                        <AccountCreationForm
                            onSuccess={(data: UserData) => {
                                setStepData({ ...stepData, userData: data });
                                setActiveStep(SubscriptionSteps.PLAN_SELECTION);
                            }}
                        />
                    )}

                    {activeStep === SubscriptionSteps.PLAN_SELECTION && (
                        <>
                            <PlanSelection onSelectPlan={handleSelectPlan} />
                            <Button mt={4} onClick={handleBack} variant="outline">Retour</Button>
                        </>
                    )}

                    {activeStep === SubscriptionSteps.PAYMENT && stepData.selectedPlan && stepData.userData && (
                        <>
                            <PaymentPage
                                user={stepData.userData}
                                plan={stepData.selectedPlan}
                                onSuccess={handlePaymentSuccess}
                            />
                            <Button mt={4} onClick={handleBack} variant="outline">Retour</Button>
                        </>
                    )}

                    {activeStep === SubscriptionSteps.CONFIRMATION && stepData.userData && stepData.selectedPlan && (
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
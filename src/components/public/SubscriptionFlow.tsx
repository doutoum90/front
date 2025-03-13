import { useState } from 'react';
import { Box, Stepper, Step, StepIndicator, StepStatus, StepIcon, StepNumber, StepTitle, StepDescription, StepSeparator, VStack, HStack } from '@chakra-ui/react';
import { UserData, SubscriptionPlan } from '../../types';
import { PlanSelection } from './PlanSelection';
import { PaymentForm } from './PaymentForm';
import { ConfirmationScreen } from './ConfirmationScreen';
import { AccountCreationForm } from './AccountCreationForm';

enum SubscriptionSteps {
    ACCOUNT_CREATION,
    PLAN_SELECTION,
    PAYMENT,
    CONFIRMATION
}

export const SubscriptionFlow = () => {
    const [activeStep, setActiveStep] = useState(SubscriptionSteps.ACCOUNT_CREATION);
    const [userData, setUserData] = useState<UserData>();
    const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>();

    const steps = [
        { title: 'Compte', description: 'Création du profil' },
        { title: 'Abonnement', description: 'Choix de votre formule' },
        { title: 'Paiement', description: 'Informations de paiement' },
        { title: 'Confirmation', description: 'Récapitulatif' }
    ];

    return (
        <HStack
        spacing={0}
        width="100%"
        maxWidth="100vw"
        pt={12}
        px={{ base: 4, md: 8 }}
      >
        <VStack
          width="100%"
          maxWidth="container.xl"
          marginX="auto"
        >
        <Box maxW="6xl" mx="auto" py={10}>
            <Stepper index={activeStep} mb={10}>
                {steps.map((step, index) => (
                    <Step key={index}>
                        <StepIndicator>
                            <StepStatus
                                complete={<StepIcon />}
                                incomplete={<StepNumber />}
                                active={<StepNumber />}
                            />
                        </StepIndicator>
                        <Box flexShrink='0'>
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
                        setUserData(data);
                        setActiveStep(SubscriptionSteps.PLAN_SELECTION);
                    }}
                />
            )}
            {activeStep === SubscriptionSteps.PLAN_SELECTION && (
                <PlanSelection
                    onSelectPlan={(plan) => {
                        setSelectedPlan(plan);
                        setActiveStep(SubscriptionSteps.PAYMENT);
                    }}
                />
            )}

            {activeStep === SubscriptionSteps.PAYMENT && (
                <PaymentForm
                    user={userData!}
                    plan={selectedPlan!}
                    onSuccess={() => setActiveStep(SubscriptionSteps.CONFIRMATION)}
                />
            )}

            {activeStep === SubscriptionSteps.CONFIRMATION && (
                    <ConfirmationScreen user={userData!} plan={selectedPlan!} />
                )}
            </Box>
        </VStack>
        </HStack>
    );
};

export default SubscriptionFlow;
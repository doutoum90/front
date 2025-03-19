import { useState, useEffect } from 'react';
import { Box, Heading, VStack, Button, Text, Table, Thead, Tbody, Tr, Th, Td, Select, useToast } from '@chakra-ui/react';
import { useAuth } from '../../contexts/AuthContext';
import { PRICE_MAP } from '../../constantes';

export const SuiviPayment = () => {
  const { user, getTrialStatus } = useAuth();
  const [subscriptionStatus, setSubscriptionStatus] = useState<string>('loading');
  const [paymentHistory, setPaymentHistory] = useState<any[]>([]);
  const [nextPayment, setNextPayment] = useState<{ nextPaymentDate: number; amount: number } | null>(null);
  const [newPlan, setNewPlan] = useState<string>(user?.typeAbonnement || 'Essentiel');
  const toast = useToast();

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) return;

      try {
        const statusRes = await fetch('/api/payments/status', { headers: { Authorization: `Bearer ${accessToken}` } });
        const statusData = await statusRes.json();
        setSubscriptionStatus(statusData.status);

        const historyRes = await fetch('/api/payments/history', { headers: { Authorization: `Bearer ${accessToken}` } });
        const historyData = await historyRes.json();
        setPaymentHistory(historyData);

        const nextRes = await fetch('/api/payments/next-payment', { headers: { Authorization: `Bearer ${accessToken}` } });
        const nextData = await nextRes.json();
        setNextPayment(nextData);
      } catch (error) {
        console.error('Error fetching subscription data:', error);
      }
    };

    fetchSubscriptionData();
    if (user?.trialActive) {
      getTrialStatus().then(status => {
        if (status.isActive) setSubscriptionStatus(`trial - ${status.daysLeft} jours restants`);
      });
    }
  }, [user, getTrialStatus]);

  const handlePlanChange = async () => {
    const accessToken = localStorage.getItem('access_token');
    try {
      const res = await fetch('/api/payments/upgrade-downgrade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ newPriceId: PRICE_MAP[newPlan as keyof typeof PRICE_MAP] }),
      });

      if (!res.ok) throw new Error('Failed to update plan');
      const data = await res.json();
      setSubscriptionStatus(data.status);
      toast({ title: 'Plan mis à jour', description: `Vous êtes maintenant sur ${newPlan}`, status: 'success' });
    } catch (error) {
      toast({ title: 'Erreur', description: 'Échec de la mise à jour du plan', status: 'error' });
    }
  };

  const handleCancel = async () => {
    const accessToken = localStorage.getItem('access_token');
    try {
      const res = await fetch('/api/payments/cancel', {
        method: 'POST',
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!res.ok) throw new Error('Failed to cancel subscription');
      setSubscriptionStatus('canceled');
      toast({ title: 'Abonnement annulé', status: 'success' });
    } catch (error) {
      toast({ title: 'Erreur', description: 'Échec de l\'annulation', status: 'error' });
    }
  };

  return (
    <Box p={8} maxW="container.xl" mx="auto">
      <VStack spacing={8} align="stretch">
        <Heading>Tableau de Bord</Heading>

        {/* Statut de l'Abonnement */}
        <Box>
          <Text fontSize="xl">Statut actuel : {subscriptionStatus}</Text>
          {nextPayment && (
            <Text>Prochain prélèvement : {new Date(nextPayment.nextPaymentDate * 1000).toLocaleDateString()} - {(nextPayment.amount / 100).toFixed(2)}€</Text>
          )}
        </Box>

        {/* Changer de Plan */}
        <Box>
          <Text fontSize="lg" mb={2}>Changer de formule :</Text>
          <Select value={newPlan} onChange={(e) => setNewPlan(e.target.value)} mb={4}>
            <option value="Essentiel">Essentiel (29€/mois)</option>
            <option value="PRO">PRO (59€/mois)</option>
            <option value="Expert">Expert (99€/mois)</option>
          </Select>
          <Button colorScheme="blue" onClick={handlePlanChange} isDisabled={newPlan === user?.typeAbonnement}>
            Mettre à jour
          </Button>
        </Box>

        {/* Historique des Paiements */}
        <Box>
          <Text fontSize="lg" mb={2}>Historique des paiements :</Text>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th>Montant</Th>
                <Th>Statut</Th>
              </Tr>
            </Thead>
            <Tbody>
              {paymentHistory.map((invoice) => (
                <Tr key={invoice.id}>
                  <Td>{new Date(invoice.created * 1000).toLocaleDateString()}</Td>
                  <Td>{(invoice.amount_paid / 100).toFixed(2)}€</Td>
                  <Td>{invoice.status}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        {/* Annuler l'Abonnement */}
        <Button colorScheme="red" onClick={handleCancel} isDisabled={subscriptionStatus === 'canceled' || subscriptionStatus.includes('trial')}>
          Annuler l'abonnement
        </Button>
      </VStack>
    </Box>
  );
};

export default SuiviPayment;
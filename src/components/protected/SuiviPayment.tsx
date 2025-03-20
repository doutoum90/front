import { Box, Heading, Text, Button, Select, VStack, Spinner, Alert, AlertIcon, Tooltip } from '@chakra-ui/react';
import { useSubscription } from '../../hooks/useSubscription';
import { DataTable } from '../common/DataTable';
import { PRICE_MAP } from '../../constantes';

const columns = [
  { header: 'Date', accessor: (invoice: any) => new Date(invoice.created * 1000).toLocaleDateString() },
  { header: 'Montant', accessor: (invoice: any) => `${(invoice.amount_paid / 100).toFixed(2)}€` },
  { header: 'Statut', accessor: 'status' },
];

export const SuiviPayment = () => {
  const { status, paymentHistory, nextPayment, loading, error, newPlan, setNewPlan, updatePlan, cancelSubscription } =
    useSubscription();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="100vh">
        <Spinner size="xl" color="brand.500" />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert status="error" variant="subtle" flexDirection="column" alignItems="center">
        <AlertIcon boxSize="40px" mr={0} />
        <Text mt={4} mb={1} fontSize="lg">
          {error}
        </Text>
      </Alert>
    );
  }

  return (
    <Box p={8} maxW="container.xl" mx="auto">
      <VStack spacing={8} align="stretch">
        <Heading size="xl">Suivi des Paiements</Heading>
        <Box>
          <Text fontSize="xl">Statut actuel : {status}</Text>
          {nextPayment && (
            <Text>
              Prochain prélèvement : {new Date(nextPayment.nextPaymentDate * 1000).toLocaleDateString()} -{' '}
              {(nextPayment.amount / 100).toFixed(2)}€
            </Text>
          )}
        </Box>
        <Box>
          <Text fontSize="lg" mb={2}>Changer de formule :</Text>
          <Select value={newPlan} onChange={(e) => setNewPlan(e.target.value)} mb={4}>
            <option value="Essentiel">Essentiel (29€/mois)</option>
            <option value="PRO">PRO (59€/mois)</option>
            <option value="Expert">Expert (99€/mois)</option>
          </Select>
          <Tooltip label={newPlan === status ? 'Plan déjà actif' : 'Mettre à jour votre abonnement'} placement="top">
            <Button
              variant="primary"
              onClick={() => updatePlan(PRICE_MAP[newPlan as keyof typeof PRICE_MAP])}
              isDisabled={newPlan === status}
            >
              Mettre à jour
            </Button>
          </Tooltip>
        </Box>
        <Box>
          <Text fontSize="lg" mb={2}>Historique des paiements :</Text>
          <DataTable columns={columns} data={paymentHistory} />
        </Box>
        <Tooltip
          label={
            status === 'canceled' || status.includes('trial')
              ? 'Action non disponible'
              : 'Annuler votre abonnement'
          }
          placement="top"
        >
          <Button
            colorScheme="red"
            onClick={cancelSubscription}
            isDisabled={status === 'canceled' || status.includes('trial')}
          >
            Annuler l'abonnement
          </Button>
        </Tooltip>
      </VStack>
    </Box>
  );
};

export default SuiviPayment;
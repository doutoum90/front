import { Heading, Text, Button, VStack, Table, Thead, Tr, Th, Tbody, Td, Box, HStack } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { useFormules } from '../../hooks/useFormules';

export const Formules = () => {
    const { titles, features, comments, headers, subscribeButton, computeRow, handleGlobalSubscribe } = useFormules();

    const renderCell = (rowData: any) => {
        if (rowData.type === 'button') {
            return (
                <Button
                    variant='ghost'
                    color='white'
                    bg='#7cb3cf'
                    size='lg'
                    onClick={rowData.onClick}>
                    {rowData.label}
                </Button>
            );
        } else if (rowData.type === 'text') {
            return rowData.content;
        } else if (rowData.type === 'check') {
            return <CheckIcon color={rowData.value ? 'green.500' : 'red.500'} />;
        }
    };

    return (
        <HStack
            spacing={0}
            width='100%'
            maxWidth='100vw'
            pt={12}
            px={{ base: 4, md: 8 }}
        >
            <VStack
                width='100%'
                maxWidth='container.xl'
                marginX='auto'
            >
                <Text size='xl' color='teal.600' mb={4}>
                    {titles.title}
                </Text>
                <Text size='xl' color='teal.600' mb={4}>
                    {titles.subtitle}
                </Text>
                <Table variant='simple' size='lg'>
                    <Thead>
                        <Tr>
                            {headers.map((header, index) => (
                                <Th bg='gray.200' fontSize='xl' borderRightWidth='1px' borderColor='whiteAlpha.300' key={index}>
                                    {header}
                                </Th>
                            ))}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {features.map((feature, index) => (
                            <Tr key={index}>
                                <Td fontWeight='semibold'>{feature.nom}</Td>
                                <Td textAlign='center'>{renderCell(computeRow(feature, 'essentiel'))}</Td>
                                <Td textAlign='center'>{renderCell(computeRow(feature, 'pro'))}</Td>
                                <Td textAlign='center'>{renderCell(computeRow(feature, 'expert'))}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
                <Box>
                    <Heading as='h3' size='md' color='gray.800' mb={4}>
                        {titles.commentaires}
                    </Heading>
                    {comments.map((commentaire, index) => (
                        <Text color='gray.600' lineHeight='tall' key={index}>
                            {commentaire.nom} <br />
                            {commentaire.commentaire}
                        </Text>
                    ))}
                    <Button 
                        ml='auto'
                        bg='#3d84a8'
                        color='white'
                        borderRadius='2xl'
                        mx='auto'
                        size='lg'
                        px={4}
                        py={6}
                        _hover={{ transform: 'scale(1.05)' }}
                        transition='all 0.2s'
                        onClick={handleGlobalSubscribe}
                    >
                        {subscribeButton}
                    </Button>
                </Box>
            </VStack>
        </HStack>
    );
};

export default Formules;

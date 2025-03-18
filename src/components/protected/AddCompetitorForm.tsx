import { useState } from 'react';
import { FormControl, FormLabel, Input, Button, VStack } from '@chakra-ui/react';
import { AddCompetitorFormProps } from '../../types';


export const AddCompetitorForm = ({ onAdd }: AddCompetitorFormProps) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const handleAdd = () => {
        onAdd({ name, description, image });
    };
    return (
        <VStack spacing={4} align="start">
            <FormControl id="name">
                <FormLabel>Nom</FormLabel>
                <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl id="description">
                <FormLabel>Description</FormLabel>
                <Input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </FormControl>
            <FormControl id="image">
                <FormLabel>Image</FormLabel>
                <Input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
            </FormControl>
            <Button onClick={handleAdd}>Ajouter</Button>
        </VStack>

    );
};
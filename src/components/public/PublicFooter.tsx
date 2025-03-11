import { Link, UnorderedList, ListItem } from '@chakra-ui/react';

export const PublicFooter = () => {
    return (

        <UnorderedList display="flex" justifyContent="space-between" alignItems="center" gap={4}>
            <ListItem>
                <Link href="/">Lien Utiles</Link>
            </ListItem>
            <ListItem>
                <Link href="/">Contact</Link>
            </ListItem>
            <ListItem>
                <Link href="/">  Mentions Légales</Link>
            </ListItem>

        </UnorderedList>
    );
};

export default PublicFooter;
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  getStaticPages,
  deleteStaticPage,
  StaticPage,
} from '../../services/staticPagesService';

const StaticPages = () => {
  const [pages, setPages] = useState<StaticPage[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await getStaticPages();
      setPages(response);
    } catch (error) {
      console.error('Erreur lors de la récupération des pages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (page: StaticPage) => {
    navigate(`/admin/static-pages/${page.id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteStaticPage(id);
      await fetchPages();
    } catch (error) {
      console.error('Erreur lors de la suppression de la page:', error);
    }
  };

  if (loading) {
    return <Typography>Chargement...</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Pages statiques</Typography>
        <Button variant="contained" color="primary">
          Ajouter une page
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Titre</TableCell>
              <TableCell>Slug</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pages.map((page) => (
              <TableRow key={page.id}>
                <TableCell>{page.title}</TableCell>
                <TableCell>{page.slug}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(page)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(page.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StaticPages; 
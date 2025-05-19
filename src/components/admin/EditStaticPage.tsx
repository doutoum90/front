import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material';
import {
  getStaticPage,
  updateStaticPage,
  StaticPage,
} from '../../services/staticPagesService';

const EditStaticPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [page, setPage] = useState<StaticPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id) {
      fetchPage();
    }
  }, [id]);

  const fetchPage = async () => {
    try {
      const response = await getStaticPage(id!);
      setPage(response);
    } catch (error) {
      console.error('Erreur lors de la récupération de la page:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!page) return;

    setSaving(true);
    try {
      await updateStaticPage(page.id, page);
      navigate('/admin/static-pages');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la page:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!page) {
    return <Typography>Page non trouvée</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Éditer la page
      </Typography>
      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Titre"
            value={page.title}
            onChange={(e) => setPage({ ...page, title: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Slug"
            value={page.slug}
            onChange={(e) => setPage({ ...page, slug: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Contenu"
            value={page.content}
            onChange={(e) => setPage({ ...page, content: e.target.value })}
            margin="normal"
            multiline
            rows={10}
            required
          />
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={saving}
            >
              {saving ? 'Sauvegarde...' : 'Sauvegarder'}
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/admin/static-pages')}
            >
              Annuler
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default EditStaticPage; 
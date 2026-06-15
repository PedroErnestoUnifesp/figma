import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Box, Typography, IconButton, Button, Card, CardContent, Chip, Divider, useTheme } from '@mui/material';
import { ArrowBack, AccessTime, LocationOn, Person, Bookmark, BookmarkBorder, Language } from '@mui/icons-material';
import { events } from '../data/mockData';

const categoryColors: Record<string, string> = {
  music: '#9c27b0', theater: '#f44336', food: '#ff9800', art: '#2196f3', workshop: '#4caf50', other: '#607d8b',
};
const categoryLabels: Record<string, string> = {
  music: 'Música', theater: 'Teatro', food: 'Gastronomia', art: 'Arte', workshop: 'Oficina', other: 'Outros',
};

export function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [isSaved, setIsSaved] = useState(false);

  const event = events.find(e => e.id === id);
  if (!event) return <Box sx={{ p: 3 }}><Typography>Evento não encontrado</Typography></Box>;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: theme.palette.background.default }}>
      <Box sx={{ height: 200, bgcolor: categoryColors[event.category], color: 'white', position: 'relative', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ p: 2 }}>
          <IconButton onClick={() => navigate(-1)} sx={{ color: 'white', mb: 2 }}><ArrowBack /></IconButton>
        </Box>
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', px: 3 }}>
          <Box>
            <Chip label={categoryLabels[event.category]} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.3)', color: 'white', mb: 1 }} />
            <Typography variant="h5" sx={{ mb: 1 }}>{event.title}</Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ p: 2, mt: -2 }}>
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>Informações</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <AccessTime sx={{ color: '#ff4e00' }} />
              <Box>
                <Typography variant="body2" color="text.secondary">Data e Horário</Typography>
                <Typography variant="body1">
                  {new Date(event.date).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })} às {event.time}
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: event.organizer ? 0 : 2 }}>
              <LocationOn sx={{ color: '#ff4e00' }} />
              <Box>
                <Typography variant="body2" color="text.secondary">Local</Typography>
                <Typography variant="body1">{event.location}</Typography>
              </Box>
            </Box>
            {event.organizer && (
              <>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Person sx={{ color: '#ff4e00' }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">Organizador</Typography>
                    <Typography variant="body1">{event.organizer}</Typography>
                  </Box>
                </Box>
              </>
            )}
          </CardContent>
        </Card>

        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>Sobre o Evento</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>{event.description}</Typography>
          </CardContent>
        </Card>

        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Button fullWidth variant="outlined" startIcon={<Language />} sx={{ mb: 1, borderColor: '#ff4e00', color: '#ff4e00', '&:hover': { borderColor: '#cc3d00', bgcolor: 'rgba(255,78,0,0.04)' } }}>
              Visitar Site do Evento
            </Button>
            <Typography variant="caption" color="text.secondary" align="center" sx={{ display: 'block' }}>
              www.evento-exemplo.com.br
            </Typography>
          </CardContent>
        </Card>

        <Button
          fullWidth variant="contained" size="large"
          startIcon={isSaved ? <Bookmark /> : <BookmarkBorder />}
          onClick={() => setIsSaved(!isSaved)}
          sx={{ bgcolor: isSaved ? '#4caf50' : '#ff4e00', py: 1.5, '&:hover': { bgcolor: isSaved ? '#45a049' : '#cc3d00' } }}
        >
          {isSaved ? 'Evento Salvo' : 'Salvar Evento'}
        </Button>
      </Box>
    </Box>
  );
}

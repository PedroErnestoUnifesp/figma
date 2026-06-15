import { useParams, useNavigate } from 'react-router';
import { Box, Typography, Card, CardContent, IconButton, Chip, Divider, useTheme } from '@mui/material';
import { ArrowBack, AccessTime, LocationOn, Person } from '@mui/icons-material';
import { events, venues } from '../data/mockData';

const categoryColors: Record<string, string> = {
  music: '#9c27b0', theater: '#f44336', food: '#ff9800', art: '#2196f3', workshop: '#4caf50', other: '#607d8b',
};
const categoryLabels: Record<string, string> = {
  music: 'Música', theater: 'Teatro', food: 'Gastronomia', art: 'Arte', workshop: 'Oficina', other: 'Outros',
};

export function VenueDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  const venue = venues.find(v => v.id === id);
  const venueEvents = events.filter(e => e.venueId === id).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  if (!venue) return <Box sx={{ p: 3 }}><Typography>Local não encontrado</Typography></Box>;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: theme.palette.background.default }}>
      <Box sx={{ bgcolor: '#ff4e00', color: 'white', p: 2 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ color: 'white', mb: 1 }}><ArrowBack /></IconButton>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Box sx={{ width: 80, height: 80, bgcolor: 'rgba(255,255,255,0.2)', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }}>
            {venue.type === 'park' && '🌳'}
            {venue.type === 'cultural-center' && '🎭'}
            {venue.type === 'event-center' && '🎪'}
            {venue.type === 'theater' && '🎬'}
            {venue.type === 'gallery' && '🖼️'}
            {venue.type === 'other' && '📍'}
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" sx={{ mb: 0.5 }}>{venue.name}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, opacity: 0.9 }}>
              <LocationOn sx={{ fontSize: 16 }} />
              <Typography variant="body2">{venue.address}</Typography>
            </Box>
          </Box>
        </Box>
        <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>{venue.description}</Typography>
        <Chip label={`${venueEvents.length} eventos agendados`} sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }} />
      </Box>

      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Programação</Typography>
        {venueEvents.length === 0 ? (
          <Card><CardContent><Typography color="text.secondary" align="center">Nenhum evento agendado no momento</Typography></CardContent></Card>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {venueEvents.map((event) => (
              <Card key={event.id}>
                <Box sx={{ height: 8, bgcolor: categoryColors[event.category] }} />
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                    <Typography variant="h6" sx={{ flex: 1 }}>{event.title}</Typography>
                    <Chip label={categoryLabels[event.category]} size="small" sx={{ bgcolor: categoryColors[event.category], color: 'white' }} />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <AccessTime sx={{ fontSize: 18, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {new Date(event.date).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: event.organizer ? 2 : 0 }}>
                    <AccessTime sx={{ fontSize: 18, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">{event.time}</Typography>
                  </Box>
                  {event.organizer && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <Person sx={{ fontSize: 18, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">{event.organizer}</Typography>
                    </Box>
                  )}
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body2" color="text.secondary">{event.description}</Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}

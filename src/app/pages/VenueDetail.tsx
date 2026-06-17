import { useParams, useNavigate } from 'react-router';
import { Box, Typography, Card, CardContent, IconButton, Chip, useTheme } from '@mui/material';
import { ArrowBack, AccessTime, LocationOn, Person, Visibility } from '@mui/icons-material';
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
      <Box
        sx={{
          position: 'relative',
          height: 220,
          display: 'flex',
          alignItems: 'flex-end',
          color: 'white',
          p: 2,
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.14), rgba(0,0,0,0.88)), url(${venue.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <IconButton
          onClick={() => navigate(-1)}
          sx={{ color: 'white', position: 'absolute', top: 16, left: 16, bgcolor: 'rgba(0,0,0,0.3)', '&:hover': { bgcolor: 'rgba(0,0,0,0.45)' } }}
        >
          <ArrowBack />
        </IconButton>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
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
      </Box>

      <Box sx={{ p: 2 }}>
        <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>{venue.description}</Typography>
        <Chip label={`${venueEvents.length} eventos agendados`} sx={{ bgcolor: '#ff4e00', color: 'white', mb: 3 }} />

        <Typography variant="h6" sx={{ mb: 2 }}>Programação</Typography>
        {venueEvents.length === 0 ? (
          <Card><CardContent><Typography color="text.secondary" align="center">Nenhum evento agendado no momento</Typography></CardContent></Card>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {venueEvents.map((event) => (
              <Card key={event.id} sx={{ cursor: 'pointer', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.01)' } }}>
                <Box
                  sx={{
                    height: 140,
                    bgcolor: categoryColors[event.category],
                    position: 'relative',
                  }}
                >
                  <Chip
                    label={categoryLabels[event.category]}
                    size="small"
                    sx={{ position: 'absolute', top: 12, left: 12, bgcolor: 'rgba(255,255,255,0.3)', color: 'white', fontWeight: 500 }}
                  />
                </Box>
                <CardContent sx={{ pb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '1.05rem', lineHeight: 1.2, mb: 1.5 }}>
                    {event.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <AccessTime sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {new Date(event.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })} às {event.time}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary" noWrap>{event.location}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start', mt: 1.5, mb: 1.5 }}>
                    <Visibility sx={{ color: 'text.secondary', fontSize: 16, mt: 0.3, flexShrink: 0 }} />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        fontSize: '0.85rem',
                        lineHeight: 1.3,
                      }}
                    >
                      {event.description}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
                    <Visibility sx={{ fontSize: 14, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">{event.views} visualizações</Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}

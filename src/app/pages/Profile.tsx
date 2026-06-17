import { Box, Typography, Avatar, Card, CardContent, Chip, Button, useTheme, TextField } from '@mui/material';
import { Bookmark, MusicNote, TheaterComedy, Palette } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { useThemeMode } from '../context/ThemeContext';

export function Profile() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { userName, updateUserName } = useThemeMode();

  const [editName, setEditName] = useState(userName);

  useEffect(() => {
    setEditName(userName);
  }, [userName]);

  const preferences = [
    { icon: <MusicNote />, label: 'Música', color: '#9c27b0' },
    { icon: <TheaterComedy />, label: 'Teatro', color: '#f44336' },
    { icon: <Palette />, label: 'Arte', color: '#2196f3' },
  ];

  const initialLetter = userName.trim().charAt(0).toUpperCase() || 'U';

  const handleSaveName = () => {
    if (editName.trim()) {
      updateUserName(editName.trim());
    }
  };

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100%' }}>
      <Box sx={{ bgcolor: '#ff4e00', color: 'white', p: 3, pb: 5 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>Perfil</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: 'rgba(255,255,255,0.25)', fontSize: 40, border: '3px solid rgba(255,255,255,0.5)' }}>
            {initialLetter}
          </Avatar>
          <Typography variant="h6">{userName}</Typography>
        </Box>
      </Box>

      <Box sx={{ p: 2, mt: -3 }}>
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="subtitle1" sx={{ mb: 1.5 }}>Editar Nome</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                size="small"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Nome do Usuário"
              />
              <Button
                variant="contained"
                onClick={handleSaveName}
                sx={{ bgcolor: '#ff4e00', '&:hover': { bgcolor: '#cc3d00' } }}
              >
                Salvar
              </Button>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>Preferências</Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {preferences.map((pref) => (
                <Chip key={pref.label} icon={pref.icon} label={pref.label} sx={{ bgcolor: pref.color, color: 'white' }} />
              ))}
            </Box>
          </CardContent>
        </Card>

        <Button
          fullWidth variant="contained" startIcon={<Bookmark />}
          onClick={() => navigate('/saved')}
          sx={{ mb: 2, bgcolor: '#ff4e00', py: 1.5, '&:hover': { bgcolor: '#cc3d00' } }}
        >
          Ver Eventos Salvos
        </Button>
      </Box>
    </Box>
  );
}

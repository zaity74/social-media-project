import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUser } from '../../context/UserContext'; // ✅ Import du contexte
import { updateUser } from '../../redux/action/userActions';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  Box, TextField, InputAdornment, CircularProgress, Alert
} from '@mui/material';

const ProfileEditPopup = ({ open, onClose, initialData = {} }) => {
  const dispatch = useDispatch();
  const { user } = useUser(); // Récupération des données utilisateur via le contexte
  const { loading, error, successMessage } = useSelector(state => state.updateUser);

  // Initialisation des champs du formulaire
  const [formData, setFormData] = useState({
    username: initialData.username || user?.username || '',
    email: initialData.email || user?.email || '',
    bio: initialData.bio || user?.bio || '',
    avatar: initialData.avatar || user?.avatar || '',
    password: '' 
  });

  useEffect(() => {
    setFormData({
      username: initialData.username || user?.username || '',
      email: initialData.email || user?.email || '',
      bio: initialData.bio || user?.bio || '',
      avatar: initialData.avatar || user?.avatar || '',
      password: ''
    });
  }, [initialData, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (!user?.id) {
      console.error("❌ Erreur : ID utilisateur introuvable !");
      return;
    }

    if (!formData.username || !formData.email) return;

    // Si `password` est vide, on ne l'envoie pas dans l'action Redux
    const updatedData = { ...formData };
    if (!updatedData.password) delete updatedData.password;

    dispatch(updateUser(user && user.id, updatedData)); // **🚀 Envoie l'ID via `useUser()`**
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: '20px', textAlign: 'center' }}>
        Modifier le profil
      </DialogTitle>

      <DialogContent>
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}

        <Box component="form" sx={{ mt: 2 }}>
          {/* Nom d'utilisateur */}
          <TextField
            margin="normal"
            fullWidth
            label="Nom d'utilisateur"
            name="username"
            value={formData.username}
            onChange={handleChange}
            InputProps={{
              startAdornment: <InputAdornment position="start">@</InputAdornment>,
            }}
            sx={{ mb: 2 }}
          />

          {/* Email (Requis) */}
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          {/* Bio */}
          <TextField
            margin="normal"
            fullWidth
            label="Bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            multiline
            rows={3}
            sx={{ mb: 2 }}
          />

          {/* Avatar */}
          <TextField
            margin="normal"
            fullWidth
            label="Avatar (URL)"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          {/* Mot de passe (optionnel) */}
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Nouveau mot de passe (laisser vide si inchangé)"
            type="password"
            value={formData.password}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ padding: '16px 24px' }}>
        <Button onClick={onClose} disabled={loading}>
          Annuler
        </Button>
        <Button onClick={handleSubmit} variant="contained" sx={{ backgroundColor: '#B2FD27' }} disabled={loading}>
          {loading ? <CircularProgress size={20} /> : "Enregistrer"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileEditPopup;

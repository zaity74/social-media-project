import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
  Box, Container, TextField, Button, Typography, Paper, CircularProgress, Alert
} from "@mui/material";

// Actions import
import { userRegister } from "../../redux/action/authAction";

const Register = () => {
  const dispatch = useDispatch();
  
  // Récupérer les données stockés dans le reducer Register
  const { user, loading, error, isRegistered, successMessage } = useSelector((state) => state.userRegister);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  // Functions 
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrorMessage(""); // Efface le message d'erreur en tapant
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(userRegister(formData.username, formData.email, formData.password));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Créer un compte Y
          </Typography>

          {/* ✅ Affichage des messages de succès et d'erreur */}
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}

          <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Nom d'utilisateur"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Adresse email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading} // 
            >
              {loading ? <CircularProgress size={24} /> : "S'inscrire"}
            </Button>

            <Box sx={{ textAlign: "center" }}>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Typography color="primary">
                  Déjà un compte ? Se connecter
                </Typography>
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;

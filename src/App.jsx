import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import TopNav from './components/navigation/TopNav';
import LeftNav from './components/navigation/LeftNav';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import HomePage from './pages/HomePage';
import UserProfile from './pages/User/UserProfil';
import { DarkModeProvider } from './context/DarkModeContext';
import { useUser } from './context/UserContext';
import BackgroundLayout from './components/layout/BackgroundLayout';
import './App.css';

// ✅ Composant de protection des routes
const ProtectedRoute = ({ element }) => {
  const { isLogin } = useUser();
  return isLogin ? element : <Navigate to="/login" />;
};

import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider> {/* ✅ Ajout du Provider */}
      <DarkModeProvider>
        <Router>
          <BackgroundLayout />
          <TopNav />
          <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center" }}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<ProtectedRoute element={<HomePage />} />} />
              <Route path="/profil" element={<ProtectedRoute element={<UserProfile />} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Box>
        </Router>
      </DarkModeProvider>
    </UserProvider>
  );
}

export default App;




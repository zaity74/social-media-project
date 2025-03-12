import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import TopNav from './components/navigation/TopNav'
import LeftNav from './components/navigation/LeftNav'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import HomePage from './pages/HomePage'
import { DarkModeProvider } from './context/DarkModeContext'
import BackgroundLayout from './components/layout/BackgroundLayout'
import './App.css'

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <BackgroundLayout /> 
        <TopNav />
        <Box sx={{ width: "100%", height:"100%", display: "flex", justifyContent: "center" }}>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/*" />
            </Routes>
        </Box>
    </Router>
    </DarkModeProvider>
  );
}

export default App;


// function App() {
//   return (
//     <DarkModeProvider>
//       <Router>
//         <Box sx={{ 
//           display: 'flex', 
//           minHeight: '100vh',
//           // width: '100vw',
//           overflow: 'hidden'
//         }}>
//           <Routes>
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/" element={<HomePage />} />
//             <Route path="/*" element={
//               <Box sx={{ 
//                 display: 'flex', 
//                 flexDirection: 'column',
//                 width: '100%'
//               }}>
//                 <TopNav />
//                 <Box sx={{ 
//                   display: 'flex',
//                   flex: 1,
//                   width: '100%'
//                 }}>
//                   <LeftNav />
//                   <Box 
//                     component="main" 
//                     sx={{ 
//                       flexGrow: 1,
//                       p: 3,
//                       mt: 8,
//                       ml: { xs: 0, md: '240px' },
//                       width: '100%'
//                     }}
//                   >
//                     {/* Main content will go here */}
//                   </Box>
//                 </Box>
//               </Box>
//             } />
//           </Routes>
//         </Box>
//       </Router>
//     </DarkModeProvider>
//   )
// }

// export default App

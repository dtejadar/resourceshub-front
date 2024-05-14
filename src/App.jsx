import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AuthProvider from './context/AuthContext';
import ProtectedRoute from './components/routes/ProtectedRoute';
import Resources from './pages/Resources';
import Navbar from './components/Navbar';
import Unknown from './pages/Unknown';
import Profile from './pages/Profile';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route element={<ProtectedRoute />}>
                        {/* Renderiza el Navbar */}
                        {/* Redirige a /resources una vez autenticado */}
                        <Route index element={<Navigate to={'/resources'} />} />
                        <Route path='/resources' element={<Resources />} />
                        <Route path='/profile' element={<Profile />} />
                    </Route>
                    <Route path='*' element={<Unknown />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;

import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function ProtectedRoute({ redirectPath = '/login' }) {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();
    return !loading && !isAuthenticated ? <Navigate to={redirectPath} replace state={{ location }} /> : <Outlet />;
}

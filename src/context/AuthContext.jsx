import { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext(null);

//Provider to manage authentication in the entire app
export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const login = async (data) => {
        try {
            const response = await axios.post('http://localhost:3030/login', data);

            setUser(response.data.data.user);
            localStorage.setItem('token', response.data?.data?.refreshToken);
            setAccessToken(response.data?.data?.accessToken);
            setIsAuthenticated(true);
        } catch (error) {
            alert(error.response.data.error.description);
        } finally {
            setLoading(false);
        }
    };

    const renewTokens = async (refreshToken) => {
        try {
            const response = await axios.get('http://localhost:3030/auth/refresh', {
                headers: {
                    Authorization: `Bearer ${refreshToken}`,
                },
            });

            const tokenData = jwtDecode(response.data?.data?.accessToken);
            setUser(tokenData);
            setAccessToken(response.data?.data?.accessToken);
            setIsAuthenticated(true);
        } catch (error) {
            console.log('Error al procesar la solicitud');
            localStorage.removeItem('token');
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(null);
        setAccessToken(null);
    };

    const validateAccessToken = async () => {
        const response = await axios.get('http://localhost:3030/auth/validate', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (response.status !== 200) {
            const refreshToken = localStorage.getItem('token');

            if (!refreshToken) {
                return;
            }
            renewTokens(refreshToken);
        }
    };

    useEffect(() => {
        const refreshToken = localStorage.getItem('token');

        if (!refreshToken) {
            setLoading(false);
            return;
        }
        renewTokens(refreshToken);
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, accessToken, isAuthenticated, loading, validateAccessToken }}>
            {children}
        </AuthContext.Provider>
    );
}

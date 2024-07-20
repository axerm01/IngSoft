import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        token: localStorage.getItem('token'),
        isAuthenticated: !!localStorage.getItem('token')
    });

    const login = (token) => {
        localStorage.setItem('token', token);
        setAuth({ token, isAuthenticated: true });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuth({ token: null, isAuthenticated: false });
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

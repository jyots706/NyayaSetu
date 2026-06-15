import React, { createContext, useState, useEffect, useContext } from 'react';

export const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [preferredLanguage, setPreferredLanguage] = useState('English');

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
            setUser(null);
        }
    }, [token]);

    const login = (userData, jwtToken) => {
        setUser(userData);
        setToken(jwtToken);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
    };

    const setLanguage = (lang) => {
        setPreferredLanguage(lang);
    };

    return (
        <AppContext.Provider value={{ user, token, preferredLanguage, login, logout, setLanguage }}>
            {children}
        </AppContext.Provider>
    );
};

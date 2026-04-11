import React, { createContext, useContext, useMemo, useState } from 'react';

type AuthContextValue = {
    isAuthenticated: boolean;
    userName: string | null;
    login: (email: string, password: string) => void;
    register: (email: string, password: string, name: string) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState<string | null>(null);

    const login = (email: string, password: string) => {
        // simple auth mock
        if (email.trim() && password.trim()) {
            setIsAuthenticated(true);
            if (!userName) setUserName('Користувач');
        }
    };

    const register = (email: string, password: string, name: string) => {
        if (email.trim() && password.trim() && name.trim()) {
            setUserName(name.trim());
            setIsAuthenticated(true);
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    const value = useMemo(
        () => ({ isAuthenticated, userName, login, register, logout }),
        [isAuthenticated, userName]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
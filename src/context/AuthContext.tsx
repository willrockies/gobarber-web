import React, { createContext, useCallback, PropsWithChildren, ReactNode } from 'react';
import api from '../services/api';

interface SignInCredentials {
    email: string;
    password: string;
}
interface AuthContextData {
    name: string;
    signIn(credentials: SignInCredentials): Promise<void>;
}

//PropsWithChildren funciona, mas definir manualmente pode ser mais claro.
interface AuthProviderProps {
    children: ReactNode;
}

// Criando o contexto com um valor inicial válido
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const signIn = useCallback(
        async ({ email, password }:SignInCredentials) => {
        const response = await api.post('sessions', {
            email,
            password
        });
        console.log(response.data);
    }, []);

    return (
        <AuthContext.Provider value={{ name: 'wilson', signIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider }
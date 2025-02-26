import React, { createContext, useCallback, ReactNode, useState, useContext } from 'react';
import api from '../services/api';


interface AuthState {
    token: string;
    user: object;
}

interface SignInCredentials {
    email: string;
    password: string;
}
interface AuthContextData {
    user: object;
    signIn(credentials: SignInCredentials): Promise<void>;
}


//PropsWithChildren funciona, mas definir manualmente pode ser mais claro.
interface AuthProviderProps {
    children: ReactNode;
}


// Criando o contexto com um valor inicial válido
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem('@GoBarber: token');
        const user = localStorage.getItem('@GoBarber: user');

        if (token && user) {
            return { token, user: JSON.parse(user) }
        }

        return {} as AuthState;

    });
    const signIn = useCallback(
        async ({ email, password }: SignInCredentials) => {
            const response = await api.post('sessions', {
                email,
                password
            });

            const { token, user } = response.data;

            localStorage.setItem('@GoBarber: token', token);
            localStorage.setItem('@GoBarber: user', JSON.stringify(user));
            setData({ token, user });

        }, []);

    return (
        <AuthContext.Provider value={{ user: data.user, signIn }}>
            {children}
        </AuthContext.Provider>
    );
};

function useAuth(): AuthContextData{
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error('useAuth must be used within as AuthProvider');
    }

    return context;
}

export {  AuthProvider, useAuth }
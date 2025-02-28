import React, { createContext, useCallback, useContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import ToastContainer from "../components/ToastContainer";

export interface ToastMessage {
    id: string;
    type?: 'success' | 'error' | 'info';
    title: string;
    description?: string;
}


interface ToastProviderProps {
    children: React.ReactNode;
}

interface ToastContextData {
    addToast(message: Omit<ToastMessage, 'id'>): void;
    removeToast(id: string): void;
}
const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    const [message, setMessage] = useState<ToastMessage[]>([]);
    const addToast = useCallback(({ type, title, description }: Omit<ToastMessage, 'id'>) => {
        const id = uuidv4();
        const toast = {
            id,
            type,
            title,
            description
        };
        setMessage((state) => [...state, toast]);
    },
        [],
    );
    const removeToast = useCallback((id: string) => {
        setMessage((state) => state.filter((message) => message.id !== id));
    }, []);
    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <ToastContainer messages={message} />
        </ToastContext.Provider>
    )
}

function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}

export { ToastProvider, useToast };
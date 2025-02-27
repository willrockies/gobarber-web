import React, { createContext, useCallback, useContext } from "react";
import ToastContainer from "../components/ToastContainer";

interface ToastProviderProps {
    children: React.ReactNode;
}

interface ToastContextData {
    addToast(): void;
    removeToast(): void;
}
const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {

    const addToast = useCallback(() => {
        console.log('addToast');
    }, []);
    const removeToast = useCallback(() => {
        console.log('addToast');
    }, []);
    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <ToastContainer />
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
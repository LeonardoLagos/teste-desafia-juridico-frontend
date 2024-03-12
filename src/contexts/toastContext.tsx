import { ReactNode, createContext } from "react";
import { ToastContainer } from "react-toastify";

interface ToastProviderProps {
    children: ReactNode
}

export const ToastContext = createContext({})

export function ToastProvider({ children }: ToastProviderProps) {

    return (
        <ToastContext.Provider value={{}}>
            <ToastContainer />
            {children}
        </ToastContext.Provider >
    )
}
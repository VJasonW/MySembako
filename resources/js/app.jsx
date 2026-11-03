import './bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Page from './routes';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

const container = document.getElementById('app');

if (container) {
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <ToastProvider>
                    <AuthProvider>
                        <CartProvider>
                            <Page />
                        </CartProvider>
                    </AuthProvider>
                </ToastProvider>
            </BrowserRouter>
        </React.StrictMode>
    );
}

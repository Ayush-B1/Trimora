// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ToolProvider } from './context/ToolContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './components/theme-provider';
import './index.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
      <ToolProvider>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App />
          </ThemeProvider>
      </ToolProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

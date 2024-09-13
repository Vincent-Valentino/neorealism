import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import AuthProvider from './components/authprovider';  // Adjust the import path as needed
import "./index.css";

const container = document.getElementById('root');
const root = createRoot(container); // Use createRoot instead of ReactDOM.render

root.render(
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
);

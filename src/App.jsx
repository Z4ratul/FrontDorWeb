import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import MainPage from './pages/MainPage';

function App() {
    // Ваша логика аутентификации должна установить значение isAuthenticated
    const isAuthenticated = true;

    return (
            <Routes>
                <Route path="/auth" element={isAuthenticated ? <Navigate to="/main" /> : <AuthPage />} />
                <Route path="/main/*" element={isAuthenticated ? <MainPage /> : <Navigate to="/auth" />} />
                {/* Перенаправление по умолчанию на /auth, если не найден другой путь */}
            </Routes>
    );
}

export default App;

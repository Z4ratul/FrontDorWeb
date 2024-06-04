// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import MainPage from "./pages/MainPage";

function App() {
  const isAuthenticated = () => {
    const user = localStorage.getItem("user");
    return user !== null;
  };

  const PrivateRoute = ({ element }) => {
    return isAuthenticated() ? element : <Navigate to="/auth" />;
  };

  return (
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/main/*" element={<PrivateRoute element={<MainPage />} />} />
        <Route path="*" element={<Navigate to={isAuthenticated() ? "/main" : "/auth"} />} />
      </Routes>
  );
}

export default App;

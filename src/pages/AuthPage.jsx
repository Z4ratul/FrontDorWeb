// src/pages/AuthPage.jsx
import React, { useState } from "react";
import { BASE_URL } from "../main";

function AuthPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onLogin = (userData) => {
    console.log(userData)
    localStorage.setItem("user", JSON.stringify(userData));
    window.location.href = "/main";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/api/employee/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });

      const data = await response.json();
      if (response.ok) {
        onLogin(data);
      } else {
        setError(data.message || "Ошибка входа");
      }
    } catch (e) {
      setError("Сетевая ошибка");
    }
  };

  return (
    <div>
      <h2>Вход</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Логин:</label>
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Пароль:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}

export default AuthPage;

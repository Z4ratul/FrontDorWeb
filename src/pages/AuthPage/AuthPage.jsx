import React, { useState } from "react";

import "./AuthPage.css"; // Импортируем файл стилей
import { BASE_URL } from "../../main";

function AuthPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onLogin = (userData) => {
    console.log(userData);
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
    <div className="auth-container">
      <h2 className="title">Вход</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="label">Логин:</label>
          <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} required className="input" />
        </div>
        <div className="input-group">
          <label className="label">Пароль:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="input" />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="button">
          Войти
        </button>
      </form>
    </div>
  );
}

export default AuthPage;

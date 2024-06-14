import React, { useState } from "react";
import { Form, Input, Button, Typography, Alert } from "antd";
import { BASE_URL } from "../../main";
import "./AuthPage.css"; // Импортируем файл стилей

const { Title } = Typography;

function AuthPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onLogin = (userData) => {
    console.log(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    window.location.href = "/main/requests";
  };

  const handleSubmit = async () => {
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
      <Title level={2} className="title">Вход</Title>
      <Form layout="vertical" className="form" onFinish={handleSubmit}>
        <Form.Item label="Логин" required>
          <Input 
            type="text" 
            value={login} 
            onChange={(e) => setLogin(e.target.value)} 
            required 
            className="input" 
          />
        </Form.Item>
        <Form.Item label="Пароль" required>
          <Input.Password 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className="input" 
          />
        </Form.Item>
        {error && <Alert message={error} type="error" showIcon />}
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{width: "calc(100% - 20px)"}}>
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AuthPage;

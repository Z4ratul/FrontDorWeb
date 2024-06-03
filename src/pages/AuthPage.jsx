import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css'; // Импорт файла стилей, если он есть

function AuthPage() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Получаем функцию navigate из хука useNavigate

    const handleLogin = (event) => {
        event.preventDefault();
        // Здесь добавьте вашу логику аутентификации
        // Например, проверить введенные данные и убедиться, что пользователь успешно аутентифицирован

        // Если аутентификация успешна, переходите на страницу MainPage
        console.log(1)
        window.location.href = "/main"
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h3>Страница авторизации</h3>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="login" className="form-label">Логин</label>
                        <input
                            type="text"
                            className="form-control"
                            id="login"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Пароль</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Вход</button>
                </form>
            </div>
        </div>
    );
}

export default AuthPage;

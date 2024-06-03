import React from 'react';

function ClientCard({ partner, position, surname, name, patronymic, telephone }) {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">Партнер: {partner}</h5>
                <p className="card-text">Должность: {position}</p>
                <p className="card-text">Фамилия: {surname}</p>
                <p className="card-text">Имя: {name}</p>
                <p className="card-text">Отчество: {patronymic}</p>
                <p className="card-text">Телефон: {telephone}</p>
            </div>
        </div>
    );
}

export default ClientCard;

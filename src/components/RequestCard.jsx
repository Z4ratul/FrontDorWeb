import React from 'react';

function RequestCard({ requestNumber, client, submissionDate, closeDate, service, description, partner }) {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="request-number">Заявка №{requestNumber}</h5> {/* Большой текст для номера заявки */}
                <p className="card-title">Клиент: {client}</p>
                <p className="card-text">Дата подачи: {new Date(submissionDate).toLocaleDateString()}</p>
                <p className="card-text">Дата закрытия: {new Date(closeDate).toLocaleDateString()}</p>
                <p className="card-text">Услуга: {service}</p>
                <p className="card-text">Партнер: {partner}</p>
                <p className="card-text">Описание: {description}</p>
            </div>
        </div>
    );
}

export default RequestCard;

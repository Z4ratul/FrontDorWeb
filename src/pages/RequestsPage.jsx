import React from 'react';
import RequestCard from '../components/RequestCard';
import "./RequestPage.css" 

function RequestsPage() {
    const requests = [
        {
            requestNumber: 1, // Номер заявки
            client: 'Иван Иванов',
            submissionDate: '2024-04-01',
            closeDate: '2024-04-05',
            service: 'Консультация',
            partner: 'Партнер А',
            description: 'Консультация по юридическим вопросам.',
        },
        {
            requestNumber: 2, // Номер заявки
            client: 'Анна Петрова',
            submissionDate: '2024-04-02',
            closeDate: '2024-04-06',
            service: 'Аудит',
            partner: 'Партнер Б',
            description: 'Проведение аудита финансовой деятельности.',
        },
        {
            requestNumber: 3, // Номер заявки
            client: 'Анна Петрова',
            submissionDate: '2024-04-02',
            closeDate: '2024-04-06',
            service: 'Аудит',
            partner: 'Партнер Б',
            description: 'Проведение аудита финансовой деятельности.',
        },
        {
            requestNumber: 4, // Номер заявки
            client: 'Анна Петрова',
            submissionDate: '2024-04-02',
            closeDate: '2024-04-06',
            service: 'Аудит',
            partner: 'Партнер Б',
            description: 'Проведение аудита финансовой деятельности.',
        },
        // Добавьте больше заявок по мере необходимости
    ];

    return (
        <div className="container">
            <h3>Страница Заявки</h3>
            <div className="requests-list">
                {requests.map((request, index) => (
                    <RequestCard
                        key={index}
                        requestNumber={request.requestNumber} // Передача номера заявки в RequestCard
                        client={request.client}
                        submissionDate={request.submissionDate}
                        closeDate={request.closeDate}
                        service={request.service}
                        partner={request.partner}
                        description={request.description}
                    />
                ))}
            </div>
        </div>
    );
}

export default RequestsPage;

import React from 'react';
import ClientCard from '../components/ClientCard';
import "./ClientPage.css" 

function ClientsPage() {
    const clients = [
        {
            partner: 'Партнер А',
            position: 'Менеджер',
            surname: 'Иванов',
            name: 'Иван',
            patronymic: 'Иванович',
            telephone: '+7 (123) 456-78-90',
        },
        {
            partner: 'Партнер Б',
            position: 'Директор',
            surname: 'Петров',
            name: 'Петр',
            patronymic: 'Петрович',
            telephone: '+7 (987) 654-32-10',
        },
        {
            partner: 'Партнер В',
            position: 'Инженер',
            surname: 'Сидоров',
            name: 'Сидор',
            patronymic: 'Сидорович',
            telephone: '+7 (111) 222-33-44',
        },
        {
            partner: 'Партнер Г',
            position: 'Маркетолог',
            surname: 'Кузнецов',
            name: 'Кузьма',
            patronymic: 'Кузьмич',
            telephone: '+7 (333) 444-55-66',
        },
        {
            partner: 'Партнер Д',
            position: 'Юрист',
            surname: 'Александров',
            name: 'Алексей',
            patronymic: 'Александрович',
            telephone: '+7 (777) 888-99-00',
        },
        {
            partner: 'Партнер Е',
            position: 'Бухгалтер',
            surname: 'Смирнова',
            name: 'Светлана',
            patronymic: 'Сергеевна',
            telephone: '+7 (999) 000-11-22',
        },
        {
            partner: 'Партнер Ж',
            position: 'Программист',
            surname: 'Михайлов',
            name: 'Михаил',
            patronymic: 'Михайлович',
            telephone: '+7 (888) 777-66-55',
        },
    ];

    return (
        <div className="container">
            <h3>Страница Клиенты</h3>
            <div className="clients-list">
                {clients.map((client, index) => (
                    <ClientCard
                        key={index}
                        partner={client.partner}
                        fullName={client.fullName}
                        position={client.position}
                        surname={client.surname}
                        name={client.name}
                        patronymic={client.patronymic}
                        telephone={client.telephone}
                    />
                ))}
            </div>
        </div>
    );
}

export default ClientsPage;

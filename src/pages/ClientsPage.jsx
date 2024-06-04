import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import ClientCard from "../components/ClientCard";
import "./ClientPage.css";
import { BASE_URL } from "../main";

const fetchClients = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/client`); // Adjust the endpoint as per your server setup
  return data;
};

function ClientsPage() {
  const { data: clients, error, isLoading } = useQuery("clients", fetchClients);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching clients</div>;

  return (
    <div className="container">
      <h3>Страница Клиенты</h3>
      <div className="clients-list">
        {clients.map((client, index) => (
          <ClientCard
            key={index}
            partner={client.Partner ? client.Partner.shortName : "No Partner"}
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

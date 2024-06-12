import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import ClientCard from "../../components/ClientCard";

import { BASE_URL } from "../../main";

const fetchClients = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/client`); // Adjust the endpoint as per your server setup
  return data;
};

function ClientsPage() {
  const { data: clients, error, isLoading } = useQuery("clients", fetchClients);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching clients</div>;

  return (
    <div>
      <div className="clients-list">
        {clients.map((client, index) => (
          <ClientCard client={client} />
        ))}
      </div>
    </div>
  );
}

export default ClientsPage;

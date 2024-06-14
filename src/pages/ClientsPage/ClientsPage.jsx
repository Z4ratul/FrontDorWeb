import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import ClientCard from "../../components/ClientCard";

import { BASE_URL } from "../../main";
import { List, Spin } from "antd";

const fetchClients = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/client`); // Adjust the endpoint as per your server setup
  return data;
};

function ClientsPage() {
  const { data: clients, error, isLoading } = useQuery("clients", fetchClients);

  if (isLoading) return <Spin size="large" />;
  if (error) return <div>Error fetching clients</div>;

  return (
    <div>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={clients}
        renderItem={(client) => (
          <List.Item>
            <ClientCard client={client} />
          </List.Item>
        )}
      />
     
    </div>
  );
}

export default ClientsPage;

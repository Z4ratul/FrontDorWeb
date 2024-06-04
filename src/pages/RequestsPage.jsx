import React from "react";
import { useQuery } from "react-query";
import RequestCard from "../components/RequestCard";
import "./RequestPage.css";
import axios from "axios";
import { BASE_URL } from "../main";

const fetchRequests = async () => {
  const response = await axios.get(`${BASE_URL}/api/request/web`);
  console.log(response);
  return response.data;
};

function RequestsPage() {
  const { data: requests, error, isLoading } = useQuery("requests", fetchRequests);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container">
      <h3>Страница Заявки</h3>
      <div className="requests-list">
        {requests.map((request, index) => (
          <RequestCard
            key={index}
            machine={request.Machine}
            requestNumber={request.id} // Предположим, что 'id' является номером заявки
            client={request.client}
            submissionDate={request.openDate}
            closeDate={request.closeDate}
            service={request.ServiceList}
            partner={request.Partner}
            description={request.description}
          />
        ))}
      </div>
    </div>
  );
}

export default RequestsPage;

import React from "react";
import { useQuery } from "react-query";
import { Spin, Alert, List, Card } from "antd";
import axios from "axios";
import { BASE_URL } from "../../main";
import RequestCard from "../../components/RequestCard";

const fetchRequests = async () => {
  const response = await axios.get(`${BASE_URL}/api/request/partner/web`);
  console.log(response.data);
  return response.data;
};

function RequestsPage() {
  const { data: requests, error, isLoading } = useQuery("requests", fetchRequests);

  if (isLoading) return <Spin tip="Loading..." />;
  if (error) return <Alert message="Error" description={error.message} type="error" showIcon />;
  console.log(requests);
  return (
    <div>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={requests}
        renderItem={(request) => (
          <List.Item>
            <RequestCard request={request} />
          </List.Item>
        )}
      />
    </div>
  );
}

export default RequestsPage;

import React from "react";
import { useQuery } from "react-query";
import { Spin, Alert, List } from "antd";
import axios from "axios";
import { BASE_URL } from "../../main";
import RequestCard from "../../components/RequestCard";

const fetchRequests = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/request/partner/web`);
  return data;
};

function RequestsPage() {
  const { data: requests, error, isLoading } = useQuery("requests", fetchRequests);
  console.log(requests)
  if (isLoading) return <Spin tip="Loading..." />;
  if (error) return <Alert message="Error" description={error.message} type="error" showIcon />;

  // Sort the requests by openDate
  const sortedRequests = requests.slice().sort((a, b) => new Date(a.openDate) - new Date(b.openDate));

  console.log(sortedRequests);

  return (
    <div>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={sortedRequests}
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

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
  
  if (isLoading) return <Spin tip="Loading..." />;
  if (error) return <Alert message="Error" description={error.message} type="error" showIcon />;

  // Sort the requests: first by existence of closeDate, then by openDate
  const sortedRequests = requests.sort((a, b) => {
    if (a.closeDate && !b.closeDate) return 1;
    if (!a.closeDate && b.closeDate) return -1;
    return new Date(b.openDate) - new Date(a.openDate);
  });

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

import React from "react";
import MachineCard from "../../components/MachineCard";
import { useQuery } from "react-query";
import axios from "axios";
import { Spin, Alert, List } from "antd";
import { BASE_URL } from "../../main";

const fetchMachines = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/machine/web`);
  console.log(data);
  return data;
};

const MachinesPage = () => {
  const { data: machines, error, isLoading } = useQuery("machines", fetchMachines);

  if (isLoading) return <Spin tip="Loading..." />;
  if (error) return <Alert message="Error" description={error.message} type="error" showIcon />;
  console.log(machines);
  return (
    <div>
      <List
        grid={{ gutter: 32, column: 3 }}
        dataSource={machines}
        renderItem={(machine) => (
          <List.Item>
            <MachineCard machine={machine} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default MachinesPage;

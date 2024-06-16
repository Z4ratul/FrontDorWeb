import React, { useEffect, useState } from "react";
import MachineCard from "../../components/MachineCard";
import { useQuery } from "react-query";
import axios from "axios";
import { Spin, Alert, List } from "antd";
import { BASE_URL } from "../../main";

const fetchMachines = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/machine/web`);
  return data;
};

const MachinesPage = () => {
  const { data: machines, error, isLoading } = useQuery("machines", fetchMachines);
  const [columns, setColumns] = useState(4); // Default number of columns

  useEffect(() => {
    // Function to update number of columns based on screen width
    const updateColumns = () => {
      if (window.innerWidth >= 1200) {
        setColumns(4);
      } else if (window.innerWidth >= 992) {
        setColumns(3);
      } else if (window.innerWidth >= 768) {
        setColumns(2);
      } else {
        setColumns(1);
      }
    };

    // Initial setup
    updateColumns();

    // Event listener for window resize
    window.addEventListener("resize", updateColumns);

    // Cleanup function
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  if (isLoading) return <Spin tip="Loading..." />;
  if (error) return <Alert message="Error" description={error.message} type="error" showIcon />;

  return (
    <div>
      <List
        grid={{ gutter: 32, column: columns }}
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

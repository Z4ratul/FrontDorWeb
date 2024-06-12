import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { BASE_URL } from "../../main";
import WorkCard from "../../components/WorkCard";
import { List } from "antd";

const fetchWorks = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/work/web`);
  return data.sort((a, b) => a.id - b.id);
};

const fetchEmployees = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/employee`);
  return data;
};

const fetchStatuses = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/status`);
  return data;
};

const fetchServices = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/fullservicelist`);
  console.log(data)
  return data;
};

const WorksPage = () => {
  const { data: works, error: worksError, isLoading: worksLoading } = useQuery("works", fetchWorks);
  const { data: employees, error: employeesError, isLoading: employeesLoading } = useQuery("employees", fetchEmployees);
  const { data: statuses, error: statusesError, isLoading: statusesLoading } = useQuery("statuses", fetchStatuses);
  const { data: services, error: servicesError, isLoading: servicesLoading } = useQuery("services", fetchServices);
  if (worksLoading || employeesLoading || statusesLoading) return <div>Loading...</div>;
  if (worksError || employeesError || statusesError) return <div>Error loading data</div>;

  return (
    <div>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={works}
        renderItem={(work) => (
          <List.Item>
            <WorkCard work={work} employees={employees} statuses={statuses} services={services}/>
          </List.Item>
        )}
      />
    </div>
  );
};

export default WorksPage;

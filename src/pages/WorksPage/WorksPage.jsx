import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { BASE_URL } from "../../main";
import WorkCard from "../../components/WorkCard";
import { List, Spin } from "antd";

const fetchWorks = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/work/web`);
  
  // Разделяем работы на две группы: "В работе" и остальные
  const inProgressWorks = data.filter(work => work.Status.name === "В работе");
  const otherWorks = data.filter(work => work.Status.name !== "В работе");

  // Сортируем каждую группу отдельно по id
  inProgressWorks.sort((a, b) => a.id - b.id);
  otherWorks.sort((a, b) => a.id - b.id);

  // Объединяем группы, чтобы сначала шли работы "В работе"
  return [...inProgressWorks, ...otherWorks];
};

const fetchEmployees = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/employee`);
  return data;
};

const fetchStatuses = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/status`);
  console.log(data);
  return data;
};

const fetchServices = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/fullservicelist`);
  console.log(data);
  return data;
};

const fetchDetails = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/detail`);
  console.log(data);
  return data;
};

const WorksPage = () => {
  const { data: works, error: worksError, isLoading: worksLoading } = useQuery("works", fetchWorks);
  const { data: employees, error: employeesError, isLoading: employeesLoading } = useQuery("employees", fetchEmployees);
  const { data: statuses, error: statusesError, isLoading: statusesLoading } = useQuery("statuses", fetchStatuses);
  const { data: services, error: servicesError, isLoading: servicesLoading } = useQuery("services", fetchServices);
  const { data: details, error: detailsError, isLoading: detailsLoading } = useQuery("details", fetchDetails);

  if (worksLoading || employeesLoading || statusesLoading || servicesLoading || detailsLoading) return <Spin size="large" />;
  if (worksError || employeesError || statusesError || servicesError || detailsError) return <div>Error loading data</div>;

  console.log(works);

  return (
    <div>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={works}
        renderItem={(work) => (
          <List.Item>
            <WorkCard work={work} employees={employees} statuses={statuses} services={services} details={details} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default WorksPage;

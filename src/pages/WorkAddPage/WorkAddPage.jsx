import React, { useState } from "react";
import { Form, Select, Button, message, Tag } from "antd";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import { BASE_URL } from "../../main";

const { Option } = Select;

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
  return data;
};

const fetchDetails = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/detail`);
  return data;
};

const fetchRequests = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/request/partner/web`);
  console.log(data);
  return data;
};

const WorkAddPage = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const { data: employees, error: employeesError, isLoading: employeesLoading } = useQuery("employees", fetchEmployees);
  const { data: statuses, error: statusesError, isLoading: statusesLoading } = useQuery("statuses", fetchStatuses);
  const { data: services, error: servicesError, isLoading: servicesLoading } = useQuery("services", fetchServices);
  const { data: details, error: detailsError, isLoading: detailsLoading } = useQuery("details", fetchDetails);
  const { data: requests, error: requestsError, isLoading: requestsLoading } = useQuery("requests", fetchRequests);

  const [employee, setEmployee] = useState(null);
  const [service, setService] = useState(null);
  const [detail, setDetail] = useState(null);
  const [request, setRequest] = useState(null);
  console.log(employees);
  const handleSubmit = async (values) => {
    try {
      // Найти ID статуса "В работе"
      const inProgressStatus = statuses.find((status) => status.name === "В работе");
      const statusId = inProgressStatus ? inProgressStatus.id : null;

      if (!statusId) {
        throw new Error("Статус 'В работе' не найден");
      }

      await axios.post(`${BASE_URL}/api/work`, {
        StatusId: statusId,
        EmployeeId: values.employee,
        FullServiceListId: values.service,
        DetailVendorCode: values.detail,
        RequestId: values.request,
      });
      await queryClient.invalidateQueries("works");
      message.success("Работа успешно создана");
      form.resetFields();
    } catch (error) {
      console.error("Error creating work:", error);
      message.error("Ошибка при создании работы");
    }
  };

  if (employeesLoading || statusesLoading || servicesLoading || detailsLoading || requestsLoading) {
    return <div>Loading...</div>;
  }

  if (employeesError || statusesError || servicesError || detailsError || requestsError) {
    return <div>Error loading data</div>;
  }

  return (
    <div>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="request" label="Заявка" rules={[{ required: true, message: "Пожалуйста, выберите заявку" }]}>
          <Select placeholder="Выберите заявку" allowClear>
            {requests
              .filter((req) => !req.closeDate)
              .sort((a, b) => a.id - b.id)
              .map((req) => (
                <Option key={req.id} value={req.id}>
                  Заявка №{req.id} "{req.ServiceList.name}"
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item name="service" label="Услуга" rules={[{ required: true, message: "Пожалуйста, выберите услугу" }]}>
          <Select placeholder="Выберите услугу" allowClear>
            {services.map((serv) => (
              <Option key={serv.id} value={serv.id}>
                {serv.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="employee" label="Сотрудник" rules={[{ required: true, message: "Пожалуйста, выберите сотрудника" }]}>
          <Select placeholder="Выберите сотрудника" allowClear>
            {employees
              .filter((emp) => emp.PositionId != 1)
              .map((emp) => (
                <Option key={emp.id} value={emp.id}>
                  {emp.name} {emp.surname} <Tag color="#F4C55C" style={{color: "black"}}>Должность: {emp?.Position?.name}</Tag> 
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item name="detail" label="Деталь">
          <Select placeholder="Выберите деталь" allowClear>
            <Option value={null}>Нет детали</Option>
            {details.map((det) => (
              <Option key={det.vendorCode} value={det.vendorCode}>
                {det.detailName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Создать работу
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default WorkAddPage;

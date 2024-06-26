import { Card, Modal, Select, Button, Tag } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../main";
import { useQueryClient } from "react-query";

const { Option } = Select;

const WorkCard = ({ work, employees, statuses, services, details }) => {
  const queryClient = useQueryClient();
  const fullServicePrice = work?.FullServiceList?.price ?? 0;
  const detailPrice = work?.Detail?.price ?? 0;
  const totalPrice = parseFloat(fullServicePrice) + parseFloat(detailPrice);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [status, setStatus] = useState(work.StatusId);
  const [employee, setEmployee] = useState(work.EmployeeId);
  const [service, setService] = useState(work.FullServiceListId);
  const [detail, setDetail] = useState(work.DetailVendorCode ?? null);

  useEffect(() => {
    if (isModalVisible) {
      setStatus(work.StatusId);
      setEmployee(work.EmployeeId);
      setService(work.FullServiceListId);
      setDetail(work.DetailVendorCode ?? null);
    }
  }, [isModalVisible, work]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const response = await axios.put(`${BASE_URL}/api/work/${work.id}`, {
        StatusId: status,
        EmployeeId: employee,
        FullServiceListId: service,
        DetailVendorCode: detail,
      });
      await queryClient.invalidateQueries("works");
      console.log("Updated work:", response.data);
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error updating work:", error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Card title={`Работа над заявкой №${work.Request.id}`} style={{ height: "320px" }} onClick={showModal}>
        <p>Услуга: {work.FullServiceList.name}</p>
        <p>
          Сотрудник: {work.Employee.name} {work.Employee.surname}
        </p>
        <p>Статус: {work.Status.name === "В работе" ? <Tag color="#F4C55C" style={{ color: "black" }}>В работе</Tag> : <Tag>Выполнено</Tag>}</p>
        <p>Описание клиента: {work.Request.description}</p>
        {work?.Detail?.detailName && <p>Деталь: {work?.Detail?.detailName}</p>}
        <p>
          Цена: {fullServicePrice} ₽ + {detailPrice} ₽ = {totalPrice} ₽
        </p>
      </Card>
      <Modal title="Редактирование работы" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>
          Услуга:
          <Select value={service} onChange={setService} style={{ width: 220, margin: "0px 0px 0px 10px" }}>
            {services.map((serv) => (
              <Option key={serv.id} value={serv.id}>
                {serv.name}
              </Option>
            ))}
          </Select>
        </p>
        <p>
          Сотрудник:
          <Select value={employee} onChange={setEmployee} style={{ width: 220, margin: "0px 0px 0px 10px" }}>
            {employees.map((emp) => (
              <Option key={emp.id} value={emp.id}>
                {emp.name} {emp.surname}
              </Option>
            ))}
          </Select>
        </p>
        <p>
          Статус:
          <Select value={status} onChange={setStatus} style={{ width: 220, margin: "0px 0px 0px 10px" }}>
            {statuses.map((status) => (
              <Option key={status.id} value={status.id}>
                {status.name}
              </Option>
            ))}
          </Select>
        </p>
        <p>Описание клиента: {work.Request.description}</p>
        <p>
          Деталь:
          <Select value={detail} onChange={setDetail} style={{ width: 220, margin: "0px 0px 0px 10px" }}>
            <Option value={null}>Нет детали</Option>
            {details.map((det) => (
              <Option key={det.vendorCode} value={det.vendorCode}>
                {det.detailName}
              </Option>
            ))}
          </Select>
        </p>
        <p>Цена: {totalPrice} руб.</p>
      </Modal>
    </>
  );
};

export default WorkCard;

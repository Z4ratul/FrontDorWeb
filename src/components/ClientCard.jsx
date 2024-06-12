import { Button } from "antd";
import axios from "axios";
import React from "react";
import { BASE_URL } from "../main";
import { useMutation, useQueryClient } from "react-query";

const ClientCard = ({ client }) => {
  const queryClient = useQueryClient();

  const handleDelete = async (clientId) => {
    await axios.delete(`${BASE_URL}/api/client/${clientId}`);
    await queryClient.invalidateQueries("clients");
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">Партнер: {client.Partner ? client.Partner.shortName : "No Partner"}</h5>
        <p className="card-text">Должность: {client.position}</p>
        <p className="card-text">Фамилия: {client.surname}</p>
        <p className="card-text">Имя: {client.name}</p>
        <p className="card-text">Отчество: {client.patronymic}</p>
        <p className="card-text">Телефон: {client.telephone}</p>
      </div>
      <Button onClick={() => handleDelete(client.id)}>Удалить</Button>
    </div>
  );
};

export default ClientCard;

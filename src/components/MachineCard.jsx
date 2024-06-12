import React from "react";
import { Button, Card } from "antd";
import { BASE_URL } from "../main";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

const MachineCard = ({ machine }) => {
  const queryClient = useQueryClient();

  const handleDelete = async (VINnum) => {
    await axios.delete(`${BASE_URL}/api/machine/${VINnum}`);
    await queryClient.invalidateQueries("machines");
  };
  const handleImageError = (e) => {
    e.target.src = "https://fashionhot.club/uploads/posts/2022-12/1670311516_61-fashionhot-club-p-termobele-skins-64.jpg"; // Замените на путь к вашему изображению-заглушке
  };

  return (
    <Card
      cover={
        <img
          alt={machine?.modelName}
          src={`${BASE_URL}/${machine?.image}`}
          onError={handleImageError}
          style={{ height: "300px", objectFit: "cover" }}
        />
      }>
      <Card.Meta title={machine?.modelName} />
      <p>VIN: {machine?.VINNumber}</p>
      <p>Серийный номер: {machine?.serialNumber}</p>
      <p>Дата производства: {new Date(machine?.dateOfManufacture).toLocaleDateString()}</p>
      <p>Производитель: {machine?.Manufacturer?.name}</p>
      <p>Тип машины: {machine?.MachineType?.name}</p>
      <p>Партнер: {machine?.Partner?.shortName}</p>
      <Button danger onClick={() => handleDelete(machine?.VINNumber)}>
        Удалить
      </Button>
    </Card>
  );
};

export default MachineCard;

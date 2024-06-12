import React, { useState } from "react";
import { Card, Modal, Button, Form, DatePicker, Input } from "antd";
import moment from "moment"; // добавим импорт moment

const { RangePicker } = DatePicker;

function RequestCard({ request }) {
  const [visible, setVisible] = useState(false);
  const [editedRequest, setEditedRequest] = useState(request);
  console.log(request);

  return (
    <>
      <Card title={`Заявка №${request.id}`} style={{ marginBottom: "16px", height: "400px" }}>
        <p>
          <strong>Машина:</strong> {request.Machine?.modelName}
        </p>
        <p>
          <strong>Клиент:</strong> {request.Partner?.shortName}
        </p>
        <p>
          <strong>Дата подачи:</strong> {request.openDate}
        </p>
        <p>
          <strong>Дата закрытия:</strong> {request.closeDate}
        </p>
        <p>
          <strong>Услуга:</strong> {request.ServiceList?.name}
        </p>
        <p>
          <strong>Партнер:</strong> {request.Partner?.shortName}
        </p>
        <p>
          <strong>Описание:</strong> {request.description}
        </p>
      </Card>
    </>
  );
}

export default RequestCard;

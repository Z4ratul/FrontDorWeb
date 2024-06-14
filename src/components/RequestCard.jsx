import React, { useState } from "react";
import { Card, Modal, Button, Form, DatePicker, Input, Tag, Flex } from "antd";
import moment from "moment"; // добавим импорт moment

const { RangePicker } = DatePicker;

function RequestCard({ request }) {
  const [visible, setVisible] = useState(false);
  const [editedRequest, setEditedRequest] = useState(request);
  console.log(request);

  return (
    <>
      <Card
        title={
          <Flex>
            Заявка №{request.id}
            {!request.closeDate ? (
              <Tag color="#F4C55C" style={{ marginLeft: "auto", color: "black" }}>
                Заявка открыта
              </Tag>
            ) : (
              <Tag style={{ marginLeft: "auto" }}>Заявка закрыта</Tag>
            )}
          </Flex>
        }
        style={{ marginBottom: "16px" }}>
        <p>
          <strong>Машина:</strong> {request.Machine?.modelName}
        </p>
        <p>
          <strong>Клиент:</strong> {request.Partner?.shortName}
        </p>
        <p>
          <strong>Дата подачи:</strong> {moment(request.openDate).format("DD.MM.YYYY")}
        </p>
        <p>
          <strong>Дата закрытия:</strong> {request.closeDate && moment(request.closeDate).format("DD.MM.YYYY")}
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

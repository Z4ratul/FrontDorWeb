import React from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { BASE_URL } from "../../main";

const { Item } = Form;

function PartnerAddPage() {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/partner`, {
        INN: values.inn,
        fullName: values.fullName,
        shortName: values.shortName,
      });
      console.log("Добавленный партнер:", response.data);
      message.success("Партнер успешно добавлен!");
      form.resetFields();
    } catch (error) {
      console.error("Ошибка при добавлении партнера:", error);
      message.error("Ошибка при добавлении партнера");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Ошибка валидации:", errorInfo);
  };

  return (
    <div>
      <Form layout="vertical"  form={form} name="partner_form" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
        <Item
          label="ИНН"
          name="inn"
          rules={[
            { required: true, message: "ИНН обязателен" },
            { pattern: /^\d{10}$|^\d{12}$/, message: "ИНН должен состоять из 10 или 12 цифр" },
          ]}>
          <Input />
        </Item>
        <Item
          label="Полное наименование компании партнера"
          name="fullName"
          rules={[
            { required: true, message: "Полное наименование обязательно" },
            { max: 100, message: "Полное наименование не должно превышать 100 символов" },
          ]}>
          <Input />
        </Item>
        <Item
          label="Краткое наименование компании партнера"
          name="shortName"
          rules={[
            { required: true, message: "Краткое наименование обязательно" },
            { max: 50, message: "Краткое наименование не должно превышать 50 символов" },
          ]}>
          <Input />
        </Item>
        <Item>
          <Button type="primary" htmlType="submit">
            Добавить партнера
          </Button>
        </Item>
      </Form>
    </div>
  );
}

export default PartnerAddPage;

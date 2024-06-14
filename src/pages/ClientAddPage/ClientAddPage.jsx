import React, { useState } from "react";
import { Form, Input, Button, Select, Spin, Alert } from "antd";
import * as Yup from "yup";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { BASE_URL } from "../../main";

const { Option } = Select;

// Функция для получения списка партнеров
const fetchPartners = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/partner`);
  return data;
};

// Функция для создания клиента
const createClient = async (clientData) => {
  console.log(clientData);
  const { data } = await axios.post(`${BASE_URL}/api/client`, clientData);
  return data;
};

const validationSchema = Yup.object().shape({
  position: Yup.string().required("Должность обязательна"),
  surname: Yup.string().required("Фамилия обязательна"),
  name: Yup.string().required("Имя обязательно"),
  patronymic: Yup.string().required("Отчество обязательно"),
  telephone: Yup.string()
    .required("Телефон обязателен")
    .matches(/^\+?[0-9\s-]{7,15}$/, "Неправильный формат телефона"),
  email: Yup.string().email("Неправильный формат электронной почты").required("Электронная почта обязательна"),
  login: Yup.string().required("Логин обязателен"),
  password: Yup.string().required("Пароль обязателен"),
  PartnerId: Yup.string().required("Партнер обязателен"),
});

function EmployeeAddPage() {
  const queryClient = useQueryClient();

  // Использование react-query для получения списка партнеров
  const { data: partners, error, isLoading } = useQuery("partners", fetchPartners);

  // Мутация для создания клиента
  const mutation = useMutation(createClient, {
    onSuccess: () => {
      queryClient.invalidateQueries("partners");
    },
  });

  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    console.log(values);
    setSubmitting(true);
    try {
      await validationSchema.validate(values, { abortEarly: false });
      mutation.mutate(values, {
        onSuccess: () => {
          console.log("Добавленный сотрудник:", values);
          form.resetFields();
        },
        onError: (error) => {
          console.error("Ошибка при добавлении сотрудника:", error);
        },
        onSettled: () => {
          setSubmitting(false);
        },
      });
    } catch (validationErrors) {
      const errors = validationErrors.inner.reduce((acc, error) => {
        acc[error.path] = {
          value: error.value,
          errors: [error.message],
        };
        return acc;
      }, {});
      form.setFields(errors);
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <Alert message="Ошибка при загрузке партнеров" type="error" />;
  }

  return (
    <div>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        initialValues={{
          position: "",
          surname: "",
          name: "",
          patronymic: "",
          telephone: "",
          email: "",
          login: "",
          password: "",
          PartnerId: "",
        }}>
        <Form.Item label="Должность" name="position" rules={[{ required: true, message: "Должность обязательна" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Фамилия" name="surname" rules={[{ required: true, message: "Фамилия обязательна" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Имя" name="name" rules={[{ required: true, message: "Имя обязательно" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Отчество" name="patronymic" rules={[{ required: true, message: "Отчество обязательно" }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Телефон"
          name="telephone"
          rules={[
            { required: true, message: "Телефон обязателен" },
            { pattern: /^\+?[0-9\s-]{7,15}$/, message: "Неправильный формат телефона" },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Электронная почта"
          name="email"
          rules={[
            { type: "email", message: "Неправильный формат электронной почты" },
            { required: true, message: "Электронная почта обязательна" },
          ]}>
          <Input />
        </Form.Item>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Form.Item label="Логин" name="login" rules={[{ required: true, message: "Логин обязателен" }]} style={{ flex: 1, marginRight: '10px' }}>
            <Input />
          </Form.Item>
          <Form.Item label="Пароль" name="password" rules={[{ required: true, message: "Пароль обязателен" }]} style={{ flex: 1 }}>
            <Input.Password />
          </Form.Item>
        </div>
        <Form.Item label="Партнер" name="PartnerId" rules={[{ required: true, message: "Партнер обязателен" }]}>
          <Select placeholder="Выберите партнера">
            {partners?.map((partner) => (
              <Option key={partner.id} value={partner.id}>
                {partner.shortName} {partner.fullName}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={submitting}>
            Добавить Доверенного лица
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default EmployeeAddPage;

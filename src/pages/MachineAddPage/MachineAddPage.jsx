import React, { useState } from "react";
import { Form, Input, Button, Select, DatePicker, Upload, Spin, Alert } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import * as Yup from "yup";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import moment from "moment";
import "./MachineAddPage.css";
import { BASE_URL } from "../../main";

const { Option } = Select;

// Функции для получения данных с бэкенда
const fetchManufacturers = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/manufacturer`);
  return data;
};

const fetchPartners = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/partner`);
  return data;
};

const fetchMachineTypes = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/machinetype`);
  return data;
};

// Функция для добавления машины
const createMachine = async (machineData) => {
  console.log(machineData);
  const { data } = await axios.post(`${BASE_URL}/api/machine`, machineData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

const validationSchema = Yup.object().shape({
  VINNumber: Yup.string()
    .required("Номер VIN обязателен")
    .matches(/^[A-HJ-NPR-Z0-9]{17}$/, "Номер VIN должен содержать 17 символов, исключая буквы I, O и Q"),
  modelName: Yup.string().required("Название модели обязательно"),
  serialNumber: Yup.string().required("Серийный номер обязателен"),
  dateOfManufacture: Yup.date().required("Дата изготовления обязательна"),
  ManufacturerId: Yup.string().required("Производитель обязателен"),
  MachineTypeId: Yup.string().required("Тип машины обязателен"),
  PartnerId: Yup.string().required("Партнер обязателен"),
  image: Yup.mixed().required("Изображение машины обязательно"),
});

const MachinesAddPage = () => {
  const queryClient = useQueryClient();

  const { data: manufacturers, isLoading: isLoadingManufacturers, error: errorManufacturers } = useQuery("manufacturers", fetchManufacturers);
  const { data: partners, isLoading: isLoadingPartners, error: errorPartners } = useQuery("partners", fetchPartners);
  const { data: machineTypes, isLoading: isLoadingMachineTypes, error: errorMachineTypes } = useQuery("machineTypes", fetchMachineTypes);

  const mutation = useMutation(createMachine, {
    onSuccess: () => {
      queryClient.invalidateQueries("machines");
    },
  });

  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    console.log(values);
    setSubmitting(true);
    try {
      const formattedValues = {
        ...values,
        dateOfManufacture: values.dateOfManufacture.format("YYYY-MM-DD"),
        image: values.image, // Directly use the image object
      };
      console.log(formattedValues);

      await validationSchema.validate(formattedValues, { abortEarly: false });
      const formData = new FormData();

      // Append each property to formData
      for (const key in formattedValues) {
        if (key === "image") {
          formData.append(key, formattedValues[key]); // Append file directly
        } else {
          formData.append(key, formattedValues[key]);
        }
        console.log(key, formattedValues[key]);
      }

      console.log(formData);
      mutation.mutate(formData, {
        onSuccess: () => {
          console.log("Добавленная машина:", values);
          form.resetFields();
        },
        onError: (error) => {
          console.error("Ошибка при добавлении машины:", error);
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

  if (isLoadingManufacturers || isLoadingPartners || isLoadingMachineTypes) {
    return <Spin size="large" />;
  }

  if (errorManufacturers || errorPartners || errorMachineTypes) {
    return <Alert message="Ошибка при загрузке данных" type="error" />;
  }

  return (
    <div>
      <Form
        form={form}
        onFinish={handleSubmit}
        initialValues={{
          VINNumber: "",
          modelName: "",
          serialNumber: "",
          dateOfManufacture: null,
          ManufacturerId: "",
          MachineTypeId: "",
          PartnerId: "",
          image: null,
        }}>
        <Form.Item
          label="Номер VIN"
          name="VINNumber"
          rules={[
            { required: true, message: "Номер VIN обязателен" },
            { pattern: /^[A-HJ-NPR-Z0-9]{17}$/, message: "Номер VIN должен содержать 17 символов, исключая буквы I, O и Q" },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item label="Название модели" name="modelName" rules={[{ required: true, message: "Название модели обязательно" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Серийный номер" name="serialNumber" rules={[{ required: true, message: "Серийный номер обязателен" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Дата изготовления" name="dateOfManufacture" rules={[{ required: true, message: "Дата изготовления обязательна" }]}>
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item label="Производитель" name="ManufacturerId" rules={[{ required: true, message: "Производитель обязателен" }]}>
          <Select placeholder="Выберите производителя">
            {manufacturers?.map((manufacturer) => (
              <Option key={manufacturer?.id} value={manufacturer?.id}>
                {manufacturer?.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Тип машины" name="MachineTypeId" rules={[{ required: true, message: "Тип машины обязателен" }]}>
          <Select placeholder="Выберите тип машины">
            {machineTypes.map((type) => (
              <Option key={type.id} value={type.id}>
                {type.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Партнер" name="PartnerId" rules={[{ required: true, message: "Партнер обязателен" }]}>
          <Select placeholder="Выберите клиента">
            {partners.map((partner) => (
              <Option key={partner.id} value={partner.id}>
                {partner.shortName}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Изображение машины" name="image" valuePropName="file">
          <Upload listType="picture" beforeUpload={() => false} onChange={({ file }) => form.setFieldsValue({ image: file })}>
            <Button icon={<UploadOutlined />}>Загрузить изображение</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={submitting}>
            {submitting ? "Добавление..." : "Добавить машину"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default MachinesAddPage;

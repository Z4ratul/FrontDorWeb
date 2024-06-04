import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import "./MachineAddPage.css";
import { BASE_URL } from "../main";

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

const MachinesAddPage = () => {
  const queryClient = useQueryClient();

  // Использование react-query для получения данных
  const { data: manufacturers, isLoading: isLoadingManufacturers, error: errorManufacturers } = useQuery("manufacturers", fetchManufacturers);
  const { data: partners, isLoading: isLoadingPartners, error: errorPartners } = useQuery("partners", fetchPartners);
  const { data: machineTypes, isLoading: isLoadingMachineTypes, error: errorMachineTypes } = useQuery("machineTypes", fetchMachineTypes);

  // Мутация для добавления машины
  const mutation = useMutation(createMachine, {
    onSuccess: () => {
      queryClient.invalidateQueries("machines");
    },
  });

  // Начальные значения формы
  const initialValues = {
    VINNumber: "",
    modelName: "",
    serialNumber: "",
    dateOfManufacture: "",
    manufacturerId: "",
    machineTypeId: "",
    partnerId: "",
    image: null,
  };

  // Схема валидации с помощью Yup
  const validationSchema = Yup.object({
    VINNumber: Yup.string()
      .required("Номер VIN обязателен")
      .matches(/^[A-HJ-NPR-Z0-9]{17}$/, "Номер VIN должен содержать 17 символов, исключая буквы I, O и Q"),
    modelName: Yup.string().required("Название модели обязательно"),
    serialNumber: Yup.string().required("Серийный номер обязателен"),
    dateOfManufacture: Yup.date().required("Дата изготовления обязательна"),
    manufacturerId: Yup.string().required("Производитель обязателен"),
    machineTypeId: Yup.string().required("Тип машины обязателен"),
    partnerId: Yup.string().required("Партнер обязателен"),
    image: Yup.mixed().required("Изображение машины обязательно"),
  });

  // Обработчик отправки формы
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log(1);
    console.log(values);
    mutation.mutate(values, {
      onSuccess: () => {
        console.log("Добавленная машина:", values);
        resetForm();
      },
      onError: (error) => {
        console.error("Ошибка при добавлении машины:", error);
      },
      onSettled: () => {
        setSubmitting(false);
      },
    });
  };

  if (isLoadingManufacturers || isLoadingPartners || isLoadingMachineTypes) {
    return <div>Загрузка...</div>;
  }

  if (errorManufacturers || errorPartners || errorMachineTypes) {
    return <div>Ошибка при загрузке данных</div>;
  }

  return (
    <div className="container">
      <h3>Страница Доб. Машин</h3>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ setFieldValue, isSubmitting }) => (
          <Form className="form-container">
            {/* Первый столбец */}
            <div>
              {/* Поля для ввода информации о машине */}
              <div className="mb-3">
                <label htmlFor="VINNumber" className="form-label">
                  Номер VIN
                </label>
                <Field type="text" id="VINNumber" name="VINNumber" className="form-control" />
                <ErrorMessage name="VINNumber" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label htmlFor="modelName" className="form-label">
                  Название модели
                </label>
                <Field type="text" id="modelName" name="modelName" className="form-control" />
                <ErrorMessage name="modelName" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label htmlFor="serialNumber" className="form-label">
                  Серийный номер
                </label>
                <Field type="text" id="serialNumber" name="serialNumber" className="form-control" />
                <ErrorMessage name="serialNumber" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label htmlFor="dateOfManufacture" className="form-label">
                  Дата изготовления
                </label>
                <Field type="date" id="dateOfManufacture" name="dateOfManufacture" className="form-control" />
                <ErrorMessage name="dateOfManufacture" component="div" className="text-danger" />
              </div>
            </div>
            {/* Второй столбец */}
            <div>
              {/* Поля для выбора производителя, типа машины, клиента и загрузки изображения */}
              <div className="mb-3">
                <label htmlFor="manufacturerId" className="form-label">
                  Производитель
                </label>
                <Field as="select" id="manufacturerId" name="manufacturerId" className="form-control">
                  <option value="">Выберите производителя</option>
                  {manufacturers?.map((manufacturer) => (
                    <option key={manufacturer?.id} value={manufacturer?.id}>
                      {manufacturer?.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="manufacturerId" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label htmlFor="machineTypeId" className="form-label">
                  Тип машины
                </label>
                <Field as="select" id="machineTypeId" name="machineTypeId" className="form-control">
                  <option value="">Выберите тип машины</option>
                  {machineTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="machineTypeId" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label htmlFor="partnerId" className="form-label">
                  Партнер
                </label>
                <Field as="select" id="partnerId" name="partnerId" className="form-control">
                  <option value="">Выберите клиента</option>
                  {partners.map((partner) => (
                    <option key={partner.id} value={partner.id}>
                      {partner.shortName}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="partnerId" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  Изображение машины
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  className="form-control"
                  onChange={(event) => setFieldValue("image", event.currentTarget.files[0])}
                />
                <ErrorMessage name="image" component="div" className="text-danger" />
              </div>
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? "Добавление..." : "Добавить машину"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MachinesAddPage;

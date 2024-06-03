import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "./MachineAddPage.css"

function MachinesAddPage() {
    // Начальные значения формы
    const initialValues = {
        vin: '',
        modelName: '',
        serialNumber: '',
        manufactureDate: '',
        manufacturer: '',
        machineType: '',
        client: '',
        image: null, // Добавляем поле для изображения
    };

    // Схема валидации с помощью Yup
    const validationSchema = Yup.object({
        vin: Yup.string()
            .required('Номер VIN обязателен')
            .matches(/^[A-HJ-NPR-Z0-9]{17}$/, 'Номер VIN должен содержать 17 символов, исключая буквы I, O и Q'),
        modelName: Yup.string().required('Название модели обязательно'),
        serialNumber: Yup.string().required('Серийный номер обязателен'),
        manufactureDate: Yup.date().required('Дата изготовления обязательна'),
        manufacturer: Yup.string().required('Производитель обязателен'),
        machineType: Yup.string().required('Тип машины обязателен'),
        client: Yup.string().required('Клиент обязателен'),
        image: Yup.mixed().required('Изображение машины обязательно'),
    });

    // Обработчик отправки формы
    const handleSubmit = (values) => {
        // Здесь вы можете добавить логику для обработки отправленных данных
        console.log('Добавленная машина:', values);
    };

    return (
        <div className="container">
            <h3>Страница Доб. Машин</h3>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue }) => (
                    <Form className="form-container">
                        {/* Первый столбец */}
                        <div>
                            {/* Поля для ввода информации о машине */}
                            <div className="mb-3">
                                <label htmlFor="vin" className="form-label">Номер VIN</label>
                                <Field type="text" id="vin" name="vin" className="form-control" />
                                <ErrorMessage name="vin" component="div" className="text-danger" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="modelName" className="form-label">Название модели</label>
                                <Field type="text" id="modelName" name="modelName" className="form-control" />
                                <ErrorMessage name="modelName" component="div" className="text-danger" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="serialNumber" className="form-label">Серийный номер</label>
                                <Field type="text" id="serialNumber" name="serialNumber" className="form-control" />
                                <ErrorMessage name="serialNumber" component="div" className="text-danger" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="manufactureDate" className="form-label">Дата изготовления</label>
                                <Field type="date" id="manufactureDate" name="manufactureDate" className="form-control" />
                                <ErrorMessage name="manufactureDate" component="div" className="text-danger" />
                            </div>
                        </div>
                        {/* Второй столбец */}
                        <div>
                            {/* Поля для выбора производителя, типа машины, клиента и загрузки изображения */}
                            <div className="mb-3">
                                <label htmlFor="manufacturer" className="form-label">Производитель</label>
                                <Field as="select" id="manufacturer" name="manufacturer" className="form-control">
                                    <option value="">Выберите производителя</option>
                                    <option value="Manufacturer A">Производитель A</option>
                                    <option value="Manufacturer B">Производитель B</option>
                                    <option value="Manufacturer C">Производитель C</option>
                                    {/* Добавьте больше производителей по мере необходимости */}
                                </Field>
                                <ErrorMessage name="manufacturer" component="div" className="text-danger" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="machineType" className="form-label">Тип машины</label>
                                <Field as="select" id="machineType" name="machineType" className="form-control">
                                    <option value="">Выберите тип машины</option>
                                    <option value="Type 1">Тип 1</option>
                                    <option value="Type 2">Тип 2</option>
                                    <option value="Type 3">Тип 3</option>
                                    {/* Добавьте больше типов машин по мере необходимости */}
                                </Field>
                                <ErrorMessage name="machineType" component="div" className="text-danger" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="client" className="form-label">Клиент</label>
                                <Field as="select" id="client" name="client" className="form-control">
                                    <option value="">Выберите клиента</option>
                                    <option value="Client A">Клиент A</option>
                                    <option value="Client B">Клиент B</option>
                                    <option value="Client C">Клиент C</option>
                                    {/* Добавьте больше клиентов по мере необходимости */}
                                </Field>
                                <ErrorMessage name="client" component="div" className="text-danger" />
                            </div>
                            {/* Поле для загрузки изображения */}
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">Изображение машины</label>
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    className="form-control"
                                    onChange={(event) => setFieldValue('image', event.currentTarget.files[0])}
                                />
                                <ErrorMessage name="image" component="div" className="text-danger" />
                            </div>
                            <button type="submit" className="btn btn-primary">Добавить машину</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default MachinesAddPage;

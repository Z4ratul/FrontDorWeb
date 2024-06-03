import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function EmployeeAddPage() {
    // Начальные значения формы
    const initialValues = {
        position: '',
        surname: '',
        name: '',
        patronymic: '',
        telephone: '',
        email: '',
        username: '',
        password: '',
        partner: '',
    };

    // Схема валидации с помощью Yup
    const validationSchema = Yup.object({
        position: Yup.string().required('Должность обязательна'),
        surname: Yup.string().required('Фамилия обязательна'),
        name: Yup.string().required('Имя обязательно'),
        patronymic: Yup.string().required('Отчество обязательно'),
        telephone: Yup.string()
            .required('Телефон обязателен')
            .matches(/^\+?[0-9\s-]{7,15}$/, 'Неправильный формат телефона'),
        email: Yup.string().email('Неправильный формат электронной почты').required('Электронная почта обязательна'),
        username: Yup.string().required('Логин обязателен'),
        password: Yup.string().required('Пароль обязателен'),
        partner: Yup.string().required('Партнер обязателен'),
    });

    // Обработчик отправки формы
    const handleSubmit = (values) => {
        // Здесь вы можете добавить логику для обработки отправленных данных
        console.log('Добавленный сотрудник:', values);
    };

    return (
        <div className="container">
            <h3>Страница Доб. Доверенного лица</h3>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {() => (
                    <Form className="form-container">
                        {/* Первый столбец */}
                        <div>
                            <div className="mb-3">
                                <label htmlFor="position" className="form-label">Должность</label>
                                <Field type="text" id="position" name="position" className="form-control" />
                                <ErrorMessage name="position" component="div" className="text-danger" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="surname" className="form-label">Фамилия</label>
                                <Field type="text" id="surname" name="surname" className="form-control" />
                                <ErrorMessage name="surname" component="div" className="text-danger" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Имя</label>
                                <Field type="text" id="name" name="name" className="form-control" />
                                <ErrorMessage name="name" component="div" className="text-danger" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="patronymic" className="form-label">Отчество</label>
                                <Field type="text" id="patronymic" name="patronymic" className="form-control" />
                                <ErrorMessage name="patronymic" component="div" className="text-danger" />
                            </div>
                        </div>
                        {/* Второй столбец */}
                        <div>
                            <div className="mb-3">
                                <label htmlFor="telephone" className="form-label">Телефон</label>
                                <Field type="text" id="telephone" name="telephone" className="form-control" />
                                <ErrorMessage name="telephone" component="div" className="text-danger" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Электронная почта</label>
                                <Field type="email" id="email" name="email" className="form-control" />
                                <ErrorMessage name="email" component="div" className="text-danger" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Логин</label>
                                <Field type="text" id="username" name="username" className="form-control" />
                                <ErrorMessage name="username" component="div" className="text-danger" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Пароль</label>
                                <Field type="password" id="password" name="password" className="form-control" />
                                <ErrorMessage name="password" component="div" className="text-danger" />
                            </div>
                            {/* Поле для выбора партнера */}
                            <div className="mb-3">
                                <label htmlFor="partner" className="form-label">Партнер</label>
                                <Field as="select" id="partner" name="partner" className="form-control">
                                    <option value="">Выберите партнера</option>
                                    <option value="Partner A">Партнер A</option>
                                    <option value="Partner B">Партнер B</option>
                                    <option value="Partner C">Партнер C</option>
                                    {/* Добавьте больше партнеров по мере необходимости */}
                                </Field>
                                <ErrorMessage name="partner" component="div" className="text-danger" />
                            </div>
                            <button type="submit" className="btn btn-primary">Добавить Доверенного лица</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default EmployeeAddPage;

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function PartnerAddPage() {
    // Начальные значения формы
    const initialValues = {
        inn: '',
        fullName: '',
        shortName: ''
    };

    // Схема валидации с помощью Yup
    const validationSchema = Yup.object({
        inn: Yup.string()
            .required('ИНН обязателен')
            .matches(/^\d{10}$|^\d{12}$/, 'ИНН должен состоять из 10 или 12 цифр'),
        fullName: Yup.string()
            .required('Полное наименование компании партнера обязательно')
            .max(100, 'Полное наименование не должно превышать 100 символов'),
        shortName: Yup.string()
            .required('Краткое наименование компании партнера обязательно')
            .max(50, 'Краткое наименование не должно превышать 50 символов'),
    });

    // Обработчик отправки формы
    const handleSubmit = (values) => {
        // Здесь вы можете добавить логику для обработки отправленных данных
        console.log('Добавленный партнер:', values);
    };

    return (
        <div className="container">
            <h3>Страница Доб. Партнера</h3>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {() => (
                    <Form>
                        <div className="mb-3">
                            <label htmlFor="inn" className="form-label">ИНН</label>
                            <Field type="text" id="inn" name="inn" className="form-control" />
                            <ErrorMessage name="inn" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="fullName" className="form-label">Полное наименование компании партнера</label>
                            <Field type="text" id="fullName" name="fullName" className="form-control" />
                            <ErrorMessage name="fullName" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="shortName" className="form-label">Краткое наименование компании партнера</label>
                            <Field type="text" id="shortName" name="shortName" className="form-control" />
                            <ErrorMessage name="shortName" component="div" className="text-danger" />
                        </div>
                        <button type="submit" className="btn btn-primary">Добавить партнера</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default PartnerAddPage;

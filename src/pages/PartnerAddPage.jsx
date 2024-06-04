import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { BASE_URL } from '../main';

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
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/partner`, {
                INN: values.inn,
                fullName: values.fullName,
                shortName: values.shortName
            });
            console.log('Добавленный партнер:', response.data);
            alert('Партнер успешно добавлен!');
            resetForm();
        } catch (error) {
            console.error('Ошибка при добавлении партнера:', error);
            alert('Ошибка при добавлении партнера');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container">
            <h3>Страница добавления партнера</h3>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
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
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? 'Добавление...' : 'Добавить партнера'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default PartnerAddPage;

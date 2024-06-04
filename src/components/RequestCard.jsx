import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

function RequestCard({ requestNumber, machine, submissionDate, closeDate, service, description, partner }) {
    const [showModal, setShowModal] = useState(false);
    const [editedSubmissionDate, setEditedSubmissionDate] = useState(submissionDate);
    const [editedCloseDate, setEditedCloseDate] = useState(closeDate);
    const [editedService, setEditedService] = useState(service.name);
    const [editedPartner, setEditedPartner] = useState(partner.shortName);
    const [editedDescription, setEditedDescription] = useState(description);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const handleSaveChanges = () => {
        // Здесь можно добавить логику сохранения изменений
        handleClose();
    };

    return (
        <div>
            <div className="card mb-3" onClick={handleShow}>
                <div className="card-body">
                    <h5 className="request-number">Заявка №{requestNumber}</h5> {/* Большой текст для номера заявки */}
                    <p className="card-text">Дата подачи: {submissionDate && new Date(submissionDate).toLocaleDateString()}</p>
                    <p className="card-text">Дата закрытия: {closeDate && new Date(closeDate).toLocaleDateString()}</p>
                    <p className="card-text">Услуга: {service.name}</p>
                    <p className="card-text">Партнер: {partner.shortName}</p>
                    <p className="card-text">Машина: {machine.modelName}</p>
                    <p className="card-text">Описание: {description}</p>
                </div>
            </div>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Информация о заявке №{requestNumber}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formSubmissionDate">
                        <Form.Label>Дата подачи</Form.Label>
                        <Datetime
                            value={editedSubmissionDate}
                            onChange={(date) => setEditedSubmissionDate(date)}
                            dateFormat="YYYY-MM-DD"
                            timeFormat={false}
                        />
                    </Form.Group>
                    <Form.Group controlId="formCloseDate">
                        <Form.Label>Дата закрытия</Form.Label>
                        <Datetime
                            value={editedCloseDate}
                            onChange={(date) => setEditedCloseDate(date)}
                            dateFormat="YYYY-MM-DD"
                            timeFormat={false}
                        />
                    </Form.Group>
                    <Form.Group controlId="formService">
                        <Form.Label>Услуга</Form.Label>
                        <Form.Control type="text" value={editedService} onChange={(e) => setEditedService(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formPartner">
                        <Form.Label>Партнер</Form.Label>
                        <Form.Control type="text" value={editedPartner} onChange={(e) => setEditedPartner(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Описание</Form.Label>
                        <Form.Control as="textarea" rows={3} value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Закрыть</Button>
                    <Button variant="primary" onClick={handleSaveChanges}>Сохранить изменения</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default RequestCard;

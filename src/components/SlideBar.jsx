import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

function SideBar() {
    return (
        <Nav className="flex-column bg-light" style={{ width: '250px', height: '100vh' }}>
            <Nav.Link as={Link} to="requests">Заявки</Nav.Link>
            <Nav.Link as={Link} to="clients">Клиенты</Nav.Link>
            <Nav.Link as={Link} to="machines">Машины</Nav.Link>
            <Nav.Link as={Link} to="partnerAdd">Доб. Партнера</Nav.Link>
            <Nav.Link as={Link} to="clientAdd">Доб. Контактного лица</Nav.Link>
            <Nav.Link as={Link} to="machineAdd">Доб. Машины</Nav.Link>
        </Nav>
    );
}

export default SideBar;

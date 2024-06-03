import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import SideBar from "../components/SlideBar";
import ClientsPage from './ClientsPage';
import RequestsPage from './RequestsPage';
import MachinesPage from './MachinesPage';
import ClientsAddPage from './ClientAddPage';
import MachinesAddPage from './MachineAddPage';
import PartnerAddPage from './PartnerAddPage';

function MainPage() {
    return (
        <div className="d-flex">
            <SideBar />
            <div className="container p-4">
                <Routes>
                    <Route path="clients" element={<ClientsPage />} />
                    <Route path="requests" element={<RequestsPage />} />
                    <Route path="machines" element={<MachinesPage />} />
                    <Route path="partnerAdd" element={<PartnerAddPage />} />
                    <Route path="clientAdd" element={<ClientsAddPage />} />
                    <Route path="machineAdd" element={<MachinesAddPage />} />
                </Routes>
            </div>
        </div>
    );
}

export default MainPage;

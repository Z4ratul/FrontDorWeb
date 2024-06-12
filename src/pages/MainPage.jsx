// MainPage.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import Navbar from "../components/Navbar";
import ClientsPage from "./ClientsPage/ClientsPage";
import RequestsPage from "./RequestsPage/RequestsPage";
import MachinesPage from "./MachinesPage/MachinesPage";
import PartnerAddPage from "./PartnerAddPage/PartnerAddPage";
import ClientAddPage from "./ClientAddPage/ClientAddPage";
import MachineAddPage from "./MachineAddPage/MachineAddPage";
import WorksPage from "./WorksPage/WorksPage";
import WorkAddPage from "./WorkAddPage/WorkAddPage";

const { Content } = Layout;

function MainPage() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Navbar />
      <Content
        style={{
          padding: "24px 0px",
          margin: "48px 240px",
          minHeight: 280,
        }}>
        <Routes>
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/requests" element={<RequestsPage />} />
          <Route path="/machines" element={<MachinesPage />} />
          <Route path="/works" element={<WorksPage />} />
          <Route path="/partnerAdd" element={<PartnerAddPage />} />
          <Route path="/clientAdd" element={<ClientAddPage />} />
          <Route path="/machineAdd" element={<MachineAddPage />} />
          <Route path="/workAdd" element={<WorkAddPage />} />
        </Routes>
      </Content>
    </Layout>
  );
}

export default MainPage;

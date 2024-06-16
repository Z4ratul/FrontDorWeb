// Navbar.js
import React from "react";
import { Button, Menu } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined, SolutionOutlined, CarOutlined, ToolOutlined, PlusOutlined, LogoutOutlined, BarChartOutlined } from "@ant-design/icons";

const handleLogoutClick = () => {
  localStorage.removeItem("user");
  window.location.href = "/auth";
};

const Navbar = () => (
  <Menu mode="horizontal" style={{ lineHeight: "48px", position: "fixed", width: "100%", zIndex: 1000, padding: "0px 10px" }}>
    <Menu.Item key="requests" icon={<SolutionOutlined />}>
      <Link to="requests">Заявки</Link>
    </Menu.Item>
    <Menu.Item key="clients" icon={<UserOutlined />}>
      <Link to="clients">Клиенты</Link>
    </Menu.Item>
    <Menu.Item key="machines" icon={<CarOutlined />}>
      <Link to="machines">Машины</Link>
    </Menu.Item>
    <Menu.Item key="works" icon={<ToolOutlined />}>
      <Link to="works">Работы</Link>
    </Menu.Item>
    <Menu.Item key="statistic" icon={<BarChartOutlined />}>
      <Link to="statistic">Статистика</Link>
    </Menu.Item>

    <Menu.Item key="workAdd" style={{ marginLeft: "auto" }} icon={<PlusOutlined />}>
      <Link to="workAdd">Назначить работу</Link>
    </Menu.Item>
    <Menu.Item key="partnerAdd" icon={<PlusOutlined />}>
      <Link to="partnerAdd">Добавить партнера</Link>
    </Menu.Item>
    <Menu.Item key="clientAdd" icon={<PlusOutlined />}>
      <Link to="clientAdd">Добавить клиента</Link>
    </Menu.Item>
    <Menu.Item key="machineAdd" icon={<PlusOutlined />}>
      <Link to="machineAdd">Добавить машину</Link>
    </Menu.Item>
    <Menu.Item key="logout" icon={<LogoutOutlined style={{ color: "red" }} />}>
      <Link to="login" onClick={handleLogoutClick} style={{ color: "red" }}>
        Выйти
      </Link>
    </Menu.Item>
  </Menu>
);

export default Navbar;

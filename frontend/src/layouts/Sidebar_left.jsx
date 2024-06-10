import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Layout, Menu, Modal, Button as AntButton } from "antd";
import {
  DashboardOutlined,
  ShopOutlined,
  UnorderedListOutlined,
  ShoppingOutlined,
  StockOutlined,
  LogoutOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { MyContext } from "../Services/Context";
import ModalComponent from "../Components/ModalComponents";
import { Button } from "react-bootstrap";
import { width } from "@fortawesome/free-solid-svg-icons/fa0";
// import 'antd/dist/antd.css'; // Import Ant Design styles

const { Sider } = Layout;
const SidebarLeft = ({ showSidebar }) => {
  const location = useLocation();

  console.log(showSidebar, "shoe");
  const [logOutModal, setLogOutModal] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("User");
    localStorage.removeItem("loggedIn");
    navigate("/");
  };

  const menuItems = {
    "/dashboard": "dashboard",
    "/franchises": "franchises",
    "/category": "category",
    "/products": "products",
    "/stocks": "stocks",
    "/stocks-report": "stocks-report",
  };
  const defaultSelectedKey = menuItems[location.pathname] || "dashboard";
  return (
    <>
      <Sider collapsible={false} className="left-side-menu custom-sider mt-2">
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[defaultSelectedKey]}
        >
          <Menu.Item key="dashboard" icon={<ShopOutlined />}>
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="franchises" icon={<ShopOutlined />}>
            <Link to="/franchises">Franchise</Link>
          </Menu.Item>
          <Menu.Item key="category" icon={<UnorderedListOutlined />}>
            <Link to="/category">Categories</Link>
          </Menu.Item>
          <Menu.Item key="products" icon={<ShoppingOutlined />}>
            <Link to="/products">Products</Link>
          </Menu.Item>
          <Menu.Item key="stocks" icon={<StockOutlined />}>
            <Link to="/stocks">Stocks</Link>
          </Menu.Item>
          <Menu.Item key="stocks-report" icon={<FileTextOutlined />}>
            <Link to="/stocks-report">Stocks Report</Link>
          </Menu.Item>
          <Menu.Item
            key="6"
            icon={<LogoutOutlined />}
            onClick={() => setLogOutModal({ show: true })}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Sider>

      <ModalComponent
        show={logOutModal.show}
        onHide={() => {
          setLogOutModal({ show: false, id: null });
        }}
        centered
        width={"500px"}
      >
        <div className="modal-body">
          <div className="row mb-4">
            <div className="col d-flex justify-content-center">
              <i
                className="fa fa-door-open"
                style={{ fontSize: "50px", color: "#fe9423" }}
              ></i>
            </div>
          </div>
          <div className="row">
            <div className="col d-flex justify-content-center ">
              <h5 className="">Are you sure you want to log out{""} ?</h5>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <div className="col gap-3 d-flex justify-content-center">
            <Button
              onClick={() => {
                setLogOutModal({ show: false, id: null });
              }}
              type="button"
              className="btn btn-cancel"
              data-bs-dismiss="modal"
            >
              No, keep it
            </Button>
            <Button
              variant="danger"
              type="button"
              className="btn btn-custom text-white"
              onClick={() => {
                handleLogout();
              }}
            >
              Yes, log out
            </Button>
          </div>
        </div>
      </ModalComponent>
    </>
  );
};

export default SidebarLeft;

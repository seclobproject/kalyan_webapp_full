// import React, { useContext, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { Layout, Menu, Modal, Button as AntButton } from "antd";
// import {
//   DashboardOutlined,
//   ShopOutlined,
//   UnorderedListOutlined,
//   ShoppingOutlined,
//   StockOutlined,
//   LogoutOutlined,
//   FileTextOutlined,
// } from "@ant-design/icons";
// import { MyContext } from "../Services/Context";
// import ModalComponent from "../Components/ModalComponents";
// import { Button } from "react-bootstrap";
// import { width } from "@fortawesome/free-solid-svg-icons/fa0";
// // import 'antd/dist/antd.css'; // Import Ant Design styles

// const { Sider } = Layout;
// const SidebarLeft = ({ showSidebar }) => {
//   const location = useLocation();

//   console.log(showSidebar, "shoe");
//   const [logOutModal, setLogOutModal] = useState(false);
//   const navigate = useNavigate();
//   const handleLogout = () => {
//     localStorage.removeItem("User");
//     localStorage.removeItem("loggedIn");
//     navigate("/");
//   };

//   const menuItems = {
//     "/dashboard": "dashboard",
//     "/franchises": "franchises",
//     "/category": "category",
//     "/products": "products",
//     "/stocks": "stocks",
//     "/stocks-report": "stocks-report",
//   };
//   const defaultSelectedKey = menuItems[location.pathname] || "dashboard";
//   return (
//     <>
//       <Sider collapsible={false} className="left-side-menu custom-sider mt-2">
//         <Menu
//           theme="dark"
//           mode="inline"
//           defaultSelectedKeys={[defaultSelectedKey]}
//         >
//           <Menu.Item key="dashboard" icon={<ShopOutlined />}>
//             <Link to="/dashboard">Dashboard</Link>
//           </Menu.Item>
//           <Menu.Item key="franchises" icon={<ShopOutlined />}>
//             <Link to="/franchises">Franchise</Link>
//           </Menu.Item>
//           <Menu.Item key="category" icon={<UnorderedListOutlined />}>
//             <Link to="/category">Categories</Link>
//           </Menu.Item>
//           <Menu.Item key="products" icon={<ShoppingOutlined />}>
//             <Link to="/products">Products</Link>
//           </Menu.Item>
//           <Menu.Item key="stocks" icon={<StockOutlined />}>
//             <Link to="/stocks">Stocks</Link>
//           </Menu.Item>
//           <Menu.Item key="stocks-report" icon={<FileTextOutlined />}>
//             <Link to="/stocks-report">Stocks Report</Link>
//           </Menu.Item>
//           <Menu.Item
//             key="6"
//             icon={<LogoutOutlined />}
//             onClick={() => setLogOutModal({ show: true })}
//           >
//             Logout
//           </Menu.Item>
//         </Menu>
//       </Sider>

//       <ModalComponent
//         show={logOutModal.show}
//         onHide={() => {
//           setLogOutModal({ show: false, id: null });
//         }}
//         centered
//         width={"500px"}
//       >
//         <div className="modal-body">
//           <div className="row mb-4">
//             <div className="col d-flex justify-content-center">
//               <i
//                 className="fa fa-door-open"
//                 style={{ fontSize: "50px", color: "#fe9423" }}
//               ></i>
//             </div>
//           </div>
//           <div className="row">
//             <div className="col d-flex justify-content-center ">
//               <h5 className="">Are you sure you want to log out{""} ?</h5>
//             </div>
//           </div>
//         </div>

//         <div className="modal-footer">
//           <div className="col gap-3 d-flex justify-content-center">
//             <Button
//               onClick={() => {
//                 setLogOutModal({ show: false, id: null });
//               }}
//               type="button"
//               className="btn btn-cancel"
//               data-bs-dismiss="modal"
//             >
//               No, keep it
//             </Button>
//             <Button
//               variant="danger"
//               type="button"
//               className="btn btn-custom text-white"
//               onClick={() => {
//                 handleLogout();
//               }}
//             >
//               Yes, log out
//             </Button>
//           </div>
//         </div>
//       </ModalComponent>
//     </>
//   );
// };

// export default SidebarLeft;



import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import "../layouts/sidebar.css";
import {
  ShopOutlined,
  UnorderedListOutlined,
  ShoppingOutlined,
  StockOutlined,
  LogoutOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Button } from "react-bootstrap";
import ModalComponent from "../Components/ModalComponents";

const { Sider } = Layout;

const SidebarLeft = () => {
  const location = useLocation();
  const [logOutModal, setLogOutModal] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleLogout = () => {
    localStorage.removeItem("User");
    localStorage.removeItem("loggedIn");
    navigate("/");
  };

  const menuItems = [
    { key: "dashboard", icon: <ShopOutlined />, label: <Link to="/dashboard"><ShopOutlined /><span>Dashboard</span></Link> },
    { key: "franchises", icon: <ShopOutlined />, label: <Link to="/franchises"><ShopOutlined /><span>Franchise</span></Link> },
    { key: "category", icon: <UnorderedListOutlined />, label: <Link to="/category"><UnorderedListOutlined /><span>Categories</span></Link> },
    { key: "products", icon: <ShoppingOutlined />, label: <Link to="/products"><ShoppingOutlined /><span>Products</span></Link> },
    { key: "stocks", icon: <StockOutlined />, label: <Link to="/stocks"><StockOutlined /><span>Stocks</span></Link> },
    { key: "stocks-report", icon: <FileTextOutlined />, label: <Link to="/stocks-report"><FileTextOutlined /><span>Stocks Report</span></Link> },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: <span onClick={() => setLogOutModal({ show: true })}><LogoutOutlined /><span>Logout</span></span>
    }
  ];

  const defaultSelectedKey = menuItems.find(item => item.key === location.pathname.substring(1))?.key || "dashboard";

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile && (
        <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
          <button
            className="sidebar-toggle"
            onClick={() => {
              setCollapsed(!collapsed);
              setMenuOpen(!menuOpen); // Toggle menu open/close
            }}
          >
            ☰
          </button>
          <div className={`menu-items ${menuOpen ? "open" : ""}`}>
            <ul style={{listStyle:"none"}}>
              {menuItems.map(item => (
                <li key={item.key} className="listside">
                  {collapsed ? null : item.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <Sider
        collapsible
        collapsed={isMobile && collapsed}
        className={`left-side-menu custom-sider ${collapsed ? '' : 'show'}`}
        onCollapse={() => setCollapsed(!collapsed)}
        style={{ paddingTop: "64px" }}
        breakpoint="md"
        collapsedWidth="0"
        trigger={null}
      >
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[defaultSelectedKey]}
          items={menuItems.map(item => ({
            key: item.key,
            // icon: item.icon,
            label: item.label,
          }))}
        />
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
              <h5 className="">Are you sure you want to log out?</h5>
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

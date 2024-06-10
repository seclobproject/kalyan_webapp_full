import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalComponent from "../Components/ModalComponents";
import { Button } from "react-bootstrap";
import SidebarLeft from "./Sidebar_left";

function Header({}) {
  const navigate = useNavigate();
  const [logOutModal, setLogOutModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("User");
    localStorage.removeItem("loggedIn");

    navigate("/");
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };



  return (
    <>
      <div className="navbar-custom">
        <ul className="list-unstyled topnav-menu float-end mb-0">
          <li className="d-none d-lg-block">
            <form className="app-search">
              <div className="app-search-box"></div>
            </form>
          </li>

          <li className="dropdown notification-list topbar-dropdown">
            <a
              className="nav-link dropdown-toggle waves-effect waves-light"
              data-bs-toggle="dropdown"
              role="button"
              aria-haspopup="false"
              aria-expanded="false"
              onClick={() => setLogOutModal({ show: true })}
            >
              <i
                className="fas fa-sign-out-alt noti-icon"
                style={{ color: "red" }}
              />
            </a>
          </li>
        </ul>
        {/* LOGO */}
        <div className="logo-box">
          <a href={undefined} className="logo logo-dark text-center">
            <span className="logo-lg">
              <img src="/assets/images/kalyan logo-01.png" alt height={120} />
            </span>
          </a>
        </div>
        <ul className="list-unstyled topnav-menu topnav-menu-left mb-0">
          {/* <li>
            <button className="button-menu-mobile disable-btn waves-effect"  onClick={toggleSidebar}>
              <i className="fe-menu" />
            </button>
          </li> */}
          <li></li>
        </ul>
        <div className="clearfix" />
      </div>

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
}

export default Header;

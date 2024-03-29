import React from "react";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link } from "react-router-dom";
import { useUser } from "../globalStorage/UserProvider";

const Sidebar = () => {
  const { user } = useUser();
  console.log("sidebar", user);
  return (
    <div className="border-end sidenav" id="sidebar-wrapper">
      <div
        className="sidebar-heading border-bottom "
        style={{ backgroundColor: "white" }}
      >
        <Link to="/Dashboard">
          <img
            alt="Alt content"
            src={require("./../assets/images/logo.png")}
            style={{ width: "100%" }}
          />
        </Link>
      </div>
      <PerfectScrollbar className="sidebar-items">
        <ul className="list-unstyled ps-0">
          <li className="mb-1">
            <Link tag="a" className="" to="/Dashboard">
              <i className="fa fa-dashboard"></i> Dashboard
            </Link>
          </li>

          <li className="mb-1">
            <Link tag="a" className="" to="/user-details">
              <i className="fa fa-user"></i> Users
            </Link>
          </li>

          <li className="mb-1">
            <Link tag="a" className="" to="/booking-details">
              <i className="fa fa-book"></i> Bookings
            </Link>
          </li>

          <li className="mb-1">
            <Link tag="a" className="" to="/yacht-details">
            <i className="fa fa-ship"></i> Yachts
            </Link>
          </li>
          <li className="mb-1">
            <Link tag="a" className="" to="/blank-page">
              <i className="fa fa-file-o"></i> Blank Page
            </Link>
          </li>
          <li className="border-top my-3"></li>
          <li className="mb-1">
            <Link tag="a" className="" to="/typography">
              <i className="fa fa-text-width" aria-hidden="true"></i> Typography
            </Link>
          </li>
        </ul>
      </PerfectScrollbar>
      <div className="dropdown fixed-bottom-dropdown">
        <a
          href="#"
          className="d-flex align-items-center text-decoration-none dropdown-toggle"
          id="dropdownUser2"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://via.placeholder.com/50"
            alt=""
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <span>Admin</span>
        </a>
        <ul
          className="dropdown-menu text-small shadow"
          aria-labelledby="dropdownUser2"
        >
          <li>
            <Link className="dropdown-item" to="/profile">
              <i className="fa fa-user-circle" aria-hidden="true"></i> Profile
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Link className="dropdown-item" to="/">
              <i className="fa fa-sign-out" aria-hidden="true"></i> Sign out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

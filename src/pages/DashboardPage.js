import React, { useState, useEffect } from "react";
import adminLayout from "../hoc/adminLayout";
import { useUser } from "../globalStorage/UserProvider";
import { Link } from "react-router-dom";

import { getAllUsers } from "../api/api";

const DashboardPage = () => {
  const [state, setState] = useState({});
  const [userCount, setUserCount] = useState(0);
  const { user } = useUser();
  console.log("userData", user);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve user token from localStorage
        const userToken = localStorage.getItem("userToken");

        // Make API call with user token
        const usersResponse = await getAllUsers(userToken);
        //  console.log("response", usersResponse?.allUsers);
        const totalUsers = usersResponse?.allUsers?.length;
        console.log("total users-", totalUsers);
        setUserCount(totalUsers);
        setState(usersResponse);
      } catch (error) {
        console.error("API error:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-xl-3 col-sm-6 mb-3">
          <div className="card text-white bg-primary o-hidden h-100">
            <div className="card-body">
              <div className="card-body-icon">
                <i className="fa fa-fw fa-user"></i>
              </div>
              <div className="mr-5">Total Number of Users: {userCount}</div>
            </div>
            <a className="card-footer text-white clearfix small z-1" href="#">
              <Link to="/user-details">
                <span className="float-left">View Details</span>
                <span class4Name="float-right">
                  <i className="fa fa-angle-right"></i>
                </span>
              </Link>
            </a>
          </div>
        </div>
        {/* <div className="col-xl-3 col-sm-6 mb-3">
          <div className="card text-white bg-warning o-hidden h-100">
            <div className="card-body">
              <div className="card-body-icon">
                <i className="fa fa-fw fa-list"></i>
              </div>
              <div className="mr-5">11 New Tasks!</div>
            </div>
            <a className="card-footer text-white clearfix small z-1" href="#">
              <span className="float-left">View Details</span>
              <span className="float-right">
                <i className="fa fa-angle-right"></i>
              </span>
            </a>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 mb-3">
          <div className="card text-white bg-success o-hidden h-100">
            <div className="card-body">
              <div className="card-body-icon">
                <i className="fa fa-fw fa-shopping-cart"></i>
              </div>
              <div className="mr-5">123 New Orders!</div>
            </div>
            <a className="card-footer text-white clearfix small z-1" href="#">
              <span className="float-left">View Details</span>
              <span className="float-right">
                <i className="fa fa-angle-right"></i>
              </span>
            </a>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 mb-3">
          <div className="card text-white bg-danger o-hidden h-100">
            <div className="card-body">
              <div className="card-body-icon">
                <i className="fa fa-fw fa-support"></i>
              </div>
              <div className="mr-5">13 New Tickets!</div>
            </div>
            <a className="card-footer text-white clearfix small z-1" href="#">
              <span className="float-left">View Details</span>
              <span className="float-right">
                <i className="fa fa-angle-right"></i>
              </span>
            </a>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default adminLayout(DashboardPage);

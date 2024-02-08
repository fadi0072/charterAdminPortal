import React, { useState, useEffect } from "react";
import adminLayout from "../hoc/adminLayout";
import { useUser } from "../globalStorage/UserProvider";
import { Link } from "react-router-dom";

import { getAllBookings, getAllUsers, getAllYachts } from "../api/api";

const DashboardPage = () => {
  const [userCount, setUserCount] = useState();
  const [bookingCnt, setBookingcnt] = useState();
  const [yachtCount, setYachtcount] = useState();

  const { user } = useUser();
  console.log("userData", user);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Retrieve user token from localStorage
        const userToken = localStorage.getItem("userToken");

        // Make API call with user token
        const usersResponse = await getAllUsers(userToken);
        //  console.log("response", usersResponse?.allUsers);
        const totalUsers = usersResponse?.allUsers?.length;
        console.log("total users-", totalUsers);
        setUserCount(totalUsers);
       
      } catch (error) {
        console.error("API error:", error);
      }
    };
    const fetchBookings = async () => {
      try {
        // Retrieve user token from localStorage
        const userToken = localStorage.getItem("userToken");

        // Make API call with user token
        const usersResponse = await getAllBookings(userToken);
        //  console.log("response", usersResponse?.allUsers);
        const totalBookings = usersResponse?.allBookings?.length;
        console.log(" totalBooking-", totalBookings);
        setBookingcnt(totalBookings);
        
      } catch (error) {
        console.error("API error:", error);
      }
    };

    const fetchYachts = async () => {
      try {
        // Retrieve user token from localStorage
        const userToken = localStorage.getItem("userToken");

        // Make API call with user token
        const usersResponse = await getAllYachts(userToken);
        //  console.log("response", usersResponse?.allUsers);
        const totalYacht = usersResponse?.allYatchs?.length;
        console.log(" totalBooking-", totalYacht);
        setYachtcount(totalYacht);
        
      } catch (error) {
        console.error("API error:", error);
      }
    };

    fetchUsers();
    fetchBookings()
    fetchYachts()
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
         <div className="col-xl-3 col-sm-6 mb-3">
          <div className="card text-white bg-warning o-hidden h-100">
            <div className="card-body">
              <div className="card-body-icon">
                <i className="fa fa-book"></i>
              </div>
              <div className="mr-5 ">{bookingCnt} Bookings!</div>
            </div>
            <a className="card-footer text-white clearfix small z-1" href="#">
            <Link to="/booking-details">
              <span className="float-left">View Details</span>
              <span className="float-right">
                <i className="fa fa-angle-right"></i>
              </span>
              </Link>
            </a>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 mb-3">
          <div className="card text-white bg-success o-hidden h-100">
            <div className="card-body">
              <div className="card-body-icon">
              <i className="fa fa-ship"></i> 
              </div>
              <div className="mr-5">{yachtCount} Total Yachts</div>
            </div>
            <a className="card-footer text-white clearfix small z-1" href="#">

            <Link to="/yacht-details">
              <span className="float-left">View Details</span>
              <span className="float-right">
                <i className="fa fa-angle-right"></i>

              </span>
              </Link>
            </a>
          </div>
        </div>
        {/* <div className="col-xl-3 col-sm-6 mb-3">
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
        </div>  */}
      </div>
    </>
  );
};

export default adminLayout(DashboardPage);

import React, { useEffect, useState } from "react";
import adminLayout from "../hoc/adminLayout";
import ModalComponent from "../components/ModalComponent";
import { getAllBookings, getAllUsers } from "../api/api";
import { Preloader, Bars } from "react-preloader-icon";

const AllbookingData = () => {
  const [bookingData, setAllBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const ITEMS_PER_PAGE = 10;

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userToken = localStorage.getItem("userToken");
        const bookingsResponse = await getAllBookings(userToken);
        console.log("allBookings", bookingsResponse?.allBookings);
        setAllBookings(bookingsResponse?.allBookings || []);
      } catch (error) {
        console.error("API error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalItems = bookingData.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const displayedBookings = bookingData.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <div className="table-container" style={{width:'100%'}}>
        <div className="d-flex text-muted">
          {loading ? (
            <div className={"preloader-white"}>
              <div className="preloader-container">
                <Preloader
                  use={Bars}
                  size={20}
                  strokeWidth={2}
                  strokeColor="#3498db"
                  duration={800}
                />
              </div>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Yacht Name</th>
                  <th>Customer Name</th>
                  <th>Check-in Date-Time</th>
                  <th>Check-out Date-Time</th>
                  <th>Booking Status</th>
                  <th>Yacht Image</th>
                </tr>
              </thead>
              <tbody>
                {displayedBookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>{booking.booked_yatch.title}</td>
                    <td>{booking.booker.username}</td>
                    <td>{new Date(booking.check_in_time * 1000).toLocaleString()}</td>
                    <td>{new Date(booking.check_out_time * 1000).toLocaleString()}</td>
                    <td>{booking.status}</td>
                    <td>
                      <img src={booking.booked_yatch.images[0]} alt="Yacht" style={{ width: '150px', height: '100px' }} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <nav
          className="table-bottom-center-pagination"
          aria-label="Page navigation example "
        >
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <a
                className="page-link"
                href="#"
                aria-label="Previous"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
              </a>
            </li>

            {[...Array(totalPages).keys()].map((page) => (
              <li
                key={page + 1}
                className={`page-item ${
                  page + 1 === currentPage ? "active" : ""
                }`}
              >
                <a
                  className="page-link"
                  href="#"
                  onClick={() => handlePageChange(page + 1)}
                >
                  {page + 1}
                </a>
              </li>
            ))}

            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <a
                className="page-link"
                href="#"
                aria-label="Next"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">Next</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default adminLayout(AllbookingData);

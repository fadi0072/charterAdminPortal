import React, { useEffect, useState } from "react";
import adminLayout from "../hoc/adminLayout";
import ModalComponent from "../components/ModalComponent";
import { getAllUsers } from "../api/api";
import { Preloader, Bars } from "react-preloader-icon";

const AllUserData = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const ITEMS_PER_PAGE = 10;

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userToken = localStorage.getItem("userToken");
        const usersResponse = await getAllUsers(userToken);
        console.log("allUsers", usersResponse?.allUsers);
        setUserData(usersResponse?.allUsers || []);
      } catch (error) {
        console.error("API error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalItems = userData.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const displayedUsers = userData.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <>
      <div className="table-container">
        <div className="row">
          <div className="col">
            <h5 className="pb-2 mb-0">Users</h5>
          </div>
          <div className="col text-right">
            <button className="btn btn-default low-height-btn">
              <i className="fa fa-plus"></i>
            </button>
          </div>
        </div>
        <p>
          These are the List of all the users that are registered to
          GETMYCHARTER, users includes owners as well as renters.The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English.
        </p>
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
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Source</th>
                  <th>Created On</th>
                  <th>Updated On</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {displayedUsers.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{/* Replace with user.source */}</td>
                    <td>{/* Replace with user.createdOn */}</td>
                    <td>{/* Replace with user.updatedOn */}</td>
                    <td>
                      <div className="dropdown table-action-dropdown">
                        <button
                          className="btn btn-secondary btn-sm dropdown-toggle"
                          type="button"
                          id={`dropdownMenuButton-${user._id}`}
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i
                            className="fa fa-ellipsis-v"
                            aria-hidden="true"
                          ></i>
                        </button>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby={`dropdownMenuButton-${user._id}`}
                        >
                          <li>
                            <a className="dropdown-item" href="#">
                              <i
                                className="fa fa-pencil"
                                aria-hidden="true"
                              ></i>
                              &nbsp;Edit
                            </a>
                          </li>
                          <div className="dropdown-divider"></div>
                          <li>
                            <a className="dropdown-item text-danger" href="#">
                              <i className="fa fa-trash" aria-hidden="true"></i>
                              &nbsp;Delete
                            </a>
                          </li>
                        </ul>
                      </div>
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

export default adminLayout(AllUserData);

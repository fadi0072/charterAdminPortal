import React, { useEffect, useState } from "react";
import adminLayout from "../hoc/adminLayout";
import { getAllUsers, getAllYachts } from "../api/api";
import { Preloader, Bars } from "react-preloader-icon";
import ModalComponent from "../components/ModalComponent";

const AllYachtData = () => {
  const [yachtData, setYachtData] = useState([]);
  const [loading, setLoading] = useState(false);
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedYachtImages, setSelectedYachtImages] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userToken = localStorage.getItem("userToken");
        const usersResponse = await getAllYachts(userToken);
        console.log("allYachtss", usersResponse?.allYatchs);
        setYachtData(usersResponse?.allYatchs || []);
      } catch (error) {
        console.error("API error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const totalItems = yachtData.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const displayedYachts = yachtData.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleShowImages = (images) => {
    setSelectedYachtImages(images);
  };
  const modalContent = (yacht) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        <div className="yacht-images" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
          {yacht.length > 0 ? (
            yacht.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`Yacht ${index + 1}`}
                style={{
                  width: '400px', // set your desired width
                  height: '400px', // set your desired height
                  objectFit: 'cover', // cover the container maintaining aspect ratio
                  margin: '5px', // add spacing between images
                }}
              />
            ))
          ) : (
            <div>No images available</div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="table-container">
        <div className="row">
          <div className="col">
            <h5 className="pb-2 mb-0">Yachts</h5>
          </div>
          <div className="col text-right">
            <button className="btn btn-default low-height-btn">
              <i className="fa fa-plus"></i>
            </button>
          </div>
        </div>
        <p>
          These are the List of all the yachts that are available for rental.
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
                  <th>Title</th>
                  <th>Description</th>
                  <th>City</th>
                  <th>Made By</th>
                  <th>Model</th>
                  <th>Type</th>
                  <th>Pass. Capacity</th>
                  <th>Creator</th>
                  <th>Status</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                  <th>Images</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedYachts.map((yacht) => (
                  <tr key={yacht._id}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>{yacht.title}</td>
                    <td>{yacht.description}</td>
                    <td>{yacht.city}</td>
                    <td>{yacht.made_by_specs}</td>
                    <td>{yacht.model_specs}</td>
                    <td>{yacht.type_specs}</td>
                    <td>{yacht.psngr_capacity_specs}</td>
                    <td>{yacht.creator.username}</td>
                    <td>{yacht.published_status}</td>
                    <td>{new Date(yacht.createdAt).toLocaleDateString()}</td>
                    <td>{new Date(yacht.updatedAt).toLocaleDateString()}</td>

                    <td>
                      <div>

                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#fullScreenModalDefault" onClick={() => handleShowImages(yacht.images)}
                        >
                          Show Images
                        </button>

                        <ModalComponent
                          title="Yacht Images"
                          fullScreen={true}
                          dataBsBackdrop="static"
                          content={modalContent(selectedYachtImages)}

                          id="fullScreenModalDefault"
                        >



                        </ModalComponent>
                        {/* {yacht.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Image ${index}`}
                            style={{
                              width: "50px",
                              height: "auto",
                              marginRight: "5px",
                            }}
                          />
                        ))} */}
                      </div>
                    </td>
                    <td>
                      <div className="dropdown table-action-dropdown">
                        <button
                          className="btn btn-secondary btn-sm dropdown-toggle"
                          type="button"
                          id={`dropdownMenuButton-${yacht._id}`}
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                        </button>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby={`dropdownMenuButton-${yacht._id}`}
                        >
                          <li>
                            <a className="dropdown-item" href="#">
                              <i className="fa fa-pencil" aria-hidden="true"></i>
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
                className={`page-item ${page + 1 === currentPage ? "active" : ""
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
              className={`page-item ${currentPage === totalPages ? "disabled" : ""
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

export default adminLayout(AllYachtData);

import React from "react";

const PhotoModal = ({ images, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <div className="modal-body">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index}`}
              style={{ width: "100%", marginBottom: "10px" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoModal;

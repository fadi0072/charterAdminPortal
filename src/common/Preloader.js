import React from "react";
import { Preloader, Bars } from "react-preloader-icon";
import "../assets/css/login.css";

const CustomPreloader = ({ loading }) => {
  return (
    <div className={loading ? "preloader-overlay" : "preloader-hidden"}>
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
  );
};

export default CustomPreloader;

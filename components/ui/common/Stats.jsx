import React from "react";
import { CiCircleList, CiCircleQuestion, CiLogin } from "react-icons/ci";
import { MdClass } from "react-icons/md";

const Stats = () => {
  return (
    <div className="container">
      <div className="row text-center">
        <div className="col-6 col-md-3 p-3 d-flex flex-column align-items-center ">
          <div>
            <CiLogin className="stats-icon" />
          </div>
          <h3 className="mt-2 textColor">
            <b>1500 +</b>
          </h3>
          <small>Live Classes</small>
        </div>
        <div className="col-6 col-md-3 p-3 d-flex flex-column align-items-center ">
          <MdClass className="stats-icon" />
          <h3 className="mt-2 textColor">
            <b>30000 +</b>
          </h3>
          <small>Enrolled Students</small>
        </div>
        <div className="col-6 col-md-3 p-3 d-flex flex-column align-items-center">
          <CiCircleList className="stats-icon" />
          <h3 className="mt-2 textColor">
            <b>3000 +</b>
          </h3>
          <small>Students on waitlist</small>
        </div>
        <div className="col-6 col-md-3 p-3 d-flex flex-column align-items-center">
          <CiCircleQuestion className="stats-icon" />
          <h3 className="mt-2 textColor">
            <b>50000 +</b>
          </h3>
          <small>Queries Answered</small>
        </div>
      </div>
    </div>
  );
};

export default Stats;

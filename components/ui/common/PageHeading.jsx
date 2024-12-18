import React from "react";

const PageHeading = ({ title, para }) => {
  return (
    <div style={{ marginTop: "150px" }}>
      <div className="container d-flex flex-column justify-content-center align-items-center ">
        <h1 className="text-center textColor" style={{ fontSize: "40px", fontWeight: "600" }}>
          {title}
        </h1>
        <p className="text-center mb-4 mt-3" style={{ maxWidth: "800px" }}>
          <em>{para}</em>
        </p>
      </div>
    </div>
  );
};

export default PageHeading;

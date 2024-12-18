import React from "react";

const GridImg = ({ src }) => {
  return <img src={src} alt="background" className="position-absolute " style={{ color: "transparent", zIndex: "-1", top: 0, width: "100%" }} />;
};

export default GridImg;

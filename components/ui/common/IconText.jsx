import { Space } from "antd";
import React from "react";

const IconText = ({ Icon, text, onClick }) => (
  <div onClick={onClick} className="d-flex justify-content-center align-items-center gap-2">
    {Icon}
    {text}
  </div>
);

export default IconText;

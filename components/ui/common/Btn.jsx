import { Button } from "antd";
import React from "react";

const Btn = ({ onClick, icon, children, className, loading }) => {
  return (
    <Button className={className} icon={icon} onClick={onClick} loading={loading}>
      {children}
    </Button>
  );
};

export default Btn;

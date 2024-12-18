import React from "react";
import PanelLayout from "../layout";

const AdminLayout = ({ children }) => {
  return <PanelLayout api={"/current-admin"}>{children}</PanelLayout>;
};

export default AdminLayout;

import React from "react";
import PanelLayout from "../layout";

const CMSLayout = ({ children }) => {
  return <PanelLayout api={"/current-cms-user"}>{children}</PanelLayout>;
};

export default CMSLayout;

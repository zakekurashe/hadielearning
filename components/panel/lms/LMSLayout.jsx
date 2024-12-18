import React from "react";
import PanelLayout from "../layout";

const LMSLayout = ({ children }) => {
  return <PanelLayout api={"/current-lms-user"}>{children}</PanelLayout>;
};

export default LMSLayout;

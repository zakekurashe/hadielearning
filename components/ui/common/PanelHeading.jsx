import { styles } from "@/config/styles";
import React from "react";

const PanelHeading = ({ title, para, Icon }) => {
  return (
    <div className="text-start mb-5">
      <h4 className="d-flex justify-content-start align-items-start gap-2" style={{ color: styles.primaryColor }}>
        {Icon} {title}
      </h4>
      <small>{para}</small>
    </div>
  );
};

export default PanelHeading;

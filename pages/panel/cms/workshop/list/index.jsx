import CMSLayout from "@/components/panel/cms/CMSLayout";
import WorkshopListComponent from "@/components/panel/common/WorkshopListComponent";
import PanelHeading from "@/components/ui/common/PanelHeading";
import { Card } from "antd";
import React from "react";
import { BiListUl } from "react-icons/bi";

const WorkshopList = () => {
  return (
    <CMSLayout>
      <Card>
        <PanelHeading Icon={<BiListUl />} title={"Workshops"} />
        <WorkshopListComponent />
      </Card>
    </CMSLayout>
  );
};

export default WorkshopList;

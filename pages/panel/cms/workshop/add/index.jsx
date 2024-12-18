import CMSLayout from "@/components/panel/cms/CMSLayout";
import AddWorkshopComponent from "@/components/panel/common/AddWorkshopComponent";
import PanelHeading from "@/components/ui/common/PanelHeading";
import { Card } from "antd";
import React from "react";
import { MdCreate } from "react-icons/md";

const AddWorkshop = () => {
  return (
    <CMSLayout>
      <Card>
        <PanelHeading Icon={<MdCreate />} title={"Add Workshop"} para={"Note** please upload images just in webp formats"} />
        <AddWorkshopComponent />
      </Card>
    </CMSLayout>
  );
};

export default AddWorkshop;

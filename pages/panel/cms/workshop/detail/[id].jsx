import CMSLayout from "@/components/panel/cms/CMSLayout";
import EditWorkshopComponent from "@/components/panel/common/EditWorkshopComponent";
import PanelHeading from "@/components/ui/common/PanelHeading";
import { Card } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { BiEdit } from "react-icons/bi";

const WorkshopDetail = () => {
  const { id } = useRouter().query;

  return (
    <CMSLayout>
      <Card>
        <PanelHeading Icon={<BiEdit />} title={"Edit Workshop"} para={"Note** please upload images just in webp formats"} />

        <EditWorkshopComponent id={id} />
      </Card>
    </CMSLayout>
  );
};

export default WorkshopDetail;

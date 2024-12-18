import CMSLayout from "@/components/panel/cms/CMSLayout";
import EditBlogComponent from "@/components/panel/common/EditBlogComponent";
import PanelHeading from "@/components/ui/common/PanelHeading";
import { Card } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { BiEdit } from "react-icons/bi";

const BlogDetail = () => {
  const { id } = useRouter().query;
  return (
    <CMSLayout>
      <Card>
        <PanelHeading Icon={<BiEdit />} title="Edit Blog" />
        <EditBlogComponent id={id} />
      </Card>
    </CMSLayout>
  );
};

export default BlogDetail;

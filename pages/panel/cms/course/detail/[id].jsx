import CMSLayout from "@/components/panel/cms/CMSLayout";
import EditCourseComponent from "@/components/panel/common/EditCourseComponent";
import { useRouter } from "next/router";
import React from "react";

const CourseDetails = () => {
  const { id } = useRouter().query;

  return (
    <CMSLayout>
      <EditCourseComponent id={id} />
    </CMSLayout>
  );
};

export default CourseDetails;

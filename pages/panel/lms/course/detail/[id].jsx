import EditCourseComponent from "@/components/panel/common/EditCourseComponent";
import LMSLayout from "@/components/panel/lms/LMSLayout";
import { useRouter } from "next/router";
import React from "react";

const CourseDetails = () => {
  const { id } = useRouter().query;

  return (
    <LMSLayout>
      <EditCourseComponent id={id} />
    </LMSLayout>
  );
};

export default CourseDetails;

import CourseListComponent from "@/components/panel/common/CourseListComponent";
import LMSLayout from "@/components/panel/lms/LMSLayout";
import React from "react";

const CourseList = () => {
  return (
    <LMSLayout>
      <CourseListComponent />
    </LMSLayout>
  );
};

export default CourseList;

import LMSLayout from "@/components/panel/lms/LMSLayout";
import AllStudentList from "@/components/panel/lms/students/AllStudentList";
import PanelHeading from "@/components/ui/common/PanelHeading";
import { Card } from "antd";
import React from "react";
import { BiListCheck } from "react-icons/bi";

const StudentList = () => {
  return (
    <LMSLayout>
      <Card>
        <PanelHeading title={"All Student List"} Icon={<BiListCheck />} />
        <AllStudentList />
      </Card>
    </LMSLayout>
  );
};

export default StudentList;

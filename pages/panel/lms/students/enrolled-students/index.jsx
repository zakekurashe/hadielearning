import LMSLayout from "@/components/panel/lms/LMSLayout";
import PanelHeading from "@/components/ui/common/PanelHeading";
import { useAuth } from "@/context/authContext";
import { Card } from "antd";
import React from "react";
import { BiListCheck } from "react-icons/bi";

const EnrolledStudents = () => {
  const [auth] = useAuth()
  return (
    <LMSLayout>
      <Card>
        <PanelHeading title={"All Student List"} Icon={<BiListCheck />} />
        {auth?.user?.role === 'reader' ? <h5>Sorry you do not have the right to view the data</h5> : "Student list"}
      </Card>
    </LMSLayout>
  );
};

export default EnrolledStudents;

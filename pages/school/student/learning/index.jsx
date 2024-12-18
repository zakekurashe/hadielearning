import { _useCurrentStu } from "@/actions/layouts/useGetUser";
import StuHeader from "@/components/panel/layout/StuHeader";
import AllMyBatches from "@/components/panel/student/AllMyBatches";
import React from "react";

const StudentLearning = () => {
  const { loading } = _useCurrentStu();

  return (
    <>
      <StuHeader />
      {loading ? <p className="mt-100">loading...</p> : <AllMyBatches />}
    </>
  );
};

export default StudentLearning;

import { useAuth } from "@/context/authContext";
import React from "react";

const AllStudentList = () => {
  const [auth] = useAuth()
  return <>
    {auth?.user?.role === 'reader' ? <h5>Sorry you do not have the right to view the data</h5> : "Student list"}
  </>;
};

export default AllStudentList;

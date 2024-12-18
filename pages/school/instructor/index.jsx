import Redirecting from "@/actions/_redirecting";
import useGetUser from "@/actions/layouts/useGetUser";
import AllInstBatches from "@/components/panel/instructor/AllInstBatches";
import InstHeader from "@/components/panel/instructor/InstHeader";
import React from "react";

const Instructor = () => {
  const { loading } = useGetUser("current-teacher");
  return (
    <>
      <InstHeader />
      {loading ? (
        <div className="text-center">
          <Redirecting />
        </div>
      ) : (
        <AllInstBatches />
      )}
    </>
  );
};

export default Instructor;

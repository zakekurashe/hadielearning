// its for student and instructor

import { _useStuInst } from "@/actions/layouts/useGetUser";
import React from "react";
import StuHeader from "./StuHeader";
import Footer from "@/components/ui/common/Footer";
import { useAuth } from "@/context/authContext";
import InstHeader from "../instructor/InstHeader";

const LearningLayout = ({ children }) => {
  const [auth] = useAuth();
  const { loading } = _useStuInst();
  return (
    <>
      {auth?.user?.role === "student" ? <StuHeader /> : auth?.user?.role === "instructor" && <InstHeader />}

      {loading ? <></> : children}

      <Footer />
    </>
  );
};

export default LearningLayout;

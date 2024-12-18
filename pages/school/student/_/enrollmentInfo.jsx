import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import dayjs from "dayjs";
import { API } from "@/config/APIs";
import { useAuth } from "@/context/authContext";

import EnrollmentInfoForm from "@/components/profiles/EnrollmentInfoForm";
import EditProfileLayout from "@/components/panel/layout/EditProfileLayout";

const _enrollmendInfo = {
  phoneNumber: "",
  whatsAppphoneNumber: "",
  dateOfBirth: "",
  gender: "",

  idCard: "",
  address: "",
  city: "",

  parentName: "",
  parentOccupations: "",
  parentPhoneNumber: "",

  interest: "",
  wantToAchieve: "",
};

const EnrollmentInfoComponennt = () => {
  const [auth] = useAuth();

  const [enrollmentInfo, setEnrollmentInfo] = useState(_enrollmendInfo);
  const [loading, setLoading] = useState(false);

  const changeEnrollmentInfo = (e) => {
    const { name, value } = e.target;

    setEnrollmentInfo({ ...enrollmentInfo, [name]: value });
  };

  const gettingMyEnrollmentInfo = async () => {
    try {
      const { data } = await axios.get(`${API}/my-enrollment-info`);
      console.log({ data });
      if (data.ok) {
        for (let key in data.enrollmentInfo) {
          setEnrollmentInfo({ ...data.enrollmentInfo, dateOfBirth: dayjs(data.enrollmentInfo?.dateOfBirth) });
          // console.log(key === "dateOfBirth" ? "yes" : "no");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed, try again", toastPositions);
    }
  };

  useEffect(() => {
    if (auth && auth?.token) {
      gettingMyEnrollmentInfo();
    }
  }, [auth, auth?.token]);

  const submit = async () => {
    setLoading(true);
    try {
      const { data } = await axios.put(`${API}/update-enrollment-info`, { enrollmentInfo });
      if (data.ok) {
        toast.success("Updated", { position: "bottom-center" });
        gettingMyEnrollmentInfo();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed, try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <EditProfileLayout>
      <EnrollmentInfoForm submit={submit} loading={loading} enrollmentInfo={enrollmentInfo} changeEnrollmentInfo={changeEnrollmentInfo} setEnrollmentInfo={setEnrollmentInfo} />
    </EditProfileLayout>
  );
};

export default EnrollmentInfoComponennt;

import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { styles } from "@/config/styles";
import ProfileForm from "@/components/profiles/ProfileForm";
import { validateDates } from "@/config/datesValidations";
import EditProfileLayout from "@/components/panel/layout/EditProfileLayout";
import CertLists from "@/components/profiles/CertList";
import CertEditModal from "@/components/profiles/CertEditModal";
import { useAuth } from "@/context/authContext";
import { API } from "@/config/APIs";

const Certificate = () => {
  const [auth] = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    platform: "",
    from: "",
    to: "",
    current: false,
  });

  const [loading, setLoading] = useState(false);
  const [certList, setCertList] = useState([]);
  const [current, setCurrent] = useState({});
  const [open, setOpen] = useState(false);

  const [formErrors, setFormErrors] = useState({
    from: "",
    to: "",
    current: "",
  });

  const changesFormData = (e) => {
    if (e.target.name !== "current") {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      setFormErrors((prevState) => ({
        ...prevState,
        [e.target.name]: "",
      }));
    } else {
      setFormData({ ...formData, current: !formData.current });
      setFormErrors((prevState) => ({
        ...prevState,
        [e.target.name]: "",
      }));
    }
  };

  const addCerticate = async () => {
    if (!formData.title || !formData.platform) {
      toast.error("Title and platform is requried", styles.toastBootom);
      return;
    }
    if (formErrors.from) {
      return;
    }
    setLoading(true);

    try {
      const { data } = await axios.put(`${API}/add-certificate`, formData);
      // console.log(data);
      if (data.ok) {
        toast.success("Added", styles.toastBootom);
        myCertificate();
      } else if (data.error) {
        toast.error(data.error, styles.toastBootom);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed, try again", styles.toastBootom);
    } finally {
      setLoading(false);
    }
  };

  const myCertificate = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/my-certificates`);
      if (data.ok) {
        setCertList(data.certificates);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed, try again", styles.toastBootom);
    } finally {
      setLoading(false);
    }
  };

  const deleteCertificate = async (x) => {
    setLoading(true);
    try {
      const { data } = await axios.put(`${API}/delete-certificate`, { _id: x });
      if (data.ok) {
        toast.success("Removed", styles.toastBootom);
        setCertList(certList.filter((i) => i._id !== x));
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed, try again", styles.toastBootom);
    } finally {
      setLoading(false);
    }
  };

  const editCertificate = async (datas) => {
    setLoading(true);

    const newData = {
      ...datas,
      from: datas?.from ? datas?.from : current.from,
      to: datas?.to ? datas?.to : current.to,
    };

    try {
      const { data } = await axios.put(`http://localhost:5000/api/edit-certificate`, newData);
      // console.log(data);
      if (data.ok) {
        toast.success("Updated", styles.toastBootom);
        setOpen(false);
        myCertificate();
      } else if (data.error) {
        toast.error(data.error, styles.toastBootom);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed, try again", styles.toastBootom);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth && auth?.token) {
      myCertificate();
    }
  }, [auth, auth?.token]);

  useEffect(() => {
    const errorMsgs = validateDates(formData.from, formData.to, formData.current);
    if (Object.keys(errorMsgs).length > 0) {
      setFormErrors(errorMsgs);
      return;
    }
  }, [formData.from, formData.to, formData.current, formData]);

  return (
    <EditProfileLayout>
      <ProfileForm
        setFormData={setFormData}
        title="Certificates"
        loading={loading}
        addFunc={addCerticate}
        formErrors={formErrors}
        which={"cert"}
        formData={formData}
        changesFormData={changesFormData}
      />

      <CertLists from="editing-page" certData={certList} deleteCertificate={deleteCertificate} setCurrent={setCurrent} setOpen={setOpen} />

      <CertEditModal open={open} setOpen={setOpen} current={current} editCertificate={editCertificate} loading={loading} />
    </EditProfileLayout>
  );
};

export default Certificate;

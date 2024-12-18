import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "@/context/authContext";
import { API } from "@/config/APIs";
import { styles } from "@/config/styles";
import ProfileForm from "@/components/profiles/ProfileForm";
import { validateDates } from "@/config/datesValidations";
import EduList from "@/components/profiles/EduList";
import EducationEditModal from "@/components/profiles/EducationEditModal";
import EditProfileLayout from "@/components/panel/layout/EditProfileLayout";

const Education = () => {
  const [auth] = useAuth();
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    to: "",
    from: "",
    current: false,
    description: "",
  });

  const [formErrors, setFormErrors] = useState({
    from: "",
    to: "",
    current: "",
  });

  const [loading, setLoading] = useState(false);
  const [eduList, setEduList] = useState([]);
  const [current, setCurrent] = useState({});
  const [open, setOpen] = useState(false);

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

  const addEducation = async () => {
    if (formErrors.from) {
      return;
    }
    if (!formData.school || !formData.degree) {
      toast.error("School and degree is requried", styles.toastBootom);
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.put(`${API}/add-education`, formData);
      // console.log(data);
      if (data.ok) {
        toast.success("Added", styles.toastBootom);
        myEducation();
        // setEduList([...eduList, data.education]);
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

  const myEducation = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/my-education`);
      if (data.ok) {
        setEduList(data.education);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed, try again", styles.toastBootom);
    } finally {
      setLoading(false);
    }
  };

  const deleteEducation = async (x) => {
    setLoading(true);
    try {
      const { data } = await axios.put(`${API}/delete-education`, { _id: x });
      if (data.ok) {
        toast.success("Removed", styles.toastBootom);
        setEduList(eduList.filter((i) => i._id !== x));
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed, try again", styles.toastBootom);
    } finally {
      setLoading(false);
    }
  };

  const EditEdu = async (datas) => {
    setLoading(true);

    const newData = {
      ...datas,
      from: datas?.from ? datas?.from : current.from,
      to: datas?.to ? datas?.to : current.to,
    };
    try {
      const { data } = await axios.put(`${API}/edit-education`, newData);
      // console.log(data);
      if (data.ok) {
        toast.success("Updated", styles.toastBootom);
        setOpen(false);
        myEducation();
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
    const errorMsgs = validateDates(formData.from, formData.to, formData.current);
    if (Object.keys(errorMsgs).length > 0) {
      setFormErrors(errorMsgs);
      return;
    }
  }, [formData.from, formData.to, formData.current]);

  useEffect(() => {
    if (auth && auth?.token) {
      myEducation();
    }
  }, [auth, auth?.token]);

  return (
    <EditProfileLayout>
      <ProfileForm
        setFormData={setFormData}
        title="Education"
        which={"edu"}
        formData={formData}
        changesFormData={changesFormData}
        addFunc={addEducation}
        loading={loading}
        formErrors={formErrors}
      />

      {/* list of educations */}
      <EduList from="editing-page" eduList={eduList} deleteEducation={deleteEducation} setCurrent={setCurrent} setOpen={setOpen} />

      <EducationEditModal open={open} setOpen={setOpen} current={current} EditEdu={EditEdu} loading={loading} />
    </EditProfileLayout>
  );
};

export default Education;

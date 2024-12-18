import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import ProfileForm from "@/components/profiles/ProfileForm";
import EditProfileLayout from "@/components/panel/layout/EditProfileLayout";
import ProjectList from "@/components/profiles/ProjectList";
import { API } from "@/config/APIs";
import { useAuth } from "@/context/authContext";
import ProjectEditModal from "@/components/profiles/ProjectEditModal";
import { validateDates } from "@/config/datesValidations";
import { styles } from "@/config/styles";

const Portfolio = () => {
  const [auth] = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    to: "",
    from: "",
    current: false,
    description: "",
    link: "",
  });

  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(false);
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

  const addProject = async () => {
    if (!formData.title) {
      toast.error("Title is requried", styles.toastBootom);
      return;
    }
    if (formErrors.from) {
      return;
    }
    setLoading(true);

    try {
      const { data } = await axios.put(`${API}/add-project`, formData);
      // console.log(data);
      if (data.ok) {
        toast.success("Added", styles.toastBootom);
        myPortfolio();
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

  const myPortfolio = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/my-portfolio`);
      if (data.ok) {
        setProjectData(data.portfolio);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed, try again", styles.toastBootom);
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (x) => {
    setLoading(true);
    try {
      const { data } = await axios.put(`${API}/delete-project`, { _id: x });
      if (data.ok) {
        toast.success("Removed", styles.toastBootom);
        setProjectData(projectData.filter((i) => i._id !== x));
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed, try again", styles.toastBootom);
    } finally {
      setLoading(false);
    }
  };

  const EditProject = async (datas) => {
    setLoading(true);

    const newData = {
      ...datas,
      from: datas?.from ? datas?.from : current.from,
      to: datas?.to ? datas?.to : current.to,
    };
    try {
      const { data } = await axios.put(`${API}/edit-portfolio`, newData);
      // console.log(data);
      if (data.ok) {
        toast.success("Updated", styles.toastBootom);
        setOpen(false);
        myPortfolio();
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
      myPortfolio();
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
        title={"Portfolio"}
        loading={loading}
        formData={formData}
        changesFormData={changesFormData}
        addFunc={addProject}
        formErrors={formErrors}
        which={"port"}
      />

      <ProjectList projectData={projectData} from={"editing-page"} deleteProject={deleteProject} setCurrent={setCurrent} setOpen={setOpen} />

      <ProjectEditModal current={current} loading={loading} EditProject={EditProject} open={open} setOpen={setOpen} />
    </EditProfileLayout>
  );
};

export default Portfolio;

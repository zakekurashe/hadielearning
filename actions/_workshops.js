import { API } from "@/config/APIs";
import { useAuth } from "@/context/authContext";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useCreateWorkshop = () => {
  const [loading, setLoading] = useState(false);

  const createSubmit = async (_api, values) => {
    if (
      !values.breadTitle ||
      !values.title ||
      !values.content ||
      !values.outlines ||
      // !values.image ||
      !values.conclusion ||
      !values.dateAndTime ||
      !values.instructor ||
      !values.zoomLink ||
      !values.meetingId ||
      !values.pascodeId ||
      !values.meetingTiming ||
      !values.tags ||
      values.categories.length === 0
    ) {
      toast.error("All Fields are required**", { position: "bottom-center" });
      return;
    }

    const formData = new FormData();
    formData.append("breadTitle", values.breadTitle);
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("outlines", values.outlines);
    // formData.append("image", values.image);
    formData.append("conclusion", values.conclusion);
    formData.append("dateAndTime", values.dateAndTime);
    formData.append("instructor", values.instructor);
    formData.append("zoomLink", values.zoomLink);
    formData.append("meetingId", values.meetingId);
    formData.append("pascodeId", values.pascodeId);
    formData.append("meetingTiming", values.meetingTiming);
    formData.append("tags", values.tags);
    values.categories.forEach((category) => {
      formData.append("categories", category);
    });

    if (values?.preImage) {
      console.log("from  pre image");
    }

    if (values?.image) {
      // console.log(values?.image);
      formData.append("image", values.image);
    }

    try {
      setLoading(true);

      const { data } = await axios.post(`${API}/${_api}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.error) {
        toast.error(data.error, { position: "bottom-center" });
        setLoading(false);
      } else {
        toast.success("Action is done successfully", {
          position: "bottom-center",
        });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return { createSubmit, loading };
};

export const useWorkshop = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [auth] = useAuth();

  const fetchingAllWorkshops = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API}/admin-workshops`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setList(data.allworkshops);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth && auth.token) fetchingAllWorkshops();
  }, [auth && auth.token]);

  const deleteWorkshop = async (id) => {
    try {
      let ok = window?.confirm("Are you sure?");
      if (ok) {
        const { data } = await axios.delete(`${API}/delete/workshop/${id}`, {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });
        fetchingAllWorkshops();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const disableWorkshop = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${API}/workshop/show-or-not/${id}`,
        { showOrNot: false },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      if (data.ok) {
        setLoading(false);
        toast.success("Workshop has been disable");
        fetchingAllWorkshops();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Try again");
    }
  };

  const enableWorkshop = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${API}/workshop/show-or-not/${id}`,
        { showOrNot: true },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      if (data.ok) {
        setLoading(false);
        toast.success("Workshop has been disable");
        fetchingAllWorkshops();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Try again");
    }
  };

  return { list, loading, deleteWorkshop, disableWorkshop, enableWorkshop };
};

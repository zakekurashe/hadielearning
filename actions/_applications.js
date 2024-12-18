import { useEffect, useState } from "react";
import { API } from "@/config/APIs";
import axios from "axios";
import toast from "react-hot-toast";

export const _fetchWorkshopOrCourse = (enrollToSelect) => {
  const [list, setList] = useState([]);
  const [listLoading, setListLoading] = useState(false);

  const fetchingCourses = async () => {
    setListLoading(true);
    try {
      const { data } = await axios.get(`${API}/courses-form`);
      if (data.courses) {
        setList(data.courses);
      }
    } catch (error) {
      toast.error("Failed, try again");
    } finally {
      setListLoading(false);
    }
  };

  const fetchingWorkshops = async () => {
    setListLoading(true);
    try {
      // const { data } = await axios.get(`${API}/workshops-form`);
      const { data } = await axios.get(`${API}/workshopfilters`);
      if (data._workshops) {
        setList(data._workshops);
      }
    } catch (error) {
      toast.error("Failed, try again");
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    if (enrollToSelect === "workshop") {
      fetchingWorkshops();
    } else if (enrollToSelect === "program") {
      fetchingCourses();
    }
  }, [enrollToSelect]);

  return { fetchingCourses, fetchingWorkshops, list, listLoading };
};

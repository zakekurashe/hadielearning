import { API } from "@/config/APIs";
import { useAuth } from "@/context/authContext";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// valid for all cms, lmd admins users
export const useAdminCourses = () => {
  const [loading, setLoading] = useState(false);

  const createSubmit = async (_api, values) => {
    console.log(
      "state",
      // values.title,
      // values.overview,
      // values.lectures,
      // values.whyUs,
      // values.prerequisites,
      // values.benefits,
      // values.marketValue,
      // values.courseFor,
      // values.duration,
      // values.classes,
      // values.timming,
      // values.startingFrom,
      // values.regFee,
      // values.courseFee,
      // values.image,
      // values.instructor,
      // { categories: values.categories },
      values.faqs,
      "here"
    );

    if (
      !values.title ||
      !values.overview ||
      !values.lectures ||
      !values.whyUs ||
      !values.prerequisites ||
      !values.benefits ||
      !values.marketValue ||
      !values.courseFor ||
      !values.duration ||
      !values.timming ||
      !values.startingFrom ||
      !values.image ||
      !values.instructor ||
      values.categories.length === 0 ||
      values.faqs.length === 0 ||
      !values.seoTitle ||
      !values.metaDescription
    ) {
      toast.error("All Fields are required**", { position: "bottom-center" });
      return;
    }

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("overview", values.overview);
    formData.append("whyUs", values.whyUs);
    formData.append("prerequisites", values.prerequisites); // Assuming `image` is the File object from an input type="file"
    formData.append("benefits", values.benefits);
    formData.append("marketValue", values.marketValue);
    formData.append("courseFor", values.courseFor);
    formData.append("duration", values.duration);
    formData.append("classes", values.classes);
    formData.append("timming", values.timming);
    formData.append("startingFrom", values.startingFrom);
    formData.append("regFee", values.regFee);
    formData.append("courseFee", values.courseFee);
    formData.append("image", values.image);
    formData.append("instructor", values.instructor);
    formData.append("monday", values.days.monday);
    formData.append("tuesday", values.days.tuesday);
    formData.append("wednesday", values.days.wednesday);
    formData.append("thursday", values.days.thursday);
    formData.append("friday", values.days.friday);
    formData.append("saturday", values.days.saturday);
    formData.append("seoTitle", values.seoTitle);
    formData.append("metaDescription", values.metaDescription);

    values.lectures.forEach((obj, index) => {
      formData.append(`lectures[${index}][title]`, obj.title);
      formData.append(`lectures[${index}][details]`, obj.details);
    });

    values.faqs.forEach((obj, index) => {
      formData.append(`faqs[${index}][answer]`, obj.answer);
      formData.append(`faqs[${index}][question]`, obj.question);
    });

    values.categories.forEach((category) => {
      formData.append("categories", category);
    });

    try {
      setLoading(true);
      const { data } = await axios.post(`${API}/${_api}`, formData);
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

export const useCourseList = () => {
  const [auth] = useAuth();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchingAllCourses = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API}/admin-courses`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setList(data.courses);
      // console.log(data.courses, "here");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const deleteCourse = async (id) => {
    try {
      let ok = window?.confirm("Are you sure?");
      if (ok) {
        const { data } = await axios.delete(`${API}/delete/course/${id}`, {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });
        fetchingAllCourses();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const disableCourse = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${API}/show-or-not/${id}`,
        { showOrNot: false },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      console.log(data);
      if (data.ok) {
        setLoading(false);
        toast.success("Course has been disable");
        fetchingAllCourses();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Try again");
    }
  };

  const enableCourse2 = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${API}/show-or-not-2/${id}`,
        { showOrNot: true },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      console.log(data);
      if (data.ok) {
        setLoading(false);
        toast.success("Course has been disable");
        fetchingAllCourses();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Try again");
    }
  };

  const disableCourse2 = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${API}/show-or-not-2/${id}`,
        { showOrNot: false },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      console.log(data);
      if (data.ok) {
        setLoading(false);
        toast.success("Course has been disable");
        fetchingAllCourses();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Try again");
    }
  };

  const enableCourse = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${API}/show-or-not/${id}`,
        { showOrNot: true },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      console.log(data);
      if (data.ok) {
        setLoading(false);
        toast.success("Course has been disable");
        fetchingAllCourses();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Try again");
    }
  };

  useEffect(() => {
    if (auth && auth.token) fetchingAllCourses();
  }, [auth && auth.token]);

  return { list, loading, deleteCourse, disableCourse, enableCourse2, disableCourse2, enableCourse };
};

export const _useCourseShort = () => {
  const [loading, setLoading] = useState(false);
  const [shorts, setShorts] = useState([]);

  useEffect(() => {
    getAllCourses();
  }, []);

  const getAllCourses = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API}/courses-form`);
      setShorts(data.courses);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, shorts };
};

"use client";

import { API } from "@/config/APIs";
import { useAuth } from "@/context/authContext";
import { Card } from "antd";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import CourseForm from "./course/CourseForm";
import PanelHeading from "@/components/ui/common/PanelHeading";
import { EditFilled } from "@ant-design/icons";
import { useAdminCourses } from "@/actions/_course";
import toast from "react-hot-toast";

const initDays = {
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
};

const initValues = {
  title: "",
  overview: "",
  whyUs: "",
  prerequisites: "",
  benefits: "",
  marketValue: "",
  courseFor: "",
  duration: "",
  classes: 0,
  timming: "",
  startingFrom: "",
  regFee: 0,
  courseFee: 0,
  days: initDays,
  image: "",
  instructor: "",
  preImage: "",
};

const EditCourseComponent = ({ id }) => {
  const [auth] = useAuth();
  const authToken = auth && auth.token;
  const [_values, _setValues] = useState(initValues);
  const [singleLoading, setSingleLoading] = useState(false);
  const [lectures, setLectures] = useState([]);
  const [cats, setCats] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const { createSubmit, loading } = useAdminCourses();

  const fetchSingleCourse = useCallback(async () => {
    try {
      setSingleLoading(true);

      const { data } = await axios.get(`${API}/admin/edit/course/${id}`);
      _setValues(data);
      _setValues((prev) => ({ ...prev, preImage: data?.image }));
      _setValues((prev) => ({ ...prev, image: "" }));
      // console.log({ data });
      _setValues((prev) => ({
        ...prev,
        days: {
          ...prev.days,
          monday: data?.monday,
          tuesday: data?.tuesday,
          wednesday: data?.wednesday,
          thursday: data?.thursday,
          friday: data?.friday,
          saturday: data?.saturday,
        },
      }));

      let arr = [];
      data?.categories.map((c) => arr.push(c.name));
      setCats(arr);
      setLectures(data?.lectures);
      setFaqs(data?.faqs);

      setSingleLoading(false);
    } catch (error) {
      setSingleLoading(false);
      console.log(error);
    }
  }, [id && authToken])

  useEffect(() => {
    if (id && authToken) {
      fetchSingleCourse();
    }
  }, [fetchSingleCourse]);

  // functions that can be in one place

  const changeHandler = (e) => {
    if (e.target.files) {
      // Update the state with the new file
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 1024 * 1024) { // 1MB limit
        toast.error('Image size must be less than 1MB');
        return;
      }
      _setValues((prevValues) => ({ ...prevValues, image: e.target.files[0] }));
    } else {
      // For other inputs, update the state normally
      const { name, value } = e.target;
      _setValues((prevValues) => ({ ...prevValues, [name]: value }));
    }
  };

  const handleAddLecture = (e) => {
    e.preventDefault();
    setLectures([...lectures, { title: "", details: "" }]);
  };

  const handleAddFaqs = (e) => {
    e.preventDefault();
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  const handleLectureChange = (index, e) => {
    const { name, value } = e.target;
    const updatedLectures = [...lectures];
    updatedLectures[index][name] = value;
    setLectures(updatedLectures);
  };

  const handleFaqsChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFaqs = [...faqs];
    updatedFaqs[index][name] = value;
    setFaqs(updatedFaqs);
  };

  const handleRemoveLecture = (index) => {
    const updatedLectures = [...lectures];
    updatedLectures.splice(index, 1);
    setLectures(updatedLectures);
  };

  const handleRemoveFAQs = (index) => {
    const updatedFAQs = [...faqs];
    updatedFAQs.splice(index, 1);
    setFaqs(updatedFAQs);
  };


  console.log(faqs, "here are the faqs")

  return (
    <Card>
      <PanelHeading Icon={<EditFilled />} title={"Course Edit"} para={"Note** please upload just webp images, that will benifical for hadi elearning website."} />
      {singleLoading && <div className="text-center my-4">please wait...</div>}

      <CourseForm
        courseId={id}
        from="course-edit"
        changeHandler={changeHandler}
        _values={_values}
        _setValues={_setValues}
        faqs={faqs}
        handleAddFaqs={handleAddFaqs}
        handleRemoveFAQs={handleRemoveFAQs}
        handleFaqsChange={handleFaqsChange}
        lectures={lectures}
        handleAddLecture={handleAddLecture}
        handleRemoveLecture={handleRemoveLecture}
        handleLectureChange={handleLectureChange}
        submitHandler={createSubmit}
        submitLoading={loading}
        cats={cats}
        setCats={setCats}
      />
    </Card>
  );
};

export default EditCourseComponent;

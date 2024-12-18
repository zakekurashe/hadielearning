import { Card } from "antd";
import React, { useState } from "react";
import CourseForm from "./course/CourseForm";
import PanelHeading from "@/components/ui/common/PanelHeading";
import { BiPlus } from "react-icons/bi";
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
  seoTitle: "",
  metaDescription: "",
};

const AddCourseComponent = () => {
  const [_values, _setValues] = useState(initValues);
  const [lectures, setLectures] = useState([]);
  const [cats, setCats] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const { createSubmit, loading } = useAdminCourses();

  const changeHandler = (e) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 1024 * 1024) { // 1MB limit
        toast.error('Image size must be less than 1MB');
        return;
      }
      // Update the state with the new file
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

  return (
    <Card>
      <PanelHeading Icon={<BiPlus />} title="Add Course" para={""} />
      <CourseForm
        from="course-create"
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

export default AddCourseComponent;

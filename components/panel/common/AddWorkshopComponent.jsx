import React, { useState } from "react";
import WorkshopForm from "./workshop/WorkshopForm";
import { useCreateWorkshop } from "@/actions/_workshops";
import toast from "react-hot-toast";


const initValues = {
  title: "",
  breadTitle: "",
  content: "",
  outlines: "",
  image: "",
  conclusion: "",
  dateAndTime: new Date(),
  instructor: "",
  zoomLink: "",
  meetingId: "",
  pascodeId: "",
  meetingTiming: "",
  tags: "",
};

const AddWorkshopComponent = () => {
  const [_values, _setValues] = useState(initValues);
  const { createSubmit, loading } = useCreateWorkshop();
  const [cats, setCats] = useState([]);

  const handleChange = (e) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 1024 * 1024) { // 1MB limit
        toast.error('Image size must be less than 1MB');
        return;
      }
      _setValues((prev) => ({ ...prev, image: e.target.files[0] }));
    } else {
      const { name, value } = e.target;
      _setValues((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <>
      <WorkshopForm
        handleSubmit={createSubmit}
        loading={loading}
        from="workshop-create"
        handleChange={handleChange}
        _values={_values}
        _setValues={_setValues}
        cats={cats}
        setCats={setCats}
      />
    </>
  );
};

export default AddWorkshopComponent;

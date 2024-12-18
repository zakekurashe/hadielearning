"use client";

import { useCreateWorkshop } from "@/actions/_workshops";
import { API } from "@/config/APIs";
import { useAuth } from "@/context/authContext";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import WorkshopForm from "./workshop/WorkshopForm";
import toast from "react-hot-toast";

const initValues = {
  title: "",
  breadTitle: "",
  content: "",
  outlines: "",
  conclusion: "",
  dateAndTime: "",
  instructor: "",
  zoomLink: "",
  meetingId: "",
  pascodeId: "",
  meetingTiming: "",
  tags: "",
  image: "",
  preImage: "",
};

const EditWorkshopComponent = ({ id }) => {
  const [auth] = useAuth();
  const authToken = auth && auth?.token;
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

  const fetchSingleWorkshop = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API}/admin/edit/workshop/${id}`);
      _setValues(data);
      _setValues((prev) => ({ ...prev, preImage: data?.image }));
      _setValues((prev) => ({ ...prev, image: "" }));

      let arr = [];
      data.categories.map((c) => arr.push(c.name));
      setCats(arr);
      // if (Array.isArray(data?.tags)) setTags(data?.tags.join(", "));

    } catch (error) {
      console.log(error);
    }
  }, [authToken, id]);

  useEffect(() => {
    if (id && authToken) {
      fetchSingleWorkshop();
    }
  }, [fetchSingleWorkshop]);

  return (
    <WorkshopForm
      handleSubmit={createSubmit}
      loading={loading}
      from="workshop-edit"
      handleChange={handleChange}
      _values={_values}
      _setValues={_setValues}
      cats={cats}
      setCats={setCats}
      workshopId={id}
    />
  );
};

export default EditWorkshopComponent;

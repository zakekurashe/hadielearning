"use client";

import { useCategory } from "@/actions/_category";
import { useTeachers } from "@/actions/_usersTable";
import CatsAlert from "@/components/ui/common/CatsAlert";
import { toImageUrl } from "@/config/APIs";
import { Button, DatePicker, Select } from "antd";
import moment from "moment";
import dynamic from "next/dynamic";
import React, { useMemo, useState } from "react";
import "react-quill/dist/quill.snow.css";
import DateTimePicker from "react-datetime-picker";


import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';



const WorkshopForm = ({ _values, _setValues, handleChange, cats, setCats, from, loading, handleSubmit, workshopId }) => {
  const Editor = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);
  const { categoriesList } = useCategory();
  const { instLoading, teachers } = useTeachers();

  const removeImage = () => _setValues((prev) => ({ ...prev, image: "" }));

  const handleDateChange = (date) => {
    _setValues((prev) => ({ ...prev, dateAndTime: date }));
  };

  return (
    <>
      {/* {JSON.stringify(_values.image)} */}
      <div className="form-group py-2">
        <label for="exampleFormControlInput1"> Breadcrumb Title</label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          name="breadTitle"
          placeholder="Breadcrumb Title"
          value={_values.breadTitle}
          onChange={handleChange}
        />
      </div>

      <div className="form-group py-2">
        <label for="exampleFormControlInput1"> Workshop Title</label>
        <input type="text" className="form-control" id="exampleFormControlInput1" name="title" placeholder="Workshop Title" value={_values.title} onChange={handleChange} />
      </div>

      <div className="form-group py-2">
        <label for="exampleFormControlInput1"> Workshop Image</label>
        <input
          // onChange={handleImage}
          onChange={handleChange}
          type="file"
          accept="images/*"
          className="form-control"
          id="exampleFormControlInput1"
        />
      </div>
      <small className="form-text">Please upload image within 1mb, formet jpg,jpeg,webp</small>
      {/* {loadingImage && "loading..."} */}

      {from === "workshop-create" && _values.image && (
        <div className="form-group py-2">
          <img width="auto" height={300} src={URL.createObjectURL(_values.image)} onClick={removeImage} />
          <br />
          <small>Just click on image to remove.</small>
        </div>
      )}

      {from === "workshop-edit" && _values.preImage && (
        <div className="form-group py-2">
          {_values.preImage?.url.includes("uploads") ? (
            _values.preImage?.url && <img width="auto" height={300} src={toImageUrl(_values.preImage?.url)} onClick={() => _setValues((prev) => ({ ...prev, preImage: "" }))} />
          ) : (
            <img width="auto" height={300} src={_values.preImage?.url} onClick={() => _setValues((prev) => ({ ...prev, preImage: "" }))} />
          )}

          <br />
          <small>Just click on image to remove.</small>
        </div>
      )}

      {from === "workshop-edit" && (
        <>
          {_values?.image && (
            <div className="form-group py-2">
              <img width="auto" height={300} src={window?.URL.createObjectURL(_values?.image)} onClick={() => _setValues((prevValues) => ({ ...prevValues, image: "" }))} />
              <br />
              <small>Just click on image to remove.</small>
            </div>
          )}

          {_values.preImage?.url && <>{JSON.stringify(toImageUrl(_values.preImage?.url))}</>}
        </>
      )}

      <hr />

      <div className="form-group py-2">
        <label for="exampleFormControlInput1">Overview</label>
        <Editor placeholder="Overview" value={_values.content} onChange={(e) => _setValues((prev) => ({ ...prev, content: e }))} />
      </div>

      <div className="form-group py-2">
        <label for="exampleFormControlInput1">Outlines</label>
        <Editor placeholder="Outlines" value={_values.outlines} onChange={(e) => _setValues((prev) => ({ ...prev, outlines: e }))} />
      </div>

      <div className="form-group py-2">
        <label for="exampleFormControlInput1">Conclusion</label>
        <textarea className="form-control" type="text" id="exampleFormControlInput1" name="conclusion" value={_values.conclusion} onChange={handleChange} />
      </div>

      <div className="form-group py-2">
        <label for="exampleFormControlInput1">Date and Time</label>





        <DateTimePicker
          type="date"
          className="form-control"

          name="dateAndTime"
          value={_values?.dateAndTime}
          onChange={handleDateChange}
        />
      </div>
      {instLoading && "loading..."}
      <div className="form-group py-2">
        <label for="exampleFormControlInput1">Select Instructor</label>
        <select value={_values.instructor} onChange={handleChange} className="form-control" name="instructor">
          <option>* Select Instructor</option>
          {teachers?.map((x, index) => (
            <option key={index} value={x._id}>
              {x.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group py-2">
        <label for="exampleFormControlInput1">Popular Tags</label>
        <input type="text" className="form-control" placeholder="Tags" name="tags" value={_values.tags} onChange={handleChange} />
        <small className="form-text">Please use comma separated values (eg. #TREND,#DESIGNING,#JAVASCRIPT,#EARNING,#EDUCATION)</small>
      </div>

      <hr />

      <div className="form-group py-2">
        <label for="exampleFormControlInput1">Zoom Link</label>
        <input className="form-control" type="text" id="exampleFormControlInput1" name="zoomLink" value={_values.zoomLink} onChange={handleChange} />
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="form-group py-2">
            <label for="exampleFormControlInput1">Meeting Id</label>
            <input className="form-control" type="text" id="exampleFormControlInput1" name="meetingId" value={_values.meetingId} onChange={handleChange} />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group py-2">
            <label for="exampleFormControlInput1">Passcode Id</label>
            <input className="form-control" type="text" id="exampleFormControlInput1" name="pascodeId" value={_values.pascodeId} onChange={handleChange} />
          </div>
        </div>
      </div>

      <div className="form-group py-2">
        <label for="exampleFormControlInput1">Meeting Timing And Date</label>
        <input
          className="form-control"
          type="text"
          id="exampleFormControlInput1"
          placeholder="May 22nd, 2023 | 7:00 PM"
          name="meetingTiming"
          value={_values.meetingTiming}
          onChange={handleChange}
        />
      </div>

      <div className="form-group py-2">
        {cats?.length === 0 || cats.length === 1 && <CatsAlert />}
        <label for="exampleFormControlInput1">Categories</label>
        <Select mode="multiple" allowClear style={{ width: "100%" }} placeholder="Please select" onChange={(v) => setCats(v)}>
          {categoriesList.map((item) => (
            <Select.Option key={item.name}>{item.name}</Select.Option>
          ))}
        </Select>
      </div>

      <br />
      <br />

      <Button
        loading={loading}
        onClick={() => {
          from === "workshop-edit"
            ? handleSubmit(`edit-workshop/${workshopId}`, { ..._values, categories: cats })
            : from === "workshop-create" && handleSubmit("create-workshop", { ..._values, categories: cats });
        }}
      >
        Submit
      </Button>
    </>
  );
};

export default WorkshopForm;

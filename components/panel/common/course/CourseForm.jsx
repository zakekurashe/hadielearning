import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useCategory } from "@/actions/_category";
import { useTeachers } from "@/actions/_usersTable";
import { Button, Divider, Select } from "antd";
import { BiPlus } from "react-icons/bi";
import { toImageUrl } from "@/config/APIs";
import CatsAlert from "@/components/ui/common/CatsAlert";

const CourseForm = ({
  changeHandler,
  _values,
  _setValues,

  faqs,
  handleAddFaqs,
  handleRemoveFAQs,
  handleFaqsChange,
  lectures,
  handleAddLecture,
  handleRemoveLecture,
  handleLectureChange,
  submitHandler,
  submitLoading,
  cats,
  setCats,
  from,
  courseId,
}) => {
  const Editor = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);
  const { categoriesList } = useCategory();
  const { instLoading, teachers } = useTeachers();

  return (
    <>
      <Divider>SEO</Divider>
      <div className="form-group py-2">
        <label for="exampleFormControlInput1">SEO Title</label>
        <input
          type="text"
          className="form-control"
          name="seoTitle"
          placeholder="SEO Title"
          value={_values?.seoTitle}
          onChange={changeHandler}
        />
      </div>


      <div className="form-group py-2">
        <label for="exampleFormControlInput1">Meta Description</label>
        <input
          type="text"
          className="form-control"
          name="metaDescription"
          placeholder="Meta Description"
          value={_values?.metaDescription}
          onChange={changeHandler}
        />
      </div>


      <Divider>Course Data</Divider>

      <div className="form-group py-2">
        <label for="exampleFormControlInput1">Course Title</label>
        <input
          type="text"
          className="form-control"
          name="title"
          placeholder="Course Title - ... Mastery Course "
          value={_values?.title}
          onChange={changeHandler}
        />
      </div>

      <div className="form-group py-2">
        <label for="exampleFormControlInput1">Course Image</label>
        <input
          onChange={changeHandler}
          type="file"
          accept="images/*"
          // hidden
          className="form-control"
        />
      </div>

      {from === "course-create" && _values?.image && (
        <div className="form-group py-2">
          <img width="auto" height={300} src={URL?.createObjectURL(_values?.image)} onClick={() => _setValues((prevValues) => ({ ...prevValues, image: "" }))} />
          <br />
          <small>Just click on image to remove.</small>
        </div>
      )}

      {from === "course-edit" && _values.preImage && (
        <div className="form-group py-2">
          {_values.preImage?.url.includes("courseImages") ? (
            _values.preImage?.url && <img width="auto" height={300} src={toImageUrl(_values.preImage?.url)} onClick={() => _setValues((prev) => ({ ...prev, preImage: "" }))} />
          ) : (
            <img width="auto" height={300} src={_values.preImage?.url} onClick={() => _setValues((prev) => ({ ...prev, preImage: "" }))} />
          )}

          <br />
          <small>Just click on image to remove.</small>
        </div>
      )}

      {from === "course-edit" && (
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

      <div className="form-group py-2">
        <label for="exampleFormControlInput1">Overview</label>
        <Editor placeholder="Overview of the coruse" name="overview" value={_values.overview} onChange={(e) => _setValues((pre) => ({ ...pre, overview: e }))} />
      </div>

      <div className="form-group py-2">
        <label for="exampleFormControlInput1">Why us</label>
        <Editor placeholder="" value={_values.whyUs} name="whyUs" onChange={(e) => _setValues((pre) => ({ ...pre, whyUs: e }))} />
      </div>

      <div className="form-group py-2">
        <label for="exampleFormControlInput1">Eligibility</label>
        <Editor
          type="text"
          name="prerequisites"
          placeholder="Prerequisites of the course"
          value={_values.prerequisites}
          onChange={(e) => _setValues((pre) => ({ ...pre, prerequisites: e }))}
        />
      </div>

      <div className="form-group py-2">
        <label for="exampleFormControlInput1">Benefits</label>
        <Editor
          type="text"
          name="benefits"
          placeholder="Benefits of the course"
          value={_values.benefits}
          onChange={(e) => _setValues((pre) => ({ ...pre, benefits: e }))}
        />
      </div>

      <div className="form-group py-2">
        <label for="exampleFormControlInput1">Scope</label>

        <Editor
          type="text"
          // className="form-control"
          name="marketValue"
          value={_values.marketValue}
          onChange={(e) => _setValues((pre) => ({ ...pre, marketValue: e }))}
        />
      </div>

      <div className="form-group py-2">
        <label for="exampleFormControlInput1">Who this course is for:</label>
        <textarea
          type="text"
          className="form-control"
          name="courseFor"
          placeholder="Who this course is for:"
          value={_values.courseFor}
          onChange={changeHandler}
        />
      </div>

      <div className="row py-3">
        <div className="col-md-6">
          <div className="form-group py-2">
            <label for="exampleFormControlInput1"> Durations</label>
            <input
              type="text"
              className="form-control"
              name="duration"
              placeholder="Duration - 3 months"
              value={_values.duration}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group py-2">
            <label for="exampleFormControlInput1"> Classes</label>
            <input
              type="number"
              className="form-control"
              name="classes"
              placeholder="Classes - 36 "
              value={_values.classes}
              onChange={changeHandler}
            />
          </div>
        </div>
      </div>

      <div className="row py-3">
        <div className="col-md-6">
          <div className="form-group py-2">
            <label for="exampleFormControlInput1"> Timing</label>
            <input
              type="text"
              className="form-control"
              name="timming"
              placeholder="Batch timing - 4 PM to 5:30 PM"
              value={_values.timming}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group py-2">
            <label for="exampleFormControlInput1"> Starting From</label>
            <input
              type="text"
              className="form-control"
              name="startingFrom"
              placeholder="Starting From - June 1st, 2023 "
              value={_values.startingFrom}
              onChange={changeHandler}
            />
          </div>
        </div>
      </div>

      <div className="row pt-10">
        <label style={{ fontWeight: "bold", marginBottom: "5px" }}>
          Conducting days <span className="text-danger">*</span>{" "}
        </label>
        <div className="col-lg-6 col-md-6">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexCheckDefault"
              value="monday"
              checked={_values.days.monday}
              onChange={() =>
                _setValues((prev) => ({
                  ...prev,
                  days: {
                    ...prev.days,
                    ["monday"]: !_values.days.monday,
                  },
                }))
              }
            />
            <label className="form-check-label" for="flexCheckDefault">
              Monday
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexCheckDefault"
              value="tuesday"
              checked={_values.days.tuesday}
              onChange={() =>
                _setValues((prev) => ({
                  ...prev,
                  days: {
                    ...prev.days,
                    ["tuesday"]: !_values.days.tuesday,
                  },
                }))
              }
            />
            <label className="form-check-label" for="flexCheckDefault">
              Tuesday
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexCheckDefault"
              value="wednesday"
              checked={_values.days.wednesday}
              onChange={() =>
                _setValues((prev) => ({
                  ...prev,
                  days: {
                    ...prev.days,
                    ["wednesday"]: !_values.days.wednesday,
                  },
                }))
              }
            />
            <label className="form-check-label" for="flexCheckDefault">
              Wednesday
            </label>
          </div>
        </div>

        <div className="col-lg-6 col-md-6">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexCheckDefault"
              value="thursday"
              checked={_values.days.thursday}
              onChange={() =>
                _setValues((prev) => ({
                  ...prev,
                  days: {
                    ...prev.days,
                    ["thursday"]: !_values.days.thursday,
                  },
                }))
              }
            />
            <label className="form-check-label" for="flexCheckDefault">
              Thursday
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexCheckDefault"
              value="friday"
              checked={_values.days.friday}
              onChange={() =>
                _setValues((prev) => ({
                  ...prev,
                  days: {
                    ...prev.days,
                    ["friday"]: !_values.days.friday,
                  },
                }))
              }
            />
            <label className="form-check-label" for="flexCheckDefault">
              Friday
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexCheckDefault"
              value="saturday"
              checked={_values.days.saturday}
              onChange={() =>
                _setValues((prev) => ({
                  ...prev,
                  days: {
                    ...prev.days,
                    ["saturday"]: !_values.days.saturday,
                  },
                }))
              }
            />
            <label className="form-check-label" for="flexCheckDefault">
              Saturday
            </label>
          </div>
        </div>
      </div>

      <hr />

      <div className="row py-3">
        <div className="col-md-6">
          <div className="form-group py-2">
            <label for="exampleFormControlInput1"> Course Fee</label>
            <input
              type="number"
              className="form-control"
              name="courseFee"
              placeholder="Course Fee - 0"
              value={_values.courseFee}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group py-2">
            <label for="exampleFormControlInput1"> Registeration Fee</label>
            <input
              type="number"
              className="form-control"
              name="regFee"
              placeholder="Registeration Fee - 5000 "
              value={_values.regFee}
              onChange={changeHandler}
            />
          </div>
        </div>
      </div>

      {instLoading && "loading..."}
      <div className="form-group py-2">
        <select value={_values.instructor} onChange={changeHandler} className="form-control" name="instructor">
          <option>* Select Instructor</option>
          {teachers?.map((x, index) => (
            <option key={index} value={x._id}>
              {x.name}
            </option>
          ))}
        </select>
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

      <div className="row py-5">
        <b> Outlines</b>

        {lectures.map((lecture, index) => (
          <React.Fragment key={index}>
            <div className="col-12">
              <div className="form-group py-2">
                <label for="exampleFormControlInput1"> Heading</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  placeholder="Lecture Title"
                  value={lecture.title}
                  onChange={(e) => handleLectureChange(index, e)}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="form-group py-2">
                <label for="exampleFormControlSelect1">Description</label>
                <textarea
                  type="text"
                  className="form-control"
                  name="details"
                  placeholder="Lecture Details"
                  value={lecture.details}
                  onChange={(e) => handleLectureChange(index, e)}
                />
              </div>

              <span className="p-1 mx-3 rounded d-flex justify-content-start text-danger " onClick={() => handleRemoveLecture(index)}>
                Remove
              </span>
            </div>
            <hr />
          </React.Fragment>
        ))}

        <div className="d-flex justify-content-end">
          <button onClick={handleAddLecture} className="p-1 rounded d-flex justify-content-center align-items-center">
            Add <BiPlus />
          </button>
        </div>
      </div>
      {/* ends */}

      {/* FAQS */}
      <div className="row py-5">
        <b>FAQs</b>

        {faqs.map((lecture, index) => (
          <React.Fragment key={index}>
            <div className="col-12">
              <div className="form-group py-2">
                <label for="exampleFormControlInput1"> Question</label>
                <input
                  type="text"
                  className="form-control"
                  name="question"
                  placeholder="Question"
                  value={lecture.question}
                  onChange={(e) => handleFaqsChange(index, e)}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="form-group py-2">
                <label for="exampleFormControlSelect1">Answer</label>
                <input
                  type="text"
                  className="form-control"
                  name="answer"
                  placeholder="Answer"
                  value={lecture.answer}
                  onChange={(e) => handleFaqsChange(index, e)}
                />
              </div>
            </div>
            <span className="p-1 mx-3 rounded d-flex justify-content-start text-danger " onClick={() => handleRemoveFAQs(index)}>
              Remove
            </span>

            <hr />
          </React.Fragment>
        ))}

        <div className="d-flex justify-content-end">
          <button onClick={handleAddFaqs} className="p-1 rounded d-flex justify-content-center align-items-center">
            Add <BiPlus />
          </button>
        </div>
      </div>

      <Button
        loading={submitLoading}
        onClick={() => {
          from === "course-edit"
            ? submitHandler(`edit-course/${courseId}`, { ..._values, lectures, faqs, image: _values.preImage ? _values.preImage : _values.image, categories: cats })
            : from === "course-create" && submitHandler("create-course", { ..._values, lectures, faqs, image: _values.image, categories: cats });
        }}
      >
        Submit
      </Button>
    </>
  );
};

export default CourseForm;

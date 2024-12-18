import { Button } from "antd";
import React from "react";

const AddBatchForm = ({ _values, _setValues, handleChange, courses, Creations, loading }) => {
  return (
    <form>
      <div className="form-group py-2">
        <label> Batch Title</label>
        <input type="text" className="form-control" id="exampleFormControlInput1" name="title" placeholder="Batch Title " value={_values.title} onChange={handleChange} />
      </div>

      <div className="form-group py-2">
        <label>Durations</label>
        <input type="text" className="form-control" id="exampleFormControlInput1" name="duration" placeholder="Batch Duration " value={_values.duration} onChange={handleChange} />
      </div>

      <div className="form-group py-2">
        <label>Enollment Limits</label>
        <input type="number" className="form-control" id="exampleFormControlInput1" name="limit" placeholder="Batch Limit " value={_values.limit} onChange={handleChange} />
      </div>

      <div className="form-group py-2">
        <label>Classes</label>
        <input type="number" className="form-control" id="exampleFormControlInput1" name="classes" placeholder="Batch Classes " value={_values.classes} onChange={handleChange} />
      </div>

      <div className="form-group py-2">
        <label>Timing</label>
        <input type="text" className="form-control" id="exampleFormControlInput1" name="timming" placeholder="Batch Timing " value={_values.timming} onChange={handleChange} />
      </div>

      <div className="form-group py-2">
        <label>Starting Date</label>
        <input type="date" className="form-control" id="exampleFormControlInput1" name="startDate" value={_values.startDate} onChange={handleChange} />
      </div>

      <div className="form-group py-2">
        <label>End Date</label>
        <input type="date" className="form-control" id="exampleFormControlInput1" name="endDate" value={_values.endDate} onChange={handleChange} />
      </div>

      <div className="row pt-10">
        <label style={{ fontWeight: "bold", marginBottom: "5px" }}>
          Conducting days <span className="text-danger">*</span>{" "}
        </label>
        <div className="col-lg-6 col-md-6">
          <div className="form-check">
            <input
              class="form-check-input"
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
            <label class="form-check-label" for="flexCheckDefault">
              Monday
            </label>
          </div>
          <div className="form-check">
            <input
              class="form-check-input"
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
            <label class="form-check-label" for="flexCheckDefault">
              Tuesday
            </label>
          </div>

          <div className="form-check">
            <input
              class="form-check-input"
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
            <label class="form-check-label" for="flexCheckDefault">
              Wednesday
            </label>
          </div>
        </div>

        <div className="col-lg-6 col-md-6">
          <div className="form-check">
            <input
              class="form-check-input"
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
            <label class="form-check-label" for="flexCheckDefault">
              Thursday
            </label>
          </div>
          <div className="form-check">
            <input
              class="form-check-input"
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
            <label class="form-check-label" for="flexCheckDefault">
              Friday
            </label>
          </div>
          <div className="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="flexCheckDefault"
              value="friday"
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
            <label class="form-check-label" for="flexCheckDefault">
              Saturday
            </label>
          </div>
        </div>
      </div>

      <div className="form-group py-2">
        <label>Coruse</label>
        <select value={_values.courseDetails} onChange={handleChange} className="form-control" name="courseDetails">
          <option>* Select Course</option>
          {courses?.map((x, index) => (
            <option key={index} value={x._id}>
              {x.title}
            </option>
          ))}
        </select>
      </div>

      <Button loading={loading} className="my-3" style={{ backgroundColor: "#0f3f5d", color: "white" }} onClick={Creations}>
        Create Batch
      </Button>
    </form>
  );
};

export default AddBatchForm;

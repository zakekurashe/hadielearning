import { Checkbox } from "antd";
import React from "react";

const Step4 = ({ values, setValues, currentStep, submitButton, enrollInto, enroll_to, previousButton }) => {
  const { education, interest, wantToAchieve, policyAccepted } = values;
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  if (currentStep !== 4) {
    return null;
  }

  return (
    <>
      <div className="form-group py-3">
        <label>
          Education<span className="text-danger">*</span>
        </label>
        <select
          required
          className="form-select"
          value={education}
          onChange={(e) => {
            setValues({ ...values, education: e.target.value });
          }}
        >
          <option value="">Choose</option>
          <option value="matric">Matric</option>
          <option value="intermediate">Intermediate</option>
          <option value="bachelor">Bachelor </option>
          <option value="masters">Masters</option>
        </select>
      </div>

      <div className="row">
        {enroll_to === "program" ? (
          <div className="col-md-12 col-sm-12 col-xs-12 py-3">
            <label>
              Choose Course<span className="text-danger">*</span>
            </label>
            <select
              required
              className="form-select"
              value={values.course}
              onChange={(e) => {
                setValues({ ...values, course: e.target.value });
              }}
            >
              <option value="">Choose</option>
              {enrollInto?.map((x) => (
                <option key={x._id} value={x.slug}>
                  {x.title}
                </option>
              ))}
            </select>
          </div>
        ) : (
          enroll_to === "workshop" && (
            <div className="col-md-12 col-sm-12 col-xs-12 py-3">
              <label>
                Choose Workshop<span className="text-danger">*</span>
              </label>
              <select
                required
                className="form-select"
                value={values.workshop}
                onChange={(e) => {
                  setValues({ ...values, workshop: e.target.value });
                }}
              >
                <option value="">Choose</option>
                {enrollInto?.map((x) => (
                  <option key={x._id} value={x.slug}>
                    {x.title}
                  </option>
                ))}
              </select>
            </div>
          )
        )}
      </div>

      <div className="form-group py-3">
        <label>Your Interests</label>
        <textarea type="text" className="form-control" name="interest" value={interest} onChange={handleChange} />
      </div>
      <div className="form-group py-3">
        <label>What do you want to achieve?</label>
        <textarea type="text" className="form-control" name="wantToAchieve" value={wantToAchieve} onChange={handleChange} />
      </div>


      <div className="col-md-12 col-sm-12 col-xs-12 py-3">
        <Checkbox onChange={(v) => setValues({ ...values, policyAccepted: v.target.checked })}>
          I accept Hadi E-learnings{" "}
          <a className="text-primary" target="_" href="https://hadielearning.com/terms-and-conditions/">Terms and Conditions</a> {" "}
          and{" "}
          <a className="text-primary" target="_" href="https://hadielearning.com/privacy-and-policy/">Privacy Policy</a>

        </Checkbox>
      </div>


      <div className="d-flex justify-content-between">
        <>{previousButton()}</>
        {!education || !policyAccepted || !(values.course || values.workshop) ? <button className="z-btn-disable mx-2">submit</button> : <>{submitButton()}</>}
      </div>
    </>
  );
};

export default Step4;

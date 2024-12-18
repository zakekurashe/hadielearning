import { Button, Checkbox } from "antd";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";

const Step0 = ({ values, setValues, currentStep, userLoading, submitButton, enrollInto, enroll_to, nextButton, userByEmail, finded }) => {
  const [show, setShow] = useState(false);

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleEmail = (event) => {
    if (!isValidEmail(event.target.value)) {
      setShow(true);
    } else {
      setShow(false);
    }

    setValues({ ...values, email: event.target.value });
  };

  if (currentStep !== 0) {
    return null;
  }

  return (
    <>
      <div className="form-group py-3">
        <label>
          Email<span className="text-danger">*</span>
          {show && <small className="text-danger mx-3"> Invalid Email</small>}
          {userLoading && "Loading..."}
        </label>
        <input required type="email" className="form-control" placeholder="example@gmail.com" name="email" value={values?.email} onChange={handleEmail} />
      </div>
      {userByEmail && finded && (
        <div className="row">
          <div className="col-md-12 col-sm-12 col-xs-12 py-3">
            <label>
              WhatsApp<span className="text-danger">*</span>
            </label>

            <PhoneInput
              country={"pk"} // Set a default country
              inputClass="form-control"
              inputStyle={{ width: "100%" }}
              placeholder="Enter whatsApp number"
              value={values?.whatsAppphoneNumber}
              onChange={(v) => setValues({ ...values, whatsAppphoneNumber: v })}
            />
            <small style={{ fontSize: "12px" }}>Could you please confirm your WhatsApp Number</small>
          </div>

          {enroll_to === "program" ? (
            <div className="col-md-12 col-sm-12 col-xs-12 py-3">
              <label>
                Choose Course<span className="text-danger">*</span>
              </label>
              <select
                required
                className="form-select"
                value={values?.course}
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
                  value={values?.workshop}
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

          <div className="col-md-12 col-sm-12 col-xs-12 py-3">
            <Checkbox onChange={(v) => setValues({ ...values, policyAccepted: v.target.checked })}>
              I accept Hadi E-learnings{" "}
              <a className="text-primary" target="_" href="https://hadielearning.com/terms-and-conditions/">Terms and Conditions</a> {" "}
              and{" "}
              <a className="text-primary" target="_" href="https://hadielearning.com/privacy-and-policy/">Privacy Policy</a>

            </Checkbox>
          </div>
        </div>
      )}

      {!userByEmail && show ? <Button className="z-btn-disable">Next</Button> : !values?.email && !userByEmail && <button className="z-btn-disable">Next</button>}

      {userByEmail && (
        <div className="col-md-12">
          {!(values?.course || values?.workshop) || !values?.whatsAppphoneNumber || !values?.policyAccepted || show !== false ? <button className="z-btn-disable">Submit</button> : <> {submitButton()}</>}
        </div>
      )}

      {!userLoading && !userByEmail && <div className="col-md-12">{!values?.email || show !== false ? <></> : <>{nextButton()}</>}</div>}
    </>
  );
};

export default Step0;

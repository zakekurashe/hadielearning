import { DatePicker } from "antd";
import { useRouter } from "next/router";
import React from "react";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";

const Step1 = ({ values, setValues, nextButton, currentStep, setCurrentStep, previousButton }) => {
  const navigate = useRouter();

  if (values.dateOfBirth) {
    const currentDate = new Date(); // Get the current date in YYYY-MM-DD format

    if (values.dateOfBirth > currentDate) {
      toast.error("Please select a date in the past", {
        position: "bottom-center",
      });
      setValues({ ...values, dateOfBirth: "" });
    }
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setValues({ ...values, gender: e.target.value });
  };

  if (currentStep !== 1) {
    return null;
  }

  return (
    <>
      <div className="row">
        <div className="col-md-6 col-sm-12 col-xs-12 py-3">
          <label>
            First Name<span className="text-danger">*</span>{" "}
          </label>
          <input required type="text" className="form-control" name="firstName" value={values.firstName} onChange={handleChange} />
        </div>

        <div className="col-md-6 col-sm-12 col-xs-12 py-3">
          <label>
            Last Name<span className="text-danger">*</span>{" "}
          </label>
          <input required type="text" className="form-control" name="lastName" value={values.lastName} onChange={handleChange} />
        </div>
      </div>

      <div className="d-flex form-group py-3">
        <div className="form-check " style={{ marginRight: "20px" }}>
          <input className="form-check-input" type="checkbox" id="flexCheckDefault" value="female" checked={values.gender === "female"} onChange={handleCheckboxChange} />
          <label className="form-check-label" for="flexCheckDefault">
            Female
          </label>
        </div>

        <div className="form-check " style={{ marginRight: "20px" }}>
          <input className="form-check-input" type="checkbox" value="male" checked={values.gender === "male"} onChange={handleCheckboxChange} id="flexCheckDefault" />
          <label className="form-check-label" for="flexCheckDefault">
            Male
          </label>
        </div>
        <div className="form-check " style={{ marginRight: "20px" }}>
          <input className="form-check-input" type="checkbox" value="other" checked={values.gender === "other"} onChange={handleCheckboxChange} id="flexCheckDefault" />
          <label className="form-check-label" for="flexCheckDefault">
            Other
          </label>
        </div>
      </div>

      <div className="col-md-12 col-sm-12 col-xs-12 py-3">
        <label>
          Date of Birth<span className="text-danger">*</span>
        </label>
        <DatePicker
          required
          type="date"
          className="form-control"
          placeholder="Date of bith"
          name="dateOfBirth"
          value={values.dateOfBirth}
          onChange={(e) => setValues({ ...values, dateOfBirth: e })}
        />
      </div>

      <div className="row">
        <div className="col-md-6 col-sm-12 col-xs-12 py-3">
          <label>
            WhatsApp<span className="text-danger">*</span>
          </label>
          <PhoneInput
            country={"pk"}
            inputClass="form-control"
            inputStyle={{ width: "100%" }}
            placeholder="Enter whatsApp number"
            value={values.whatsAppphoneNumber}
            onChange={(v) => setValues({ ...values, whatsAppphoneNumber: v })}
          />
        </div>

        <div className="col-md-6 col-sm-12 col-xs-12 py-3">
          <label>
            Phone<span className="text-danger">*</span>
          </label>
          <PhoneInput
            country={"pk"} // Set a default country
            inputClass="form-control"
            inputStyle={{ width: "100%" }}
            placeholder="Enter phone number"
            value={values.phoneNumber}
            onChange={(v) => setValues({ ...values, phoneNumber: v })}
          />
        </div>
      </div>

      <div className="d-flex justify-content-between">
        <>{previousButton()}</>
        {!(values.firstName.length >= 3) || !(values.lastName.length >= 3) || !values.gender || !values.phoneNumber || !values.whatsAppphoneNumber || !values.dateOfBirth ? (
          <button className="z-btn-disable">next</button>
        ) : (
          <>{nextButton()}</>
        )}
      </div>
    </>
  );
};

export default Step1;

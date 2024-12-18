import React from "react";
import PhoneInput from "react-phone-input-2";

const Step3 = ({ values, setValues, nextButton, currentStep, setCurrentStep, previousButton }) => {
  const { parentName, parentOccupations, parentPhoneNumber } = values;

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  if (currentStep !== 3) {
    return null;
  }

  return (
    <>
      <div className="form-group py-3">
        <label>
          Father Name<span className="text-danger">*</span>{" "}
        </label>
        <input required type="text" className="form-control" name="parentName" value={parentName} onChange={handleChange} />
      </div>
      <div className="form-group py-3">
        <label>
          Occupation<span className="text-danger">*</span>{" "}
        </label>
        <input required type="text" className="form-control" name="parentOccupations" value={parentOccupations} onChange={handleChange} />
      </div>
      <div className="form-group py-3">
        <label>Phone</label>

        <PhoneInput
          country={"pk"} // Set a default country
          inputClass="form-control"
          inputStyle={{ width: "100%" }}
          placeholder=""
          value={parentPhoneNumber}
          onChange={(v) => setValues({ ...values, parentPhoneNumber: v })}
        />
      </div>
      <div className="d-flex justify-content-between">
        <>{previousButton()}</>
        {!(parentName.length >= 3) || !parentOccupations ? <button className="z-btn-disable mx-2">next</button> : <>{nextButton()}</>}
      </div>
    </>
  );
};

export default Step3;

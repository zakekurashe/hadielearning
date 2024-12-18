import React, { useState } from "react";

const Step2 = ({ values, setValues, nextButton, currentStep, setCurrentStep, previousButton }) => {
  const { city, address, idCard } = values;
  const [show, setShow] = useState(false);

  const handleInputChange = (event) => {
    const cnicNumber = event.target.value;

    if (/^\d{0,13}$/.test(cnicNumber)) {
      setValues({ ...values, idCard: cnicNumber });
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  if (currentStep !== 2) {
    return null;
  }

  return (
    <>
      <div className="form-group py-3">
        <label>
          City<span className="text-danger">*</span>{" "}
        </label>
        <input required type="text" className="form-control" name="city" value={city} onChange={handleChange} />
      </div>

      <div className="form-group py-3">
        <label>
          Address<span className="text-danger">*</span>{" "}
        </label>
        <input required type="text" className="form-control" name="address" value={address} onChange={handleChange} />
      </div>

      <div className="form-group py-3">
        <label>
          CNIC
          {show && (
            <span style={{ color: "red", marginLeft: "3px" }} className="ml-2">
              Please enter correct CNIC
            </span>
          )}
        </label>
        <input required type="text" className="form-control" name="idCard" value={idCard} onChange={handleInputChange} />
      </div>
      <div className="d-flex justify-content-between">
        <>{previousButton()}</>
        {!city || !address || show !== false ? <button className="z-btn-disable mx-2">next</button> : <>{nextButton()}</>}
      </div>
    </>
  );
};

export default Step2;

import { _useEnrollmentForm, } from "@/actions/_enrollmentForm";
import EnrForm from "@/components/enrollmentForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const EnrollmentForm = () => {
  const router = useRouter();
  const { enroll_to } = router.query;

  // const [enroll_to, setEnrollTo] = useState()
  const { enrollInto, userLoading, userByEmail, gettingUserData, handleSubmit, _values, _setValues, submitLoading, finded } = _useEnrollmentForm({ which: enroll_to });

  const [currentStep, setCurrentStep] = useState(0);

  // useEffect(() => {
  //   setEnrollTo(enroll_to?.split("_")[0]);
  // }, [enroll_to]);



  useEffect(() => {
    if (_values.email) {
      gettingUserData(_values.email);
    }
  }, [_values?.email]);

  // buttons
  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const previousButton = () => {
    if (currentStep !== 0) {
      return (
        <button className="z-btn mx-2" onClick={handlePrev}>
          Previous
        </button>
      );
    }
    return null;
  };

  const nextButton = () => {
    if (currentStep < 4) {
      return (
        <button className="z-btn " onClick={handleNext}>
          Next
        </button>
      );
    }
    return null;
  };

  const submitButton = () => {
    if (currentStep === 4 || currentStep === 0) {
      return (
        <button
          className="z-btn"
          type="submit"
          onClick={(e) => handleSubmit(e, { ..._values, enrollTo: enroll_to })}
        >
          Submit {submitLoading && "..."}
        </button>
      );
    }
    return null;
  };

  return (
    <>
      <div id="enrollScreen" className="container-fluid ">
        <div className="row">
          <div className="col-lg-4 col-md-4 bg-danger" id="forImage" />
          <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12" id="rightCol">
            <div className="form " onSubmit={() => { }}>
              <div className="row d-flex justify-content-center align-items-center" style={{ height: "90vh" }}>
                <div className="col-md-8  col-sm-12 " id="startForm">
                  <EnrForm
                    finded={finded}
                    values={_values}
                    setValues={_setValues}
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                    enrollInto={enrollInto}
                    userLoading={userLoading}
                    userByEmail={userByEmail}
                    previousButton={previousButton}
                    nextButton={nextButton}
                    submitButton={submitButton}
                    enroll_to={enroll_to?.split("_")[0]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnrollmentForm;

import React from "react";
import Step0 from "./step0";
import { AiOutlineRollback } from "react-icons/ai";
import { useRouter } from "next/router";
// import Step0Final from "./step1";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";

const EnrForm = ({ values, setValues, currentStep, setCurrentStep, enrollInto, userLoading, userByEmail, previousButton, nextButton, submitButton, enroll_to, finded }) => {
  const navigate = useRouter();

  return (
    <>
      <div className="col-md-8  col-sm-12 mb-4  ">
        <span className="d-flex align-items-center gap-2" role="button" onClick={() => navigate.back()}>
          <AiOutlineRollback /> <span>Back</span>
        </span>
      </div>
      <h2> Enrollment Application </h2>

      <Step0
        finded={finded}
        values={values}
        setValues={setValues}
        userLoading={userLoading}
        submitButton={submitButton}
        enrollInto={enrollInto}
        enroll_to={enroll_to}
        nextButton={nextButton}
        userByEmail={userByEmail}
        currentStep={currentStep}
      />

      <Step1 values={values} setValues={setValues} nextButton={nextButton} currentStep={currentStep} setCurrentStep={setCurrentStep} previousButton={previousButton} />
      <Step2 values={values} setValues={setValues} nextButton={nextButton} currentStep={currentStep} setCurrentStep={setCurrentStep} previousButton={previousButton} />
      <Step3 values={values} setValues={setValues} nextButton={nextButton} currentStep={currentStep} setCurrentStep={setCurrentStep} previousButton={previousButton} />
      <Step4
        values={values}
        setValues={setValues}
        submitButton={submitButton}
        enrollInto={enrollInto}
        enroll_to={enroll_to}
        currentStep={currentStep}
        previousButton={previousButton}
      />
    </>
  );
};

export default EnrForm;

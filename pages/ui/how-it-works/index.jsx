import CTA from "@/components/ui/common/CTA";
import Footer from "@/components/ui/common/Footer";
import PageHeading from "@/components/ui/common/PageHeading";
import React, { useState } from "react";
import FAQs from "../faqs";
// import Price from "@/components/ui/common/Price";
import Tops from "@/components/ui/common/Tops";
import FreeFlow from "@/components/ui/how-it-works/FreeFlow";
import AdvFlow from "@/components/ui/how-it-works/AdvFlow";

const HowItWorks = () => {

  const [which, setWhich] = useState('free')
  const active = { backgroundColor: "#0f3f5d", color: "white" }


  return (
    <>
      <Tops
        // header
        grid
        title={"How our best online learning platform, Hadi e-learning works"}
        desc={"Go through these simple steps and enroll now in the most suitable course to make your mark in this digital world with the best online learning platform, hadi e-learning."}
        conLink={"https://hadielearning.com/how-it-works"}
      />

      <PageHeading
        title={"How it works?"}
        para={
          "Go through these simple steps and enroll now in the most suitable course to make your mark in this digital world with the best online learning platform, hadi e-learning."
        }
      />
      <div className="container pt-90">

        {/* <div className="d-flex justify-content-center align-items-center" role="button">
          <div className="rounded-3 d-flex justify-content-between align-items-center gap-3" >
            <div className="py-2 px-3 rounded-3" style={which === 'free' ? active : {}} onClick={() => setWhich('free')}>Free Courses</div>
            <div className="py-2 px-3 rounded-3" style={which === 'adv' ? active : {}} onClick={() => setWhich('adv')}>Advance Courses</div>
          </div>
        </div> */}

        <FreeFlow />

        {/* {which === "free" && <FreeFlow />}
        {which === "adv" && <AdvFlow />} */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img src="/images/how-it-works/stars.png" />
          <div>
            <h2 className="star-heading">Brighten up your future with our specially designed programs</h2>
          </div>
        </div>
      </div>

      <CTA />
      {/* <Price /> */}
      <FAQs list={3} component={false} />
      <Footer />
    </>
  );
};

export default HowItWorks;

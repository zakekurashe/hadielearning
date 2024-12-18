import Link from "next/link";
import React from "react";

const CTA = () => {
  return (
    <>
      <section className="cta__area pt-80 pb-140">
        <div className="container p-relative">
          <div className="row">
            <div className="col-xl-10 offset-xl-1">
              <div className="cta__content text-center  ">
                <h2 style={{ fontSize: "60px" }}>Your Gateway to a Brighter Future</h2>
                <div className="cta__btn">
                  <Link href="/enroll/program">
                    <span className="z-btn mb-30">Enroll Now </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CTA;

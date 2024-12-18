import React from "react";

const Vission = ({ image }) => {
  return (
    <>
      <div className="expart__tab-content white-bg">
        <div
          className="expart__thumb"
          style={{
            backgroundImage: `url(/images/about/compress/vision.webp`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div className="row">
          <div className="col-xl-6 col-lg-6 offset-lg-6">
            {/* <div className="col-xl-12 col-lg-12"> */}
            <div className="expart__content">
              <h3>The vision we perceived</h3>
              <q>
                <i>
                  Hadi E-learning is an online IT training program that aims to uplift Pakistani youth through structured free IT training. Hadi’s motto is to enhance IT skills in
                  youth so that they can become financially independent and contribute towards better economic conditions in the country.
                </i>
              </q>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Vission;

import Link from "next/link";
import React from "react";
import { BiLock } from "react-icons/bi";
import { CgArrowLongRight } from "react-icons/cg";
import { FaLightbulb, FaRibbon } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";

const HomeTwoSingleFeature = ({ icon, title }) => {
  return (
    <>
      <div className="features__item features__item-2 white-bg fix mb-30">
        <div className="features__thumb-2" style={{ background: `url(assets/img/features/02/features-1.jpg)`, backgroundPosition: "center", backgroundSize: "cover" }}></div>
        <div className="features__content-2">
          <div className="features__icon features__icon-2">
            <i> {icon} </i>
          </div>
          <h3>{title}</h3>
          <p>He nicked it Jeffrey zonked cheeky bugger.</p>
          <div className="features__btn-2">
            <Link href="/about" className="link-btn">
              <i>
                {" "}
                <CgArrowLongRight />{" "}
              </i>
              <i>
                {" "}
                <CgArrowLongRight />{" "}
              </i>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

const HomeAboutFeatures = () => {
  return (
    <>
      <section className="features__area pt-115 pb-140 ">
        <div className="container">
          <div className="row">
            <div className="col-xl-5 col-lg-6">
              <div className="features__content-left">
                <div className="section__title section__title-h2 mb-25">
                  {/* <span>About Hadi E-learning.</span> */}
                  <div className="section__title section__title-3 mb-25">
                    <h2>
                      Get to <br />
                      know Hadi
                    </h2>
                  </div>F
                </div>
                <p>
                  Meet our mascot, Hadi. Hadi is your digital leader and will lead you through specially structured computer short courses that will not only enhance your IT skills but will also help you navigate efficiency through your career path.
                  <br />
                  Hadi mission is to empower the countrys youth with the strength of modern skills so they can have equal opportunities to excel in their careers as anyone else in the world.
                  <br />
                  So join hands with Hadi today, and unlock the door to many shiny prospects in this modern digital world.

                </p>

                <Link href="/about-us" className="z-btn">
                  Get to know Hadi better
                  <i>
                    <CgArrowLongRight />
                  </i>
                </Link>
              </div>
            </div>
            <div className="col-xl-6 offset-xl-1 col-lg-6">
              <div className="features__content-right">
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                    <HomeTwoSingleFeature icon={<FaLightbulb />} title="Mission & Vission" />
                    <HomeTwoSingleFeature icon={<IoDocumentTextOutline />} title="Mission & Vission" />
                  </div>

                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                    <HomeTwoSingleFeature icon={<FaRibbon />} title="How Hadi has evolved" />
                    <HomeTwoSingleFeature icon={<BiLock />} title="Background" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeAboutFeatures;

import React from "react";
import { CgArrowLongRight } from "react-icons/cg";
import Link from "next/link";
import Image from "next/image";

const HomeAbout = () => {
  return (
    <section
      className="pb-140 p-relative"
      id="sectionArea"
      style={{
        background: "#8080801c",
      }}
    >
      <div className="container">
        <div className="about__area-2 pt-0">
          <div className="row">
            <div className="col-xl-7 col-lg-6">
              <div className="about__thumb-2 p-relative m-img text-center">
                <Image width={600} height={500} src="/images/about/compress/about.webp" alt="" id="about_mascot" />
              </div>
            </div>
            <div className="col-xl-5 col-lg-6">
              <div className="about__content">
                <div className="section__title section__title-3 mb-25">
                  <h2>Get to know Hadi</h2>
                </div>
                <p>
                  Meet our mascot, Hadi. Hadi is your digital leader and will lead you through specially structured computer short courses that will not only enhance your IT skills
                  but will also help you navigate efficiency through your career path.
                  <br />
                  {/* </p>
                  <p style={{ marginTop: "-20px" }}> */}
                  Hadi&apos;s mission is to empower the country&apos;s youth with the strength of modern skills so they can have equal opportunities to excel in their careers as
                  anyone else in the world.
                  <br /> So join hands with Hadi today, and unlock the door to many shiny prospects in this modern digital world.
                </p>
                <Link href="/about-us">
                  <span className="z-btn">
                    Get to know Hadi better
                    <i>
                      <CgArrowLongRight />
                    </i>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;

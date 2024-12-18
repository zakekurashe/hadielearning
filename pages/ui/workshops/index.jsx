import Footer from "@/components/ui/common/Footer";
import PageHeading from "@/components/ui/common/PageHeading";
import Tops from "@/components/ui/common/Tops";
import { API, toImageUrl } from "@/config/APIs";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { CgArrowLongRight } from "react-icons/cg";

const LeftSideBar = () => {
  return (
    <>
      <div className="col-xl-4 col-lg-4">
        <div className="blog__sidebar">
          <div className="sidebar__widget mb-50 ">
            <div className="sidebar__widget-title mb-50">
              <h4>Popular Tags</h4>
            </div>
            <div className="sidebar__widget-content">
              <div className="tags">
                <p to="#">DigitalSkillsWorkshop</p>
                <p to="#">TechTraining</p>
                <p to="#">DigitalLiteracy</p>
                <p to="#">TechForAll</p>
                <p to="#">DigitalEmpowerment</p>
                <p to="#">DigitalInclusion</p>
                <p to="#">DigitalTransformation</p>
                <p to="#">TechSkillsForAll</p>
                <p to="#">FutureOfWork</p>
                <p to="#">BridgingTheDigitalDivide</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Workshops = ({ workshops }) => {
  return (
    <>
      <Tops
        header
        grid
        title={"Join our workshops to get the most out of web based learning"}
        desc={
          "Register for one of our workshops and unlock your potential to conquer the digital world with the power of one of the best online education platforms, Hadi e-learning."
        }
        conLink={"https://hadielearning.com/workshops"}
      />

      <PageHeading
        title={"Free Workshops"}
        para={"Join one of our workshops to explore various digital niches and endless career options you can pursue for a prosperous future."}
      />

      <section className="blog__area pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-8">
              <div className="blog__wrapper mr-50">
                {workshops?.map((x, index) => (
                  <div key={index} className="blog__item-2 mb-50 fix">
                    <div className={`blog__thumb-2  w-img fix p-relative`}>
                      <Link href={`/workshop-detail/${x.slug} `}>
                        {x.image?.url?.includes("uploads") ? <img src={toImageUrl(x.image?.url)} alt="workshop_image" /> : <img src={x.image?.url} alt="workshop_image" />}
                      </Link>
                    </div>

                    <div className="blog__content-2">
                      <div className="blog__meta-2 mb-15 d-sm-flex align-items-center">
                        <div className="d-flex align-items-center  pr-20 mr-20">
                          <Link href={`/workshop-detail/${x.slug} `}>
                            {x.instructor?.image?.url.includes("profileImages") ? (
                              <img src={toImageUrl(x.instructor?.image?.url)} className="pr-10" alt="istructor image" height={80} />
                            ) : (
                              <img className="pr-10" src={x.instructor?.image?.url} alt="istructor image" height={80} />
                            )}
                          </Link>
                          <div>
                            <span style={{ fontWeight: "bold", fontSize: "18px" }}>{x.instructor?.name}</span>
                            <br />
                            <small style={{ fontSize: "14px" }}>{x.instructor?.exp}</small>
                            <br />
                            <small style={{ fontSize: "14px" }}>{x.meetingTiming}</small>
                          </div>
                        </div>
                      </div>
                      <br />

                      <Link href={`/workshop-detail/${x.slug} `}>
                        <h3>{x.title} </h3>
                      </Link>

                      <div
                        dangerouslySetInnerHTML={{
                          __html: x.content.substring(0, 150) + "...",
                        }}
                      />

                      <div className="blog__btn d-sm-flex justify-content-between">
                        <div className="blog__btn">
                          <Link href={`/workshop-detail/${x.slug} `}>
                            <span className="link-btn-2">
                              Read More
                              <i>
                                <CgArrowLongRight />
                              </i>
                              <i>
                                <CgArrowLongRight />
                              </i>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <LeftSideBar />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get(`${API}/all-workshops`);
  return {
    props: {
      workshops: data.allworkshops,
    },
  };
}

export default Workshops;

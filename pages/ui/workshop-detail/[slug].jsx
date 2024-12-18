import Footer from "@/components/ui/common/Footer";
import PageHeading from "@/components/ui/common/PageHeading";
import TopHeader from "@/components/ui/common/TopHeader";
import Tops from "@/components/ui/common/Tops";
import WriteComments from "@/components/ui/workshops/WriteComments";
import { API, toImageUrl } from "@/config/APIs";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const WorkshopDetails = ({ workshop }) => {
  const router = useRouter();
  const { slug } = router.query;

  const [selected, setSelected] = useState(workshop);

  const dateTime_workshop = new Date(selected?.dateAndTime);
  const currentDate = new Date();

  const givenDataAndTime = new Date(selected?.dateAndTime);

  const formattedDate = givenDataAndTime.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = givenDataAndTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });
  return (
    <>

      <Tops header
        title={selected?.title}
        desc={
          "Go through these simple steps and enroll now in the most suitable course to make your mark in this digital world with the best online learning platform, hadi e-learning."
        }
        conLink={`https://hadielearning.com/program/${slug}`}
      />

      {/* <TopHeader /> */}
      {/* <PageHeading title={selected?.title} para={selected?.conclusion} /> */}

      <section className="services__details pt-115 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-lg-4 order-last order-lg-first">
              <div className="services__sidebar mr-50">
                <div className="sidebar__widget  mb-30 ">
                  <div className="sidebar__widget-title mb-50">
                    <h4>Popular Tags</h4>
                  </div>
                  <div className="sidebar__widget-content">
                    <div className="tags">
                      {selected?.tags.map((x, index) => (
                        <p key={index}>{x}</p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="sidebar__widget  mb-30 ">
                  <div className="sidebar__widget-title mb-20">
                    <h4>Date & Timing</h4>
                  </div>
                  <div className="sidebar__widget-content">
                    <div className="tags">
                      {formattedDate} | {formattedTime}
                    </div>
                  </div>
                </div>

                {!(currentDate.getTime() > dateTime_workshop.getTime()) && (
                  <Link href={"/enroll/workshop"} className="z-btn z-btn-3 w-100">
                    Register Now
                  </Link>
                )}
              </div>
            </div>
            <div className="col-xl-8 col-lg-8">
              <div className="services__text">
                <h2>{selected?.title}</h2>

                <div
                  dangerouslySetInnerHTML={{
                    __html: selected?.content,
                  }}
                />
              </div>
              <div className="services__img mb-45 w-img">
                {selected?.image?.url.includes("uploads") ? (
                  <img src={toImageUrl(selected?.image?.url)} alt="workshop_image" />
                ) : (
                  <img src={selected?.image?.url} alt="workshop_image" />
                )}
              </div>

              <div className="services__list mb-40">
                <div className="service-text">
                  <h3>Outlines</h3>
                  <div style={{ fontSize: "18px" }}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: selected?.outlines,
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="services__text">
                <h4>Conclusion</h4>
                <p>{selected?.conclusion}</p>
              </div>

              {!(currentDate.getTime() > dateTime_workshop.getTime()) && (
                <>

                  <button className="z-btn">
                    <Link href={"/enroll/workshop"} >Register Now </Link></button>

                  <hr />
                </>
              )}
              <WriteComments selected={selected} />
            </div>
          </div>
        </div>
      </section >

      <Footer />
    </>
  );
};

export async function getServerSideProps({ params }) {
  const { data } = await axios.get(`${API}/workshop/${params.slug}`);
  return {
    props: {
      workshop: data.workshop,
    },
  };
}

export default WorkshopDetails;

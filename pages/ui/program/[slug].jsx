import Footer from "@/components/ui/common/Footer";
import PageHeading from "@/components/ui/common/PageHeading";
import TopHeader from "@/components/ui/common/TopHeader";
import Tops from "@/components/ui/common/Tops";
import CourseSideBar, { CourseInfo } from "@/components/ui/courses/CourseSideBar";
import FaqsCourseDetail from "@/components/ui/courses/FaqsCourseDetail";
import { API, toImageUrl } from "@/config/APIs";
import { Grid } from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const ProgramDetail = ({ course }) => {
  const router = useRouter();
  const { slug } = router.query;
  const points = Grid.useBreakpoint()

  // tabs
  const [activeTabs, setactiveTabs] = useState("first");
  return (
    <>
      <Tops
        header
        grid

        title={course?.seoTitle}
        desc={course?.metaDescription}
        conLink={`https://hadielearning.com/program/${slug}`}
      />

      {/* <TopHeader />
      <img src="/images/grid/header-bg.jpg" alt="background" className="position-absolute " style={{ color: "transparent", zIndex: "-1", top: 0, width: "100%" }} /> */}
      {/* <PageHeading title={"Data Analytics with Tableau and Power BI"} /> */}

      <section className="blog__area pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-8">
              <div className="blog__details-wrapper mr-50">
                <div className="blog__details-thumb w-img mb-45">
                  {course?.image?.url?.includes("courseImages") ? (
                    <img src={toImageUrl(course?.image?.url)} alt="" style={{ borderRadius: "20px" }} />
                  ) : (
                    <img src={course?.image?.url} alt="" style={{ borderRadius: "20px" }} />
                  )}
                </div>

                {
                  !points.md && <div className="pb-100">
                    <CourseInfo slug={slug} course={course} />
                  </div>
                }

                <div className="blog__text mb-40">
                  <h1>{course?.title}</h1>
                  {/* {course?.overview} */}
                  <div>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: course?.overview,
                      }}
                    />
                  </div>
                  {/* {course?.overview} */}

                  <ul className="nav nav-tabs">
                    <li className="nav-item">
                      <span id="navLinks" className={`nav-link  ${activeTabs === "first" ? "active" : ""}`} onClick={(e) => setactiveTabs("first")} aria-current="page">
                        Outline
                      </span>
                    </li>

                    <li className="nav-item">
                      <span id="navLinks" className={`nav-link  ${activeTabs === "third" ? "active" : ""}`} onClick={(e) => setactiveTabs("third")} aria-current="page">
                        Why us
                      </span>
                    </li>

                    <li className="nav-item">
                      <span id="navLinks" className={`nav-link  ${activeTabs === "second" ? "active" : ""}`} onClick={(e) => setactiveTabs("second")} aria-current="page">
                        Eligibility
                      </span>
                    </li>

                    <li className="nav-item">
                      <span id="navLinks" className={`nav-link  ${activeTabs === "fourth" ? "active" : ""}`} onClick={(e) => setactiveTabs("fourth")} aria-current="page">
                        Benefits
                      </span>
                    </li>
                    <li className="nav-item">
                      <span id="navLinks" className={`nav-link  ${activeTabs === "fifth" ? "active" : ""}`} onClick={(e) => setactiveTabs("fifth")} aria-current="page">
                        Scope
                      </span>
                    </li>

                    <li className="nav-item">
                      <span id="navLinks" className={`nav-link  ${activeTabs === "sixth" ? "active" : ""}`} onClick={(e) => setactiveTabs("sixth")} aria-current="page">
                        FAQs
                      </span>
                    </li>
                    <li className="nav-item">
                      <span id="navLinks" className={`nav-link  ${activeTabs === "seventh" ? "active" : ""}`} onClick={(e) => setactiveTabs("seventh")} aria-current="page">
                        Certification Criteria
                      </span>
                    </li>
                  </ul>

                  {/* outlines */}
                  {activeTabs === "first" && (
                    <div className="pt-30 ">
                      <FaqsCourseDetail details={course?.lectures} page={"outline"} />
                    </div>
                  )}

                  {activeTabs === "second" && (
                    <div className="pt-30 px-4">
                      <div
                        id="horizontalTab_lists"
                        dangerouslySetInnerHTML={{
                          __html: course?.prerequisites,
                        }}
                      />
                    </div>
                  )}

                  {activeTabs === "third" && (
                    <div className="pt-30 px-4">
                      <div
                        id="horizontalTab_lists"
                        dangerouslySetInnerHTML={{
                          __html: course?.whyUs,
                        }}
                      />
                    </div>
                  )}

                  {activeTabs === "fourth" && (
                    <div className="pt-30 px-4">
                      <div
                        id="horizontalTab_lists"
                        dangerouslySetInnerHTML={{
                          __html: course?.benefits,
                        }}
                      />
                    </div>
                  )}

                  {activeTabs === "fifth" && (
                    <div className="pt-30 px-4 ">
                      <div
                        id="horizontalTab_lists"
                        dangerouslySetInnerHTML={{
                          __html: course?.marketValue,
                        }}
                      />
                    </div>
                  )}
                  {activeTabs === "sixth" && (
                    <div className="pt-30 ">
                      <FaqsCourseDetail details={course?.faqs} page={"FAQs"} />
                    </div>
                  )}

                  {activeTabs === "seventh" && (
                    <div className="pt-30 px-4 ">

                      <div id="horizontalTab_lists">
                        <ul>
                          <li>Maintain at least 70% attendance.</li>
                          <li>Complete all assignments on time and to the instructors satisfaction.</li>
                          <li>Submit a video testimonial.</li>
                          <li>Provide a Google Review of the institute.</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  <br />
                  <br />
                  <Link href={`/enroll/program_${slug}`}>
                    <button className="z-btn z-btn-3 w-50">Enroll now</button>
                  </Link>
                </div>
              </div>
            </div>

            <CourseSideBar course={course} />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export async function getServerSideProps({ params }) {
  const { data } = await axios.get(`${API}/course/${params.slug}`);
  return {
    props: {
      course: data.course,
    },
  };
}

export default ProgramDetail;

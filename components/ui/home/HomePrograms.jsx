import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import CourseCard from "../common/CourseCard";

const PreviousArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="slick-prev" onClick={onClick}>
      {/* <BiLeftArrow color="black" /> */}
    </div>
  );
};

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="slick-next" onClick={onClick}>
      {/* <BiRightArrow color="black" /> */}
    </div>
  );
};



const HomePrograms = ({ courses }) => {
  const settings = {
    infinite: false,
    dots: true,
    arrows: true,
    autoplay: false,
    speed: 1100,
    slidesToShow: 3,
    slidesToScroll: 3,
    prevArrow: <PreviousArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const filtered = courses?.filter((x) => x?.show2 === true);
  return (
    <section style={{ position: "relative" }}>
      <img src="/images/grid/gird-5.jpg" alt="background" className="position-absolute " style={{ color: "transparent", zIndex: "-1", top: 0, width: "100%", height: "100%" }} />
      <div className="container">
        <div className="row">
          <div className="col-xl-7">
            <div className="section-title section__title-3 ">
              <h2>Programs Hadi is offering </h2>
              <p style={{ fontSize: "18px" }}>
                We invite you to explore our{" "}
                <Link href="/programs" className="text-primary">
                  courses
                </Link>{" "}
                and discover the many benefits of Hadi E-Learning.
              </p>
            </div>
          </div>
        </div>
      </div>
      <section className="timeline-carousel">
        <div className="container">
          <Slider {...settings}>
            {filtered?.slice(0, 6)?.map((x, index) => (
              <React.Fragment key={index}>{x?.show2 && <CourseCard x={x} />}</React.Fragment>
            ))}
          </Slider>
        </div>
      </section>
    </section>
  );
};

export default HomePrograms;

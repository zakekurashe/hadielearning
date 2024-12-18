import { Card } from "antd";
import React from "react";
import { MdOutlineCode } from "react-icons/md";
import { TbFileDollar } from "react-icons/tb";
import { SiGooglemarketingplatform, SiTaichigraphics } from "react-icons/si";
import { FaRankingStar } from "react-icons/fa6";
import { FiDatabase } from "react-icons/fi";
import { FaWordpress } from "react-icons/fa";
import GridImg from "../common/GridImg";

const SingleService = ({ Icon, title }) => {
  return (
    <>
      <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 my-2">
        <Card hoverable={true}>
          <div className="services__item mb-90">
            <div className="services__icon mb-35">{Icon}</div>
            <div className="services__content">
              <h3>{title}</h3>
              <p>Naff the wireless barney bodge lurgy cuppa cheeky.</p>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

const CourseCats = () => {
  return (
    <section className="services__area pt-115 pb-80 " style={{ position: "relative" }}>
      <img src="/images/grid/header-bg.jpg" alt="background" className="position-absolute " style={{ color: "transparent", zIndex: "-1", top: 0, width: "100%" }} />
      <div style={{ position: "absolute", top: 200, left: 0, width: "1px", height: "1px", boxShadow: `100px 100px 100rem 100px #31af98, 100px 0px 200px 10px #0f3f5d` }} />
      <div className="container">
        <div className="row">
          <div className="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1">
            <div className="section__title section__title-3 text-center mb-90 wow fadeInUp" data-wow-delay=".2s">
              {/* <span>Courses Categoriess</span> */}
              <h2>Courses Categories.</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <SingleService Icon={<MdOutlineCode size={40} color="#0f3f5d" />} title="Programming" />
          <SingleService Icon={<TbFileDollar size={40} color="#0f3f5d" />} title="Freelancing" />
          <SingleService Icon={<SiTaichigraphics size={40} color="#0f3f5d" />} title="Designing" />
          <SingleService Icon={<FaRankingStar size={40} color="#0f3f5d" />} title="SEO" />
          <SingleService Icon={<FiDatabase size={40} color="#0f3f5d" />} title="Data Analytics" />
          <SingleService Icon={<FaWordpress size={40} color="#0f3f5d" />} title="Wordpress" />
          <SingleService Icon={<SiGooglemarketingplatform size={40} color="#0f3f5d" />} title="Marketing" />
          <SingleService Icon={<TbFileDollar size={40} color="#0f3f5d" />} title="Financial Freedom" />
        </div>
      </div>
    </section>
  );
};

export default CourseCats;

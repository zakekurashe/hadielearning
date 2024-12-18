import React from "react";
import { Button } from "antd";
import Link from "next/link";


const SinglePrice = ({ title, price, active, linkTitle }) => {
  return (
    <>
      <div className="col-xl-4 col-lg-4 col-md-6 ">
        <div className={`price__item ${active && active} p-relative transition-3 text-center fix mb-30`}>
          <div className="price__inner p-relative">
            <p>{title}</p>
            <div className="price__tag mb-45">
              <h2 id="card_price">{`${price === 0 ? "Free" : price}`}</h2>
              {/* <span>PKR</span> */}
            </div>
            {/* <div className="price__features text-start mb-55">
              <ul>
                <li>
                  <span>{point1}</span>
                </li>
                <li>
                  <span>{point2}</span>
                </li>
                <li>
                  <span>{point3}</span>
                </li>
              </ul>
            </div> */}
            <Link href="/enroll/program" className="price-btn">
              <Button className="z-btn">{linkTitle}</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

const Price = () => {
  return (
    <>
      <section className="about__area pt-0 pb-75">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1">
              <div className="section__title section__title-3 mb-85 text-center">
                <h2>Fee Structure</h2>
                <p>Here is the fee structure for all our courses.</p>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            {/* <div className="col-xl-7 col-lg-6"> */}
            <SinglePrice title="Registeration Fee" price={0} point1={""} point2={""} point={""} linkTitle="Register Now" />
            <SinglePrice title="Course Fee" price={0} active="active" point1={""} point2={""} point={""} linkTitle="Enroll Now" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Price;

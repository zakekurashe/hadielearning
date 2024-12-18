import { testimonialsData } from "@/data/testimonials";
import { Avatar, Card } from "antd";
import React from "react";
import Marquee from "react-fast-marquee";

const Testimonials = () => {



  return (
    <>
      <section
        className="testimonial__area pb-140 pt-50"
        style={{
          // backgroundColor: " rgba(49, 175, 152, 1)"
          // backgroundImage: "linear-gradient(329deg, rgba(49, 175, 152, 1) 0%, rgba(15, 63, 93, 1) 100%)",
        }}
      >
        <div className="container ">

          <div className="section__title section__title-3 mb-30">
            <span className="">Testimonials</span>
            <h2 className="">What students are saying</h2>
          </div>

          <div className="mb-15">
            <Marquee gradient={false} speed={60} pauseOnHover={true} pauseOnClick={true} delay={0} play={true} direction="right">
              {
                testimonialsData?.slice(0, 5)?.map(x =>
                  <Card hoverable className="mx-4 my-2 " key={x.id} style={{ width: "350px", }}>

                    <div className="d-flex flex-column align-items-start gap-3 ">
                      <span>{x.review}</span>
                      <div className="d-flex  align-items-center gap-2">
                        <Avatar src={x.img ?? x.img} alt="studentimg" size={'large'} />
                        <b>{x.name}</b>
                      </div>
                    </div>

                  </Card>
                )
              }
            </Marquee >

          </div>

          <Marquee gradient={false} speed={40} pauseOnHover={true} pauseOnClick={true} delay={0} play={true} direction="left">
            {
              testimonialsData.slice(5)?.map(x =>
                <Card hoverable className="mx-4 my-2 " key={x.id} style={{ width: "350px", }}>

                  <div className="d-flex flex-column align-items-start gap-3 ">
                    <span>{x.review}</span>
                    <div className="d-flex  align-items-center gap-2">
                      <Avatar src={x.img ?? x.img} alt="studentimg" size={'large'} />
                      <b>{x.name}</b>
                    </div>
                  </div>

                </Card>
              )
            }
          </Marquee >



          {/* <div className="section__title section__title-3 mb-30">
            <span className="white-color">Testimonials</span>
            <h2 className="white-color">What students are saying</h2>
          </div> */}

          {/* <div className="row">
            <div className="col-12 ">
              <Slider className="testimonial__slider" {...settings}>
                {testimonialData.map((testimonial, index) => {
                  return (
                    <div key={index} className="testimonial__item ">
                      <div className="col-xl-5 col-lg-6 ">
                        <div className="testimonial__content ">
                          <div className="section__title section__title-3 mb-30">
                            <span className="white-color">{testimonial.title}</span>
                            <h2 className="white-color">{testimonial.subtitle}</h2>
                          </div>
                          <p className="white-color" style={{ fontSize: "18px" }}>
                            {testimonial.content}
                          </p>
                          <div className="testimonial__author d-flex align-items-center">
                            <div className="quote mr-20">
                              <img src="/images/common/quote.png" alt="quote" />
                            </div>
                            <div className="testimonial__info">
                              <h3 className="white-color">{testimonial.name}</h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-7 col-lg-6 ">
                        <div className="testimonial__thumb m-img text-end pt-120">
                          <img src="/images/common/testis.png" alt="testimonial" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div> */}
        </div>
      </section>
    </>
  );
};

export default Testimonials;

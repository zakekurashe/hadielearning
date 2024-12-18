import Image from "next/image";



const Platform = () => {
  return (
    <section id="about" className="pt-80 pb-100 p-relative">
      <div className="container">
        <div className="about__area-2 pt-0">
          <div className="row pt-4">
            <div className="col-xl-7 col-lg-6">
              <div className="about__thumb-2 p-relative m-img  text-center ">
                <Image height={500} width={600} src="/images/about/compress/abouthadi.webp" alt="" />
              </div>
            </div>
            <div className="col-xl-5 col-lg-6">
              {/* <Fade right> */}
              <div className="about__content">
                <div className="section__title section__title-3 mb-25">
                  <h2>
                    How Hadi has <br /> evolved
                  </h2>
                </div>
                <p>
                  Introducing Hadi E-Learning, empowering Pakistani youth with technical knowledge. Our mascot, Hadi, symbolizes leadership, mentorship, and friendship, guiding
                  youth towards success. With free IT courses, we provide opportunities for all. Let Hadi be your career consultant and leader, unlocking doors to a prosperous
                  future. Join us on this journey to positively impact the lives of Pakistani youth with one of the best online learning platforms. Together, we can empower our
                  youth and bridge the gap to global opportunities.
                </p>
                {/* <a href="#mission" className="z-btn">
                  Hadi's Mission
                </a> */}
              </div>
              {/* </Fade> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Platform;

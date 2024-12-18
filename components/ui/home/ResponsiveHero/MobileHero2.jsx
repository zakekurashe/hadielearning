import { Button, Tag } from "antd"
import Link from "next/link"
import { BiPen } from "react-icons/bi"
import { BsCaretDown, BsPen } from "react-icons/bs"
import { FaLaptopCode } from "react-icons/fa6";

const MobileHero2 = () => {
  return (
    <section className="hero__area p-relative">
      <img src="/images/grid/header-bg.jpg" alt="background" className="position-absolute " style={{ color: "transparent", zIndex: "-1", top: 0, width: "100%", height: "90vh" }} />
      <div className="hero__shape">

        {/* <img className="one" src="assets/img/icon/slider/03/icon-1.png" alt="" /> */}
        {/* <img className="three" src="assets/img/icon/slider/03/icon-3.png" alt="" />
        <img className="four" src="assets/img/icon/slider/03/icon-4.png" alt="" />
        <img className="five" src="assets/img/icon/slider/03/icon-6.png" alt="" />
        <img className="six" src="assets/img/icon/slider/03/icon-7.png" alt="" />
        <img className="one" src="images/hero/enrolled_students.svg" alt="" height={20} /> */}
        {/* <div className="icon one ">
          <BsPen size={30} color="#0f3f5d" />
        </div>

        <div className="icon two ">
          <FaLaptopCode size={30} color="#0f3f5d" />
        </div> */}
      </div>
      <div className="hero__item hero__height d-flex align-items-center">
        <div className="container">
          <div className="row">

            <div className="col-xl-12 col-lg-12 d-flex align-items-center">
              <div className="hero__content">
                {/* <span>Welcome to Hadi E-learning</span> */}
                <h1>
                  Welcome to <br /> Hadi E-learning
                </h1>
                <p>Quality IT training in Pakistan. Subsidized courses for accessibility.</p>
                <Link href="/programs" className="z-btn">
                  Explore Programs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MobileHero2
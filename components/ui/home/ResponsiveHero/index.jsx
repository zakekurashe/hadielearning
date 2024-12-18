import React from "react";
import TopHeader from "../../common/TopHeader";
import Hero from "./Hero";
// import MobileHero from "./MobileHero";
import MobileHero2 from "./MobileHero2";

const ResponsiveHero = () => {
  return (
    <>
      <div id="mobile">
        <TopHeader />
        <MobileHero2 />
      </div>


      <div id="web">
        {/* <img src="/images/grid/header-bg.jpg" alt="background" className="position-absolute " style={{ color: "transparent", zIndex: "-1", top: 0, width: "100%" }} /> */}
        <div style={{ position: "absolute", top: 200, right: 0, width: "1px", height: "1px", boxShadow: `100px 100px 100rem 100px #31af98, 100px 0px 200px 10px #0f3f5d` }} />

        <TopHeader />
        <Hero />
      </div>
    </>
  );
};

export default ResponsiveHero;

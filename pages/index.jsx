import Footer from "@/components/ui/common/Footer";
import HomePrograms from "@/components/ui/home/HomePrograms";
// import Stats from "@/components/ui/common/Stats";
import { useScreens } from "@/components/ui/common/screens";
import { API } from "@/config/APIs";
import axios from "axios";
import React from "react";
import ResponsiveHero from "@/components/ui/home/ResponsiveHero";
import HomeAbout from "@/components/ui/home/HomeAbout";
import CTA from "@/components/ui/common/CTA";
// import HomeAboutFeatures from "@/components/ui/home/HomeAboutFeatures";
import Brands from "@/components/ui/common/Brands";
import Testimonials from "@/components/ui/common/Testimoniols";
// import CourseCats from "@/components/ui/home/CourseCats";
import Stats2 from "@/components/ui/common/Stats2";
import Tops from "@/components/ui/common/Tops";
// import HomeAboutFeatures from "@/components/ui/home/HomeAboutFeatures";

const Home = ({ courses, stats }) => {
  const { screen } = useScreens();

  return (
    <>
      <Tops
        title={"Hadi E-learning - An excellent online learning platform"}
        desc={
          "Unlock the door to a bright and prosperous future in the digital world with Hadi-learning, an online learning platform that can help you excel in your career path."
        }
        conLink={"https://hadielearning.com/"}
      />
      <ResponsiveHero />

      {stats && <Stats2 stats={stats} />}

      {/* <HomeAboutFeatures /> */}
      <HomeAbout />
      {/* <CourseCats /> */}
      <div style={{ marginTop: screen.md ? "80px" : !screen.md && "80px" }}>
        <HomePrograms courses={courses} />
      </div>
      <CTA />
      <Testimonials />
      <Brands />

      <Footer />

      {/* {JSON.stringify(courses)} */}
    </>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get(`${API}/courses2`);
  const res = await axios.get(`${API}/stat/all-stats`);

  return {
    props: {
      courses: data.courses,
      stats: res.data,
    },
  };
}

export default Home;

import MissionVission from "@/components/ui/about/MissionVission";
import PageHeading from "@/components/ui/common/PageHeading";
import Stats from "@/components/ui/common/Stats";
import Background from "@/components/ui/about/Background";
import Platform from "@/components/ui/about/Platform";
import React from "react";
import Testimonials from "@/components/ui/common/Testimoniols";
import Footer from "@/components/ui/common/Footer";
import Image from "next/image";
import Stats2 from "@/components/ui/common/Stats2";
import Tops from "@/components/ui/common/Tops";
import { API } from "@/config/APIs";
import axios from "axios";

// import dynamic from 'next/dynamic';

const index = ({ stats }) => {
  return (
    <>
      <Tops
        header
        grid
        title={
          "Build skills with Hadi e-learning: The best virtual learning platform"
        }
        desc={
          "Hadi e-learning is one of the best online learning platforms offering you various IT courses at a subsidized cost so you can get equal opportunities to build a successful career."
        }
        conLink={"https://hadielearning.com/about-us"}
      />

      <PageHeading
        title={"Learn more about Hadi E-learning"}
        para={
          "Hadi E-learning, transforming your career through free IT training."
        }
      />
      <MissionVission />
      {/* <div style={{ marginTop: "80px" }}>
      </div> */}
      <Stats2 stats={stats} />
      <div style={{ marginTop: "80px" }}>
        <Platform />
      </div>
      <div style={{ marginTop: "80px" }}>
        <Background />
      </div>
      <section className="pb-100" style={{ marginTop: "80px" }}>
        <Testimonials />
      </section>
      <Footer />
    </>
  );
};

export async function getServerSideProps() {
  const res = await axios.get(`${API}/stat/all-stats`);

  return {
    props: {
      stats: res.data,
    },
  };
}

export default index;

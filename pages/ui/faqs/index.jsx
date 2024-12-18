"use client";

import React from "react";
import Head from "next/head";
import TopHeader from "@/components/ui/common/TopHeader";
import { faqs_data } from "@/data/faqs";
import { CaretRightOutlined } from "@ant-design/icons";
import { Collapse } from "antd";
import Footer from "@/components/ui/common/Footer";

const FAQs = ({ list = 13, component = true }) => {
  return (
    <>
      <Head>
        <title>FAQs - Hadi E-learning</title>
        <link rel="canonical" href={"https://hadielearning.com/faqs"} />

        <meta name="robots" content="INDEX, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="author" content="Hadi" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [{
              "@type": "Question",
              "name": "What is Hadi E-Learning and what does it offer?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Hadi E-learning is a non-profit initiative that aims to empower the youth of Pakistan by enhancing their digital skills. We have specially structured programs designed by industry experts that will not just improve your IT skill sets but will also give you the right direction to implement them. Through Hadi E-learning we want to provide equal learning opportunities accessible to everyone so they take their first step towards financial independence brimming with confidence."
              }
            },{
              "@type": "Question",
              "name": "How can Hadi E-Learning empower Pakistani youth with technical knowledge?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Hadi E-learning has various specially structured courses to offer. All these courses provide comprehensive knowledge of a particular digital field. These courses are designed to enhance the skill set of the students. Not just that, our courses also provide complete guidance on how to implement the skills they have learned. Hence, empowering the students so they can be financially independent."
              }
            },{
              "@type": "Question",
              "name": "Who is Hadi, and what does he symbolize in the context of Hadi E-Learning?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Hadi is our mascot. In Arabic, Hadi means guide, in this very context we have named our mascot. Hadi, your digital guide will lead you to choose a suitable course, to sharpen your skills through our courses, and then to implement those skills in the right direction."
              }
            },{
              "@type": "Question",
              "name": "What are the benefits of joining Hadi E-Learning?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Here are some benefits of Hadi E-leaning:
Quality IT training at a subsidized cost.
A variety of courses to choose from.
Qualified instructors with field experience.
One-on-one coordination with the instructor.
Interactive live classes.
Flexibility"
              }
            },{
              "@type": "Question",
              "name": "What is the mission of Hadi E-Learning?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Hadi’s mission is to empower the youth with the power of knowledge and skills. We want to provide youngsters with equal learning opportunities that they didn't have access to before. Our goal is to sharpen their digital skills so that they can be financially independent."
              }
            },{
              "@type": "Question",
              "name": "How does Hadi E-Learning ensure the quality of its courses?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "All our courses are designed by industry experts ensuring premium knowledge of a particular field. Also, all our instructors are qualified professionals already making a mark in their relevant fields. They not only provide the students with knowledge of the field but also guide them on how to kickstart their careers."
              }
            },{
              "@type": "Question",
              "name": "How does Hadi E-Learning create opportunities for talented youth?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Hadi E-learning is a welfare initiative providing quality IT training at a subsidized cost. This platform provides learning opportunities to all students. Previously these opportunities were only available for a certain percentage of students due to affordability. With Hadi E-learning this bridge has been gapped as all our programs are accessible to students at a very minimal cost in comparison with the others in the market."
              }
            },{
              "@type": "Question",
              "name": "Are the courses at Hadi E-Learning self-paced or instructor-led?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "All our courses are instructor-led ensuring iterative lessons. In all our classes students can interact with their instructor and ask questions just like in conventional classrooms. Instructors also monitor the progress of the students through assignments and assessments."
              }
            }]
          }`,
          }}
        />
      </Head>

      <TopHeader />

      <div className="container">
        <section className={`faq__area pb-5 pt-${component ? 120 : 20}`} style={{ marginTop: "10px" }}>
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-8 ">
              <div className="mb-4">
                <h2>Frequently Asked Questions</h2>
              </div>

              <div className="faq__accordion p-relative">

                <Collapse
                  items={component ? faqs_data : faqs_data.slice(0, 5)}
                  defaultActiveKey={['1']}
                  bordered={false}
                  size="large"

                  expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                />




              </div>
            </div>
          </div>
        </section>
      </div>

      {component && <Footer />}
    </>
  );
};

export default FAQs;

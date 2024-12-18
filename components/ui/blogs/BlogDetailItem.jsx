"use client";

import { toImageUrl } from "@/config/APIs";
import BlogSidebar from "./BlogsSidebar";
// import * as DOMPurify from 'dompurify';

import renderHTML from "react-render-html";

const BlogDetailItem = ({ blog, categories, recentBlogs, mostView }) => {

  // const sanitizedContent = DOMPurify.default.sanitize(blog?.content);


  return (
    <>
      <section className="blog__area pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-8">
              <div className="blog__details-wrapper mr-50">
                {/* <h2 className="mb-4">{blog?.title}</h2> */}

                <div className="blog__details-thumb w-img mb-45">
                  {/* <img src={blog?.image?.url} alt="blog-image" /> */}

                  {blog?.image?.url?.includes("blogImages") ? <img src={toImageUrl(blog?.image?.url)} alt="workshop_image" /> : <img src={blog?.image?.url} alt="workshop_image" />}
                </div>
                <div className="blog__text mb-25">
                  <p>{blog?.description}</p>
                </div>
                <div className="blog__text mb-25" >
                  {renderHTML(blog?.content)}
                </div>



                <div className="mb-30">
                  <h5>Tags : </h5>
                  <div className="d-flex justify-content-start">
                    {blog?.tags.map((x) => (
                      <span key={x} className="card mx-2  px-3">
                        {x}
                      </span>
                    ))}
                  </div>
                </div>


                <div className="blog__author mb-95 d-sm-flex">
                  <div className="blog__author-img mr-30">
                    <img src={blog?.postedBy?.image?.url} height={"90px"} alt="" />
                  </div>
                  <div className="blog__author-content">
                    <h5>{blog?.postedBy?.name}</h5>
                    <span>{blog?.postedBy?.status}</span>
                    <p>{blog?.postedBy?.exp}</p>
                  </div>
                </div>
              </div>
            </div>

            <BlogSidebar page={"Details"} Categories={categories} RecentBlogs={recentBlogs} mostViewed={mostView} />
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetailItem;

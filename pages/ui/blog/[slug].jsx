"use client";

import axios from "axios";
import React, { useEffect } from "react";
import PageHeading from "@/components/ui/common/PageHeading";
import { API } from "@/config/APIs";
import Footer from "@/components/ui/common/Footer";
import BlogDetailItem from "@/components/ui/blogs/BlogDetailItem";
import Tops from "@/components/ui/common/Tops";

const BlogDetail = ({ blog, categories, recentBlogs, mostView }) => {
  const viewCount = async (x) => {
    try {
      const dataFrom = await axios.get(`${API}/view-count/${x}`);
      console.log(dataFrom);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (blog) viewCount(blog.slug);
  }, [blog]);

  return (
    <>
      <Tops
        header
        title={blog?.seoTitle ? blog?.seoTitle : "Read this blog to explore more about Hadi E-learning"}
        desc={blog?.metaDescription ? blog?.metaDescription : "Here is a blog to have insightful knowledge of Hadi E-learning and the various courses it is offering to you."}

        conLink={`https://hadielearning.com/blog/${blog.slug}`}

      />
      <PageHeading title={blog?.title} para={blog?.description} />

      <BlogDetailItem blog={blog} categories={categories} recentBlogs={recentBlogs} mostView={mostView} />
      <Footer />
    </>
  );
};

export async function getServerSideProps({ params }) {
  const { data } = await axios.get(`${API}/blog/${params.slug}`);

  return {
    props: {
      blog: data.blog,
      categories: data.categories,
      recentBlogs: data.recentBlogs,
      mostView: data.mostView,
    },
  };
}

export default BlogDetail;

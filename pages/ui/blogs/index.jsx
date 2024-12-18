// import BlogsItem from "@/components/ui/blogs/BlogsItem";
import Footer from "@/components/ui/common/Footer";
import PageHeading from "@/components/ui/common/PageHeading";
import TopHeader from "@/components/ui/common/TopHeader";
import Tops from "@/components/ui/common/Tops";
import { API } from "@/config/APIs";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState, useCallback } from "react";

// Dynamic import with SSR disabled for BlogsItem
const BlogsItem = dynamic(() => import("@/components/ui/blogs/BlogsItem"), {
  loading: () => <p className="text-center">Loading...</p>,
  ssr: false,
});

const Blogs = ({ initialBlogs, recentBlogs, categories, mostView }) => {
  const router = useRouter();
  const [allBlogs, setAllBlogs] = useState(initialBlogs);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(Number(router.query.page) || 1);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API}/blogs/${page}?search=${searchQuery}`);
      setAllBlogs((prevBlogs) => (searchQuery ? [...response.data.blogs, ...prevBlogs] : [...prevBlogs, ...response.data.blogs]));
      setTotal(response.data.total);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (page !== 1) fetchBlogs();
  }, [page, searchQuery]);

  useEffect(() => {
    fetchTotalBlogs();
  }, []);

  const fetchTotalBlogs = async () => {
    try {
      const { data } = await axios.get(`${API}/blog-count`);
      setTotal(data.total);
    } catch (error) {
      console.error("Error fetching blog count:", error);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setPage(1);
    fetchBlogs();


  };
  return (
    <>

      <Tops
        header
        grid
        title={"Some interesting blogs to know more about Hadi E-learning."}
        desc={"Meta description: Interesting blogs to explore more about Hadi E-learning and all the courses Hadi is offering to you. "}
        conLink={`https://hadielearning.com/blogs`}
      />


      <PageHeading
        title={"Explore Hadi E-learning Blogs"}
        para={
          "Explore the future of IT education with Hadi eLearning, your gateway to mastering marketing, graphics, data analysis, and web development. Join a community of learners, where expertise meets innovation, shaping tomorrows digital landscape."
        }
      />
      {!loading && (
        <BlogsItem
          allBlogs={allBlogs}
          RecentBlogs={recentBlogs}
          Categories={categories}
          page={page}
          setPage={setPage}
          total={total}
          loading={loading}
          handleSearch={handleSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          mostViewed={mostView}
          whichPage="blogs"
        />
      )}
      <Footer />
    </>
  );
};

export async function getServerSideProps() {
  const response = await axios.get(`${API}/blogs/1`);
  return {
    props: {
      initialBlogs: response.data.blogs,
      recentBlogs: response.data.recentBlogs,
      categories: response.data.categories,
      mostView: response.data.mostView,
    },
  };
}

export default Blogs;

import BlogsItem from "@/components/ui/blogs/BlogsItem";
import Tops from "@/components/ui/common/Tops";
import { API } from "@/config/APIs";
import axios from "axios";
import { useState } from "react";

const SameCategoryBlogs = ({
  blogs,
  recentBlogs,
  categories,
  mostView,
  category,
}) => {

  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${API}/blog-by-category/${category?.slug}?search=${searchQuery}`
      );
      // setAllBlogs([...data.blogs, ...allBlogs]);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    loadMore();
  };




  return (
    <>
      <Tops
        header
        title={"Explore amazing courses by Hadi E-Learning."}
        desc={"Explore some of the best courses offered by hadi E-learning and pick the best one of your choice. "}
        conLink={`https://hadielearning.com/blogs`}

      />

      <BlogsItem
        allBlogs={blogs}
        RecentBlogs={recentBlogs}
        Categories={categories}
        loading={loading}
        handleSearch={handleSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        mostViewed={mostView}
        whichPage={"blog-by-category"}
        category={category}
      />

    </>
  )
}


export async function getServerSideProps({ params }) {
  const { data } = await axios.get(`${API}/blog-by-category/${params.slug}`);
  return {
    props: {
      blogs: data.blogs,
      recentBlogs: data.recentBlogs,
      categories: data.categories,
      mostView: data.mostView,
      category: data.category,
    },
  };
}


export default SameCategoryBlogs
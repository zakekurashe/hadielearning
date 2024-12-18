import { useBlog } from "@/actions/_blogs";
import CMSLayout from "@/components/panel/cms/CMSLayout";
import BlogListComponent from "@/components/panel/common/BlogListComponent";
import React from "react";

const BlogList = () => {
  return (
    <CMSLayout>
      <BlogListComponent />
    </CMSLayout>
  );
};

export default BlogList;

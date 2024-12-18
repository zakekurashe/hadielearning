import { useBlog } from "@/actions/_blogs";
import IconText from "@/components/ui/common/IconText";
import PanelHeading from "@/components/ui/common/PanelHeading";
import { toImageUrl } from "@/config/APIs";
import { Card, List, Tag } from "antd";
import Link from "next/link";
import React from "react";
import { BiListPlus, BiTrash } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";

const Details = ({ item }) => (
  <div>
    <p>{item.description?.slice(0, 200)}</p>
    <div className="d-flex flex-row gap-3">
      <div>
        <b>Posted By:</b> {item?.postedBy?.name}
      </div>{" "}
      |
      <div>
        <b>Categories:</b> {item?.categories[0]?.name}
      </div>
    </div>
  </div>
);

const BlogListComponent = () => {
  const { list, loading, deleteBlog } = useBlog();

  return (
    <Card>
      <PanelHeading Icon={<BiListPlus />} title="All Blogs" para={"List all the blogs, you can edit and delete blog."} />
      <List
        itemLayout="vertical"
        size="large"
        dataSource={list}
        loading={loading}
        renderItem={(item, index) => (
          <List.Item
            key={index}
            actions={[
              <Link key={"icon-text"} href={`/cms/blog/detail/${item?._id}`}>
                <IconText Icon={<FaEdit />} text="Edit Blog" key={"editblog"} />
              </Link>,
              <IconText key="delete-blog" onClick={() => deleteBlog(item?._id)} Icon={<BiTrash />} text="Delete Blog"  />,
            ]}
            extra={[<img key={"blog-image"} src={item?.image?.url?.includes("blogImages") && item?.image?.url} />]}
          >
            <List.Item.Meta title={<b>{item.title}</b>} description={<Details item={item} />} />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default BlogListComponent;

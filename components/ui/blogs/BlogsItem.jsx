import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import moment from "moment";
import BlogSidebar from "./BlogsSidebar";
import { toImageUrl } from "@/config/APIs";

const BlogsItem = ({ allBlogs, RecentBlogs, Categories, page, setPage, total, loading, handleSearch, searchQuery, setSearchQuery, mostViewed, whichPage }) => {
  const router = useRouter();

  return (
    <section className=" pt-120 pb-120">
      <div className="container">
        <div className="row">
          <div className="col-xl-8 col-lg-8">
            <div className="blog__wrapper mr-50">
              {allBlogs.length === 0 && <h2> Empty: </h2>}

              {allBlogs?.map((x) => (
                <div key={x._id} className="card">
                  <Link className="" href={`/blog/${x.slug}`}>
                    {x.image?.url?.includes("blogImages") ? (
                      <img className="card__image" src={toImageUrl(x.image?.url)} alt="workshop_image" />
                    ) : (
                      <img className="card__image" src={x.image?.url} alt="workshop_image" />
                    )}
                    {/* <img role="button" src={x?.image?.url} className="card__image" alt="Blog Image" /> */}
                  </Link>
                  <div className="card__content">
                    <Link className="postcard__img_link" href={`/blog/${x.slug}`}>
                      <h2 role="button" className="card__content-title">
                        {x?.title}
                      </h2>
                    </Link>
                    <Link className="postcard__img_link" href={`/blog/${x.slug}`}>
                      <p role="button" className="card__content-description">
                        {x.description.substring(0, 120)}...
                      </p>
                    </Link>
                    <div className="card__content-meta">
                      <p className="card__content-meta-views">
                        <b style={{ color: "#0f3f5d" }}>
                          <span className="mx-1"> {x.viewCount}</span>
                          <span>views</span>
                        </b>
                      </p>
                      <p className="card__content-meta-date">
                        <time datetime="2020-05-25 12:00:00">
                          <i style={{ color: "#0f3f5d" }} className="fas fa-calendar-alt mr-2"></i> {moment(x.createdAt).fromNow()}
                        </time>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {whichPage === "blogs" && (
              <>
                {allBlogs?.length < total && (
                  <div className="text-start">
                    <button
                      className="z-btn"
                      onClick={() => {
                        setPage(page + 1);
                        router.push({
                          pathname: "/ui/blogs",
                          query: { page: page + 1 },
                        });
                      }}
                    >
                      {loading ? "loading..." : " Load More"}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          <BlogSidebar
            handleSearch={handleSearch}
            loading={loading}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            RecentBlogs={RecentBlogs}
            Categories={Categories}
            mostViewed={mostViewed}
            page={"allBlogs"}
          />
        </div>
      </div>
    </section>
  );
};

export default BlogsItem;

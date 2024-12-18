import { toImageUrl } from "@/config/APIs";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";

const BlogSidebar = ({ RecentBlogs, Categories, handleSearch, searchQuery, setSearchQuery, mostViewed, loading, page }) => {
  return (
    <div className="col-xl-4 col-lg-4">
      <div className="blog__sidebar">
        <div>
          {page === "allBlogs" && (
            <div className="sidebar__widget mb-50 ">
              <div className="sidebar__widget-content">
                <div className="search">
                  <form onSubmit={handleSearch}>
                    <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    <button type="button">
                      {loading ? (
                        <p>....</p>
                      ) : (
                        <i>
                          <FaSearch />
                        </i>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="sidebar__widget mb-75 ">
          <div className="sidebar__widget-content">
            <div className="sidebar__widget mb-75 ">
              <div className="sidebar__widget-title mb-50">
                <h4>Categories</h4>
              </div>
              <div className="sidebar__widget-content">
                <div className="cat-link">
                  <ul>
                    {Categories?.map((x, index) => (
                      <li key={index}>
                        <Link href={`/blog/category/${x?.slug}`}>{x?.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar__widget mb-75 ">
          <div className="sidebar__widget-title mb-50">
            <h4>Most Viewed Blogs</h4>
          </div>
          <div className="sidebar__widget-content">
            <div className="rc-post">
              <ul>
                {mostViewed?.map((x) => (
                  <li key={x._id} className="d-flex mb-20">
                    <div className="rc-thumb mr-15">
                      <Link href={`/blog/${x.slug}`}>
                        {x.image?.url?.includes("blogImages") ? (
                          <img src={toImageUrl(x.image?.url)} alt="rc-blog" height={"80px"} />
                        ) : (
                          <img src={x?.image?.url} alt="rc-blog" height={"80px"} />
                        )}
                      </Link>
                    </div>
                    <div className="rc-text">
                      <h6>
                        <Link href={`/blog/${x.slug}`}>{x?.title}</Link>
                      </h6>
                      <div className="rc-meta">
                        <span>{x.createdAt.substring(0, 10)}</span>{" "}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="sidebar__widget-title mb-50">
            <h4>Recent Blogs</h4>
          </div>
          <div className="rc-post">
            <ul>
              {RecentBlogs?.map((x) => (
                <li key={x._id} className="d-flex mb-20">
                  <div className="rc-thumb mr-15">
                    <Link href={`/blog/${x?.slug}`}>
                      {x.image?.url?.includes("blogImages") ? (
                        <img src={toImageUrl(x.image?.url)} alt="rc-blog" height={"80px"} />
                      ) : (
                        <img src={x?.image?.url} alt="rc-blog" height={"80px"} />
                      )}
                    </Link>
                  </div>
                  <div className="rc-text">
                    <h6>
                      <Link href={`/blog/${x?.slug}`}>{x?.title}</Link>
                    </h6>
                    <div className="rc-meta">
                      <span>{x.createdAt.substring(0, 10)}</span>{" "}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSidebar;

import { _useMyBatches } from "@/actions/_instructor";
import { toImageUrl } from "@/config/APIs";
import { Card } from "antd";
import Link from "next/link";
import React from "react";

const AllInstBatches = () => {
  const { list, loading } = _useMyBatches();

  return (
    <div className="container mt-100 ">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="page__title-content">
          <h1 className="pragrams-h1 text-center" style={{ fontSize: "40px", color: "#0f3f5d" }}>
            Assign Batches
          </h1>
        </div>
        <p className="text-center mb-4 mt-3" style={{ maxWidth: "800px" }}>
          <em>
            We have got all your digital skill training needs covered with our extensive offered program list. All you have to do is to explore our program list, choose the program
            of your choice, and take your first step toward financial independence.
          </em>
        </p>
        {loading && "Loading..."}
      </div>

      <div className="row mt-50 py-10">
        {list?.map((x) => (
          <div key={x._id} className="col-xl-3 col-lg-3 col-md-6 col-sm-12 mb-4">
            <Link href={`/instructor/batch/${x._id}`}>
              <Card
                hoverable
                style={{
                  width: "100%",
                }}
                cover={
                  <>
                    {x?.courseDetails?.image?.url?.includes("courseImages") ? (
                      <img alt="course-image" src={toImageUrl(x?.courseDetails?.image?.url)} />
                    ) : (
                      <img alt="course-image" src={x?.courseDetails?.image?.url} />
                    )}
                  </>
                }
              >
                <Card.Meta title={x.title} description={x.courseDetails?.title} />
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllInstBatches;

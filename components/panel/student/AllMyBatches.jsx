import React from "react";
import { Card, Col, Row, Skeleton } from "antd";
import { _getAllBatches } from "@/actions/_student";
import { toImageUrl } from "@/config/APIs";
import { FiExternalLink } from "react-icons/fi";
import CTA from "@/components/ui/common/CTA";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/router";

const { Meta } = Card;

const AllMyBatches = () => {
  const [auth] = useAuth();
  const router = useRouter();
  const { myBatches, loading } = _getAllBatches();

  return (
    <>
      {/* main header */}
      <div className="container d-flex flex-column justify-content-center align-items-center mt-100">
        <div className="page__title-content">
          <h1 className="pragrams-h1 text-center" style={{ fontSize: "40px", color: "#0f3f5d" }}>
            My Learning
          </h1>
        </div>
        <p className="text-center mb-4 mt-3" style={{ maxWidth: "800px" }}>
          <em>Track your learning process so you can take your future career steps more carefully and pave the road to a brighter and more prosperous future smartly.</em>
        </p>
      </div>

      <div className="container pt-40 pb-80">
        <Row>
          {loading ? (
            <Col sm={24} md={6} lg={6} className="mx-3">
              <Skeleton />
            </Col>
          ) : myBatches.length > 0 ? (
            myBatches?.map((x) => (
              <Col sm={24} md={6} lg={6} key={x._id}>
                <Card
                  onClick={() => router.push(`/student/learning/${x._id}`)}
                  hoverable
                  style={{ width: 240 }}
                  cover={
                    <>
                      {x.courseDetails?.image?.url?.includes("courseImages") ? (
                        <img alt="coueseImage" src={toImageUrl(x.courseDetails?.image?.url)} />
                      ) : (
                        <img alt="coueseImage" src={x.courseDetails?.image?.url} />
                      )}
                    </>
                  }
                >
                  <Meta
                    title={x.courseDetails?.title}
                    description={
                      <>
                        <b>{x.title}</b>
                        <div className="d-flex justify-content-start align-items-center gap-2">
                          Batch <FiExternalLink />
                        </div>
                      </>
                    }
                  />
                </Card>
              </Col>
            ))
          ) : (
            <div className="col-12 text-center">
              <h5>Sorry {auth?.user?.name}, You don not have any batch.</h5>
              <br />
              <br />
              <br />
              <CTA />
            </div>
          )}
        </Row>
      </div>
    </>
  );
};

export default AllMyBatches;

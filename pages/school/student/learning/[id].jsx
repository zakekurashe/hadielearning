import { _useCurrentStu } from "@/actions/layouts/useGetUser";
import BatchCenteral from "@/components/panel/student/singleBatch/BatchCenteral";
import BatchHeader from "@/components/panel/student/singleBatch/BatchHeader";
import BatchRightCol from "@/components/panel/student/singleBatch/BatchRightCol";
import LeftColMenus from "@/components/panel/student/singleBatch/LeftColMenus";

import { Col, Row } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";

const SingleBatch = () => {
  const router = useRouter();
  const { id } = router.query;
  const { loading } = _useCurrentStu();

  const [showCenteral, setShowCenteral] = useState("desc");

  return (
    <Row style={{ minHeight: "100vh" }}>
      <Col md={4} xs={0} className="fixedColumn leftColumn border-end">
        <LeftColMenus setShowCenteral={setShowCenteral} showCenteral={showCenteral} />
      </Col>
      <Col md={16} xs={24} className="centerColumn ">
        <BatchHeader batchId={id} setShowCenteral={setShowCenteral} showCenteral={showCenteral} />
        {loading && "loading..."}
        <BatchCenteral batchId={id} showCenteral={showCenteral} />
      </Col>
      <Col md={4} xs={0} className=" border-start fixedColumn rightColumn">
        <BatchRightCol />
      </Col>
    </Row>
  );
};

export default SingleBatch;

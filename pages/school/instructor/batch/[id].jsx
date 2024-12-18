import InstBatchRightCol from "@/components/panel/instructor/singleBatch/InstBatchRightCol";
import BatchCenteral from "@/components/panel/student/singleBatch/BatchCenteral";
import BatchHeader from "@/components/panel/student/singleBatch/BatchHeader";
import LeftColMenus from "@/components/panel/student/singleBatch/LeftColMenus";
import { Col, Row } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";

const SingleBatchInstructor = () => {
  const { id } = useRouter().query;
  const [showCenteral, setShowCenteral] = useState("desc");
  return (
    <Row style={{ minHeight: "100vh" }}>
      <Col md={4} xs={0} className="fixedColumn leftColumn border-end">
        <LeftColMenus setShowCenteral={setShowCenteral} showCenteral={showCenteral} />
      </Col>
      <Col md={16} xs={24} className="centerColumn ">
        <BatchHeader batchId={id} setShowCenteral={setShowCenteral} showCenteral={showCenteral} />
        <BatchCenteral batchId={id} showCenteral={showCenteral} from={"instructor"} />
      </Col>
      <Col md={4} xs={0} className=" border-start fixedColumn rightColumn">
        <InstBatchRightCol />
      </Col>
    </Row>
  );
};

export default SingleBatchInstructor;

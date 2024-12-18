import LMSLayout from "@/components/panel/lms/LMSLayout";
import ByCities from "@/components/panel/lms/enrollments/ByCities";
import ByCourseBarChart from "@/components/panel/lms/enrollments/ByCourseBarChart";
import GenderPieChart from "@/components/panel/lms/enrollments/GenderPieChart";
import TrendLineBar from "@/components/panel/lms/enrollments/TrendLineBar";
import PanelHeading from "@/components/ui/common/PanelHeading";
import { styles } from "@/config/styles";
import { Card, Col, Row } from "antd";
import React from "react";
import { FaChartSimple } from "react-icons/fa6";

const EnrollmentCharts = () => {
  return (
    <LMSLayout>
      <div className="mt-3">
        <PanelHeading Icon={<FaChartSimple />} title="Data Visualization" />
      </div>

      <Row>
        <Col lg={24} sm={24} md={24} xs={24} className="my-3">
          <TrendLineBar />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={8} lg={8} className="my-3">
          <GenderPieChart />
        </Col>

        <Col xs={24} sm={24} md={16} lg={16} className="my-3">
          <ByCourseBarChart />
        </Col>
      </Row>

      <Row>
        <Col lg={24} sm={24} md={24} xs={24} className="my-3">
          <div style={{ height: "100%", overflowY: "auto" }}>
            <div style={{ height: "450px" }}>
              <ByCities />
            </div>
          </div>
        </Col>
      </Row>
    </LMSLayout>
  );
};

export default EnrollmentCharts;

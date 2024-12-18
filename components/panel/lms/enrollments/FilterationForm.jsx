import Btn from "@/components/ui/common/Btn";
import { styles } from "@/config/styles";
import { CheckOutlined, } from "@ant-design/icons";
import { Card, Col, DatePicker, Input, Row, Select, Typography } from "antd";
import React from "react";
import { BiExport, BiRefresh, BiReset } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";

const { Option } = Select;

const FilterationForm = ({
  list,
  _values,

  _setValues,
  searchInput,
  fromDate,
  endDate,
  enrollToSelect,
  currentPage,
  courseSelect,
  workshopSelect,
  limit,
  enrollments,
  Reset,
  listLoading, //list loading
  exportToCSV,
  loading,
  Refresh,
  totalDataCount
}) => {
  return (
    <Card>
      <Typography.Title level={5}>🔥 Filterations</Typography.Title>
      <Row justify={"start"}>
        <Col sm={24} lg={6}>
          <Input
            value={searchInput}
            onChange={(e) => _setValues((prev) => ({ ...prev, searchInput: e.target.value }))}
            style={{ ...styles.inputBox }}
            placeholder="Search by name, phone, course"
          />
        </Col>
        <Col sm={24} lg={5} className="m-1 d-flex justify-content-center gap-2">
          <DatePicker value={fromDate} onChange={(v) => _setValues((prev) => ({ ...prev, fromDate: v }))} style={{ ...styles.inputBox }} placeholder="From Date" />
          <DatePicker value={endDate} onChange={(v) => _setValues((prev) => ({ ...prev, endDate: v }))} style={{ ...styles.inputBox }} placeholder="To Date" />
        </Col>
        <Col sm={24} lg={2} className="m-1 ">
          <Select
            value={enrollToSelect}
            onChange={(v) => _setValues((prev) => ({ ...prev, enrollToSelect: v }))}
            style={{ ...styles.inputBox, width: "100%" }}
            placeholder="Choose, Program or Workshop"
          >
            <Option value="program">Programs</Option>
            <Option value="workshop">Workshops</Option>
          </Select>
        </Col>

        {enrollToSelect === "workshop" ? (
          <Col sm={24} lg={4} className="m-1 ">
            <Select
              value={workshopSelect}
              onChange={(v) => _setValues((prev) => ({ ...prev, workshopSelect: v }))}
              style={{ ...styles.inputBox, width: "100%" }}
              placeholder="Choose Workshop"
            >
              {list?.map((x, index) => (
                <Option key={index} value={x.slug}>
                  {x.title}
                </Option>
              ))}
            </Select>
          </Col>
        ) : (
          enrollToSelect === "program" && (
            <Col sm={24} lg={4} className="m-1 ">
              <Select
                value={courseSelect}
                onChange={(v) => _setValues((prev) => ({ ...prev, courseSelect: v }))}
                style={{ ...styles.inputBox, width: "100%" }}
                placeholder="Choose Program"
              >
                {list?.map((x, index) => (
                  <Option key={index} value={x.slug}>
                    {x.title}
                  </Option>
                ))}
              </Select>
            </Col>
          )
        )}
        <Col sm={24} lg={4} className="m-1 ">
          <Select
            value={_values.limit}
            onChange={(e) => {
              _setValues(prev => ({ ...prev, limit: e }));
            }}
            style={{ ...styles.inputBox, width: "100%" }} placeholder="Choose, Limit for export data">
            <Option value={0}>Limit Export</Option>
            <Option value={10}>10 - limit</Option>
            <Option value={20}>20 - limit</Option>
            <Option value={50}>50 - limit</Option>
            <Option value={100}>100 - limit</Option>
            <Option value={200}>200 - limit</Option>
            <Option value={2000}>2000 - limit</Option>
            <Option value={5000}>5000 - limit</Option>
            <Option value={10000}>10000 - limit</Option>
            <Option value={15000}>15000 - limit</Option>
            <Option value={totalDataCount}>{totalDataCount}</Option>
          </Select>
        </Col>
      </Row>
      <div className="my-2 d-flex flex-wrap justify-content-start align-items-center gap-1">
        <Btn className="myBtn" icon={<BiReset size={20} className="textColor" />} onClick={Reset}>
          Reset Filters
        </Btn>
        <Btn className="myBtn" icon={<BiExport size={17} className="textColor" />} onClick={exportToCSV}>
          Export CSV
        </Btn>

        <Btn className="myBtn" loading={loading} icon={<BiRefresh size={20} className="textColor" />} onClick={Refresh}>
          Refresh
        </Btn>

        {_values.todays === 'no' && <Btn className="myBtn-disable" loading={loading} icon={<CheckOutlined size={20} className="textColor" />} onClick={() => _setValues((prev) => ({ ...prev, todays: "yes" }))}>
          Todays Data
        </Btn>}

        {_values.todays === 'yes' && <Btn className="myBtn" loading={loading} icon={<RxCross1 size={20} className="textColor" />} onClick={() => _setValues((prev) => ({ ...prev, todays: "no" }))}>
          Todays Data
        </Btn>}
      </div>
    </Card >
  );
};

export default FilterationForm;

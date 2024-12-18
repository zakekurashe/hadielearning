import { _fetchWorkshopOrCourse } from "@/actions/_applications";
import LMSLayout from "@/components/panel/lms/LMSLayout";
import FilterationForm from "@/components/panel/lms/enrollments/FilterationForm";
import PanelHeading from "@/components/ui/common/PanelHeading";
import { API } from "@/config/APIs";
import { useAuth } from "@/context/authContext";
import { Card, Col, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";
import { RiListSettingsFill } from "react-icons/ri";

import { saveAs } from "file-saver";
import Papa from "papaparse";
import EnrollmentTable from "@/components/panel/lms/enrollments/EnrollmentTable";
import EnrollmentViewModal from "@/components/panel/lms/enrollments/EnrollmentViewModal";

const initValues = {
  searchInput: "",
  fromDate: "",
  endDate: "",
  enrollToSelect: "",
  totalDataCount: null,
  totalPages: null,
  currentPage: 1,
  courseSelect: "",
  workshopSelect: "",
  limit: 10,
  enrollments: [],
  todays: "no"
};

const EnrollmentsApplications = () => {
  const [auth] = useAuth();
  const authToken = auth && auth?.token;

  const [loading, setLoading] = useState(false);
  const [_values, _setValues] = useState(initValues);
  const [currentObj, setCurrentObj] = useState({});
  const [open, setOpen] = useState(false);
  const { searchInput, fromDate, endDate, enrollToSelect, currentPage, courseSelect, workshopSelect, limit, enrollments, totalPages, totalDataCount, todays } = _values;

  const { list, fetchingCourses, fetchingWorkshops, listLoading } = _fetchWorkshopOrCourse(enrollToSelect);

  const fetchingData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${API}/fetch/enrollments?page=${currentPage}&limit=${limit}&search=${searchInput}&fromDate=${fromDate}&endDate=${endDate}&enrollTo=${enrollToSelect}&course=${courseSelect}&workshop=${workshopSelect}&todays=${todays}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      _setValues((prev) => ({ ...prev, enrollments: data.enrollments, totalPages: data.totalPages, totalDataCount: data.total }));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


  useEffect(() => {
    if (authToken) fetchingData();
  }, [authToken, searchInput, fromDate, endDate, enrollToSelect, currentPage, courseSelect, workshopSelect, limit, todays]);

  const Reset = () => {
    _setValues(initValues);
  };

  const dataToCSV = (data) => {
    const csv = Papa.unparse(data, {
      header: true,
    });
    return csv;
  };

  const exportToCSV = () => {
    let _enrollments = [];

    enrollments.map((x) => {
      _enrollments.push({ ...x, dateOfBirth: x.dateOfBirth.slice(0, 10) });
    });

    const csvData = dataToCSV(_enrollments);

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "data.csv");
  };

  const Refresh = () => {
    fetchingData();
  };




  return (
    <LMSLayout>
      <Row>
        <Col sm={24} lg={12}>
          <PanelHeading
            title={"All enrollment list"}
            Icon={<RiListSettingsFill />}
            para={"You can filter enrollment applications by User name, Email, Phone number and Courses. Or you can select any program or workshop."}
          />
        </Col>
        <Col sm={24} lg={12}>
          <div className="d-flex justify-content-end">
            <PanelHeading title={`Total Enrollments: ${totalDataCount}`} Icon={<MdVerified />} />
          </div>
        </Col>
      </Row>

      <FilterationForm
        list={list}
        _values={_values}
        _setValues={_setValues}
        searchInput={searchInput}
        fromDate={fromDate}
        endDate={endDate}
        enrollToSelect={enrollToSelect}
        currentPage={currentPage}
        courseSelect={courseSelect}
        workshopSelect={workshopSelect}
        limit={limit}
        enrollments={enrollments}
        Reset={Reset}
        listLoading={listLoading}
        exportToCSV={exportToCSV}
        loading={loading}
        Refresh={Refresh}
        totalDataCount={totalDataCount}
      />

      <Card className="my-5">
        {auth?.user?.role === "reader" ? <h5>Sorry, you do not have the right to view the data.</h5> : <EnrollmentTable
          enrollments={enrollments}
          totalDataCount={totalDataCount}
          totalPages={totalPages}
          currentPage={currentPage}
          _setValues={_setValues}
          enrollToSelect={enrollToSelect}
          setOpen={setOpen}
          setCurrentObj={setCurrentObj}
        />}
      </Card>

      <EnrollmentViewModal currentObj={currentObj} open={open} setOpen={setOpen} />
    </LMSLayout>
  );
};

export default EnrollmentsApplications;

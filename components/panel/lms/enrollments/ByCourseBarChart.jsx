import PanelHeading from "@/components/ui/common/PanelHeading";
import { API } from "@/config/APIs";
import { useAuth } from "@/context/authContext";
import { Card } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiLogIn } from "react-icons/bi";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const ByCourseBarChart = () => {
  const [auth] = useAuth();
  const authToken = auth && auth?.token;

  const [courseData, setCourseDta] = useState([]);

  useEffect(() => {
    const byGender = async () => {
      try {
        const { data } = await axios.get(`${API}/by-course`);
        setCourseDta(data.courseData);
      } catch (error) {
        toast.error("Failed, try again.");
        console.log(error);
      }
    };

    if (authToken) byGender();
  }, [authToken]);

  return (
    <Card title={<PanelHeading title={"By Course Enrollments"} Icon={<BiLogIn />} />}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={courseData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="course" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#0f3f5d" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default ByCourseBarChart;

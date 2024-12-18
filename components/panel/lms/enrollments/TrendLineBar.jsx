import PanelHeading from "@/components/ui/common/PanelHeading";
import { API } from "@/config/APIs";
import { useAuth } from "@/context/authContext";
import { Card } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiLineChart } from "react-icons/bi";
import { Brush, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const TrendLineBar = () => {
  const [auth] = useAuth();
  const authToken = auth && auth?.token;

  const [enrollmentsByDay, setEnrollmentsByDay] = useState([]);

  useEffect(() => {
    const dataFetching = async () => {
      try {
        const { data } = await axios.get(`${API}/fetch/enrollments/per/day`);
        // console.log(data, "from data fetching");
        setEnrollmentsByDay(data);
      } catch (error) {
        console.log(error);
        toast.error(error);
      }
    };

    if (authToken) dataFetching();
  }, [authToken]);

  const transformingEnrollmentOfEachDay = enrollmentsByDay.map((entry) => ({
    date: entry.date,
    count: entry.count,
  }));

  const sortedEnrollmentByEachDay = transformingEnrollmentOfEachDay.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <>
      <Card title={<PanelHeading title={"Enrollment Trend"} Icon={<BiLineChart />} />}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={sortedEnrollmentByEachDay}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Brush />
            <Line type="monotone" dataKey="count" stroke="#0f3f5d" />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </>
  );
};

export default TrendLineBar;

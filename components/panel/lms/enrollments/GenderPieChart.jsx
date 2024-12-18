import PanelHeading from "@/components/ui/common/PanelHeading";
import { API } from "@/config/APIs";
import { useAuth } from "@/context/authContext";
import { Card, Tooltip } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsGenderAmbiguous } from "react-icons/bs";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";

const GenderPieChart = () => {
  const [auth] = useAuth();
  const authToken = auth && auth?.token;

  const [genderData, setGenderData] = useState([]);

  useEffect(() => {
    const byGender = async () => {
      try {
        const { data } = await axios.get(`${API}/by-gender`);
        // console.log(res, "gender data");
        setGenderData(data.genderData);
      } catch (error) {
        toast.error("Failed, try again.");
        console.log(error);
      }
    };

    if (authToken) byGender();
  }, [authToken]);

  const COLORS = ["#0f3f5d", "#FF8042", "#0088FE", "#FFBB28", "#00C49F", "#FF5555"];

  return (
    <Card title={<PanelHeading title={"Genders"} Icon={<BsGenderAmbiguous />} />}>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie dataKey="count" nameKey="gender" data={genderData} cx="50%" cy="50%" outerRadius={80} fill="#0f3f5d" label>
            {genderData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend formatter={(value, entry, index) => <span style={{ textTransform: "capitalize" }}>{value}</span>} />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default GenderPieChart;

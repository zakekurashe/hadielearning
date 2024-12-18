import PanelHeading from "@/components/ui/common/PanelHeading";
import { API } from "@/config/APIs";
import { useAuth } from "@/context/authContext";
import { Card } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiMap } from "react-icons/bi";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const ByCities = () => {
  const [auth] = useAuth();
  const authToken = auth && auth?.token;

  const [citiesData, setCitiesDta] = useState([]);

  useEffect(() => {
    const ByCities = async () => {
      try {
        const { data } = await axios.get(`${API}/by-cities`);
        setCitiesDta(data.processedData);
        console.log(data.processedData);
      } catch (error) {
        toast.error("Failed, try again.");
        console.log(error);
      }
    };

    if (authToken) ByCities();
  }, [authToken]);

  return (
    <Card title={<PanelHeading title={"By Cities"} Icon={<BiMap />} />}>
      <ResponsiveContainer width="100%" height={14000}>
        <BarChart
          layout="vertical"
          data={citiesData}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid />
          <YAxis dataKey="city" type="category" tickFormatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)} />
          <XAxis dataKey="count" type="number" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Bar dataKey="count" fill="#0f3f5d" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default ByCities;

import { API, baseUrl, toImageUrl } from "@/config/APIs";
import { Button, Drawer, Image, message, Switch, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import CreateStatForm from "./createStatsForm";

const AllStatsAdmin = ({
  stats,
  loading,
  editStats,
  setEditStats,
  selected,
  setSelected,
  setStats,
  deleteStats,
  loadingDelete,
}) => {
  // const [stats, setStats] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [editStats, setEditStats] = useState(false)
  // const [selected, setSelected] = useState({})

  const columns = [
    {
      title: "Icon",
      dataIndex: "svgIcon",
      key: "svgIcon",
      render: (text, record) => (
        <Image
          width={50}
          src={`${baseUrl}/uploads/statIcons/${record.svgIcon}`}
          // src={toImageUrl(record.svgIcon)}
          alt={record.title}
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Enabled",
      dataIndex: "enabled",
      key: "enabled",
      render: (enabled, record) => (
        <Switch
          checked={enabled}
          onChange={(checked) => handleToggleEnabled(record._id, checked)}
        />
      ),
    },

    {
      title: "Action",
      dataIndex: "",
      key: "edit",
      render: (_, record) => (
        <div className="d-flex gap-2">
          <Button
            onClick={() => {
              setSelected(record);
              setEditStats(true);
            }}
            type="dashed"
          >
            Edit
          </Button>
          <Button
            onClick={() => deleteStats(record?._id)}
            loading={loadingDelete}
            className="deleteBtn"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const handleToggleEnabled = async (id, enabled) => {
    try {
      console.log({ enabled });
      const response = await axios.put(`${API}/stat/update-stat/${id}`, {
        enabled,
      });

      // if (!response.ok) {
      //   throw new Error('Failed to update stat');
      // }

      message.success("Stat updated successfully!");
      setStats((prevStats) =>
        prevStats.map((stat) => (stat._id === id ? { ...stat, enabled } : stat))
      );
    } catch (error) {
      console.log(error);
      message.error(error.message);
    }
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={stats}
        rowKey={(record) => record._id}
        loading={loading}
      />

      {/* <DrawerToEdit open={editStats} setOpen={setEditStats} selected={selected} after={fetchStats} setSelected={setSelected} /> */}
    </>
  );
};

export default AllStatsAdmin;

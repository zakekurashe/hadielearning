import { API } from "@/config/APIs";
import { useAuth } from "@/context/authContext";
import { Card, Space, Tooltip } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaFolder } from "react-icons/fa";
import InFolders from "./InFolders";

const StudentBatchFolders = () => {
  const router = useRouter();
  const { id } = router.query;
  const [auth] = useAuth();
  const authToken = auth && auth?.token;
  const [BatchFolders, setBatchFolders] = useState([]);
  const [loading, setLoading] = useState(false);

  const [current, setCurrent] = useState({});
  const [open, setOpen] = useState(false);

  const fetchingOnlyBatchFolders = async (x) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API}/lms/my-all-folders/${x}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setBatchFolders(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed, try again");
    }
  };

  useEffect(() => {
    if (authToken && id) {
      fetchingOnlyBatchFolders(id);
    }
  }, [authToken, id]);

  const CallAgain = () => {
    fetchingOnlyBatchFolders(id);
  };

  return (
    <>
      <Card title="Folders" className="my-4">
        {loading && <>loading..</>}
        <Space wrap>
          {BatchFolders.map((x) => (
            <Tooltip key={x._id} title={x?.name} className="d-flex align-items-center flex-column justify-content-center mx-2">
              <FaFolder
                color="#0f3f5d"
                size={40}
                role="button"
                onClick={() => {
                  setCurrent(x);
                  setOpen(true);
                }}
              />
              <small>{x.name.substring(0, 6)}..</small>
            </Tooltip>
          ))}
        </Space>
      </Card>
      <InFolders CallAgain={CallAgain} open={open} setOpen={setOpen} current={current} setCurrent={setCurrent} auth={auth} BatchFolders={BatchFolders} />
    </>
  );
};

export default StudentBatchFolders;

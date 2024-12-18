import { _useBatches } from "@/actions/_batches";
import LMSLayout from "@/components/panel/lms/LMSLayout";
import ActiveBatchModels from "@/components/panel/lms/batch/ActiveBatchModels";
import BatchTable from "@/components/panel/lms/batch/BatchTable";
import PanelHeading from "@/components/ui/common/PanelHeading";
import { useAuth } from "@/context/authContext";
import { Card } from "antd";
import React, { useState } from "react";
import { MdOutlineChecklist } from "react-icons/md";

const ActiveBatchList = () => {
  const { loading, activeList, markCompleted } = _useBatches("active");
  const [current, setCurrent] = useState({});
  const [open, setOpen] = useState(false);
  const [auth] = useAuth()

  return (
    <LMSLayout>
      <Card>
        <PanelHeading title={"Active Batch List"} Icon={<MdOutlineChecklist />} />
        <div className="my-5" />
        {auth?.user?.role === 'reader' ? <h5>You do not have the right to view the data </h5> :
          <BatchTable from={"active"} loading={loading} list={activeList} markCompleted={markCompleted} setCurrent={setCurrent} setOpen={setOpen} />
        }

        <ActiveBatchModels current={current} open={open} setOpen={setOpen} setCurrent={setCurrent} />
      </Card>
    </LMSLayout>
  );
};

export default ActiveBatchList;

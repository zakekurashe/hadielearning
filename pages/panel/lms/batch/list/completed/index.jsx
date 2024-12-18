import { _useBatches } from "@/actions/_batches";
import LMSLayout from "@/components/panel/lms/LMSLayout";
import ActiveBatchModels from "@/components/panel/lms/batch/ActiveBatchModels";
import BatchTable from "@/components/panel/lms/batch/BatchTable";
import PanelHeading from "@/components/ui/common/PanelHeading";
import { useAuth } from "@/context/authContext";
import { Card } from "antd";
import React, { useState } from "react";
import { MdChecklistRtl } from "react-icons/md";

const CompletedBatchList = () => {
  const { loading, completedList, markCompleted } = _useBatches("completed");
  const [current, setCurrent] = useState({});
  const [open, setOpen] = useState(false);
  const [auth] = useAuth()

  return (
    <LMSLayout>
      <Card>
        <PanelHeading title={"Active Batch List"} Icon={<MdChecklistRtl />} />
        {auth?.user?.role === 'reader' ? <h5>You do not have the right to view the data </h5> : <BatchTable from={"completed"} loading={loading} list={completedList} markCompleted={markCompleted} setCurrent={setCurrent} setOpen={setOpen} />}
        <ActiveBatchModels current={current} setCurrent={setCurrent} open={open} setOpen={setOpen} from={"completed-batches"} />
      </Card>
    </LMSLayout>
  );
};

export default CompletedBatchList;

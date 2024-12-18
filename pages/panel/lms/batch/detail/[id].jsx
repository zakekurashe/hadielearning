import { _useCreateOrUpdateBatches, _useSingleBatchId } from "@/actions/_batches";
import { _useCourseShort } from "@/actions/_course";
import LMSLayout from "@/components/panel/lms/LMSLayout";
import AddBatchForm from "@/components/panel/lms/batch/AddBatchForm";
import PanelHeading from "@/components/ui/common/PanelHeading";
import { EditOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const initDays = {
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
};

const initVals = {
  title: "",
  duration: "",
  limit: 0,
  classes: 0,
  timming: "",
  startDate: "",
  endDate: "",
  courseDetails: "",
  days: initDays,
};

const BatchDetails = () => {
  const router = useRouter();
  const { id } = router?.query;
  const [_values, _setValues] = useState(initVals);
  const { batch, loading: batchLoading } = _useSingleBatchId({ id });
  const { loading, updateSubmit } = _useCreateOrUpdateBatches();
  const { shorts } = _useCourseShort();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    _setValues((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));
  };

  useEffect(() => {
    if (batch) {
      _setValues(batch);
      _setValues((prev) => ({
        ...prev,
        days: {
          ...prev.days,
          monday: batch?.monday,
          tuesday: batch?.tuesday,
          wednesday: batch?.wednesday,
          thursday: batch?.thursday,
          friday: batch?.friday,
          saturday: batch?.saturday,
        },
      }));
    }
  }, [batch]);

  const Creations = (e) => {
    const { days, ...otherValues } = _values;
    console.log({ days, ...otherValues });
    updateSubmit(e, `update-batch/${id}`, { ...otherValues, ...days });
  };

  return (
    <LMSLayout>
      <Card>
        <PanelHeading title={"Edit Batch"} Icon={<EditOutlined />} />
        {batchLoading && <p>Please wait....</p>}
        <AddBatchForm _values={_values} _setValues={_setValues} handleChange={handleChange} courses={shorts} loading={loading} Creations={Creations} />
      </Card>
    </LMSLayout>
  );
};

export default BatchDetails;

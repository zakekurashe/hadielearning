import { _useCreateOrUpdateBatches } from "@/actions/_batches";
import { _useCourseShort } from "@/actions/_course";
import LMSLayout from "@/components/panel/lms/LMSLayout";
import AddBatchForm from "@/components/panel/lms/batch/AddBatchForm";
import PanelHeading from "@/components/ui/common/PanelHeading";
import { Card } from "antd";
import React, { useState } from "react";
import { MdOutlineCreate } from "react-icons/md";

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

const BatchCreate = () => {
  const [_values, _setValues] = useState(initVals);
  const { shorts } = _useCourseShort();
  const { loading, handleSubmit } = _useCreateOrUpdateBatches();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    _setValues((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));
  };

  const Creations = (e) => {
    const { days, ...otherValues } = _values;
    handleSubmit(e, "create-batch", { ...otherValues, ...days });
  };

  return (
    <LMSLayout>
      <Card>
        <PanelHeading title={"Batch Create"} Icon={<MdOutlineCreate />} />
        <AddBatchForm _values={_values} _setValues={_setValues} handleChange={handleChange} courses={shorts} loading={loading} Creations={Creations} />
      </Card>
    </LMSLayout>
  );
};

export default BatchCreate;

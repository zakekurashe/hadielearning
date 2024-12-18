import { API } from "@/config/APIs";
import { Drawer, message } from "antd";
import axios from "axios";
import { useState } from "react";
import CreateStatForm from "./createStatsForm";

const UpdateStat = ({ open, setOpen, selected, after, setSelected }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    const data = new FormData();
    setLoading(true);
    data.append("title", formData.title);
    data.append("number", formData.number);
    data.append("enabled", formData.enabled);
    data.append("icon", formData.icon);

    try {
      const response = await axios.put(
        `${API}/stat/update-stat/${selected?._id}`,
        data
      );
      // console.log(response, "<- response")
      message.success("Stat updated successfully!");
      after();
      setSelected({});
    } catch (error) {
      console.log(error);
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer open={open} onClose={() => setOpen(false)}>
      <CreateStatForm
        onSubmit={handleSubmit}
        loading={loading}
        from="edit"
        initValues={{
          title: selected?.title,
          number: selected?.number,
          enabled: selected?.enabled,
          icon: selected?.svgIcon,
        }}
      />
      {/* {JSON.stringify(selected)} */}
    </Drawer>
  );
};

export default UpdateStat;

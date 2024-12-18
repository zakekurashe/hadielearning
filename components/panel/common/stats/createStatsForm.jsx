import React, { useEffect } from "react";
import { Form, Input, Button, Upload, Switch, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import useForm from "@/actions/common/useForm";

const CreateStatForm = ({ onSubmit, loading, initValues, from = "create" }) => {
  const { values, errors, handleChange, handleFileChange, resetForm } =
    useForm(initValues);

  const handleSubmit = () => {
    if (!values.icon) {
      message.error("Please upload an icon.");
      return;
    }
    if (errors.icon) {
      message.error(errors.icon);
      return;
    }
    console.log("Form values:", values);
    onSubmit(values);
    resetForm();
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <Form.Item label="Title" required>
        <Input
          name="title"
          value={values.title}
          onChange={handleChange}
          placeholder="Enter stat title"
        />
      </Form.Item>
      <Form.Item label="Number" required>
        <Input
          name="number"
          value={values.number}
          onChange={handleChange}
          placeholder="Enter stat number"
          type="number"
        />
      </Form.Item>
      <Form.Item label="Enabled">
        <Switch
          size="small"
          checked={values.enabled}
          onChange={(checked) =>
            handleChange({ target: { name: "enabled", value: checked } })
          }
        />
      </Form.Item>
      <Form.Item label="Upload Icon" required>
        <Upload
          beforeUpload={() => false} // Prevent automatic upload
          accept=".jpg,.jpeg,.png,.webp"
          onChange={handleFileChange}
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        {values.icon && <p>Selected file: {values.icon.name}</p>}
        {errors.icon && <p style={{ color: "red" }}>{errors.icon}</p>}
      </Form.Item>
      <Form.Item>
        <Button className="myBtn" htmlType="submit" loading={loading}>
          {from === "edit" ? "Edit" : "Create Stat"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateStatForm;

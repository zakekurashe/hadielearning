import { Button } from "antd";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { CardieBg } from "./LeftCol";

const Titles = ({ name, from, path, router }) => {
  return (
    <div className="d-flex justify-content-between align-items-center">
      {name}
      {from === "main-page" && (
        <Button onClick={() => router.push(`${path}`)} icon={<FaEdit />} style={{ ...CardieBg, color: "white" }}>
          Edit
        </Button>
      )}
    </div>
  );
};

export default Titles;

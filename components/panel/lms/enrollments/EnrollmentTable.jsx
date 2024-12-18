import React from "react";
import { Table, Space, Pagination, Tag } from "antd";

const EnrollmentTable = ({ enrollments, totalDataCount, totalPages, currentPage, _setValues, setOpen, setCurrentObj, enrollToSelect }) => {
  const pageSize = 10; // Number of items per page
  const pageRangeDisplayed = 5; // Number of page numbers to display in the pagination bar

  const columns = [
    {
      title: "Name",
      dataIndex: "firstName",
      key: "firstName",
      render: (_, record) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "WhatsApp",
      dataIndex: "whatsAppphoneNumber",
      key: "whatsAppphoneNumber",
    },
    enrollToSelect === "workshop"
      ? {
          title: "Workshop",
          dataIndex: "workshop",
          key: "workshop",
          // render: (_, record) => (
          //   // <span>{moment(`${record.createdAt}`).fromNow()}</span>
          //   <span>{record.workshop.slice(0,15)}</span>
          // ),
        }
      : {
          title: "Course",
          dataIndex: "course",
          key: "course",
        },
    {
      title: "At",
      // dataIndex: "createdAt",
      key: "createdAt",
      render: (_, record) => (
        // <span>{moment(`${record.createdAt}`).fromNow()}</span>
        <span>{record.createdAt.slice(0, 10)}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tag
            role="button"
            onClick={() => {
              setOpen(true);
              setCurrentObj(record);
            }}
          >
            View
          </Tag>
        </Space>
      ),
    },
  ];

  const handlePaginationChange = (page) => {
    _setValues((prev) => ({ ...prev, currentPage: page }));
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.min(totalPages, pageRangeDisplayed); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      {enrollToSelect}
      <Table dataSource={enrollments} columns={columns} scroll={{ x: "max-content" }} />
      <div style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
        <Pagination
          current={currentPage}
          total={totalDataCount}
          pageSize={pageSize}
          responsive={true}
          showTotal={(total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`}
          onChange={handlePaginationChange}
        />
      </div>
    </>
  );
};

export default EnrollmentTable;

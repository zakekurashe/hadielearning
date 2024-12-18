import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal, Select, Tag, Avatar, List, Input, Space } from "antd";

import axios from "axios";
import { toast } from "react-hot-toast";
import { API } from "@/config/APIs";

const { Search } = Input;

const AddStuModal = ({ current, openStudentModal, setOpenStudentModal, setCurrent }) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const [addingStudentsLoading, setAddingStudentsLoading] = useState(false);

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/students`, {
        params: {
          page: currentPage,
          search: searchQuery,
        },
      });
      const { users: loadedUsers, totalPages: loadedTotalPages } = response.data;

      setUsers(loadedUsers);
      setTotalPages(loadedTotalPages);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [currentPage, searchQuery]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const AddStudent = async (x, y, stu) => {
    try {
      setAddingStudentsLoading(true);
      const { data } = await axios.put(`${API}/lms/add/${y}/${x}/student`);

      if (data.error) {
        setAddingStudentsLoading(false);
        toast.error(data.error, { position: "bottom-center" });
      } else {
        setAddingStudentsLoading(false);
        toast.success(data.message, { position: "bottom-center" });
        setCurrent((prevState) => ({
          ...prevState,
          enrolledStudents: [...prevState.enrolledStudents, stu],
        }));

        console.log(stu, "add stu from setCurrent");
      }
    } catch (error) {
      setAddingStudentsLoading(false);
      console.log(error, { position: "bottom-center" });
    }
  };

  const handleChange = (value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Modal
        title={`Add Students to ${current.title} -> ${current.courseDetails?.title}`}
        centered
        open={openStudentModal}
        onOk={() => setOpenStudentModal(false)}
        onCancel={() => setOpenStudentModal(false)}
        width={1000}
      >
        <Tag color="green">All Students</Tag>
        <Tag color="red"> Please check carefully payments status </Tag>
        <br />
        <br />
        <Space wrap>
          <Search addonBefore="Students" placeholder="input search text" allowClear value={searchQuery} onChange={handleSearch} style={{ width: 304 }} />
          <Select
            // defaultValue={"Select Page"}
            style={{
              width: 120,
            }}
            placeholder="Select Page"
            onChange={handleChange}
            options={[
              {
                value: 1,
                label: 1,
              },
              {
                value: 2,
                label: 2,
              },
              {
                value: 3,
                label: 3,
              },
              {
                value: 4,
                label: 4,
              },
            ]}
          />
        </Space>
        <List
          className="mt-4"
          itemLayout="horizontal"
          dataSource={users}
          loading={loading || addingStudentsLoading}
          renderItem={(item, index) => (
            <>
              {!current.enrolledStudents.some((x) => x._id === item._id) && (
                <List.Item
                  actions={[
                    <a key="list-loadmore-edit" onClick={() => AddStudent(current._id, item._id, item)}>
                      Add {item.enrolledBatches.includes}
                    </a>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                    title={<a href="https://ant.design">{item.name}</a>}
                    description={
                      <>
                        <Tag color="blue">Assigned Batches : {item.enrolledBatches.length}</Tag>
                      </>
                    }
                  />
                </List.Item>
              )}
            </>
          )}
        />
        {currentPage < totalPages && (
          <div className="text-center">
            <Button onClick={handleLoadMore}>Load More</Button>
          </div>
        )}
      </Modal>
    </>
  );
};

export default AddStuModal;

import react, { useCallback, useEffect, useState } from "react";
import { Button, Modal, Select, Tag, Avatar, List, Input, Space } from "antd";

import axios from "axios";
import { toast } from "react-hot-toast";
import { API } from "@/config/APIs";

const { Search } = Input;

const AddInstructorModal = ({ setCurrent, current, openInstructorModels, setOpenInstructorModels }) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const [addingStudentsLoading, setAddingStudentsLoading] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState({});

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/instructors`, {
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
  }, [currentPage, searchQuery]); // Add API to dependencies if it's a variable

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

  const AddInstructor = async (x, y, inst) => {
    try {
      setAddingStudentsLoading(true);
      // console.log(y, "from add isntructor")

      const { data } = await axios.put(`${API}/lms/add/${x}/teacher`, {
        teacherId: y,
      });

      if (data.error) {
        setAddingStudentsLoading(false);
        toast.error(data.error, { position: "bottom-center" });
      } else {
        toast.success(data.message, { position: "bottom-center" });
        setCurrent({
          ...current,
          teachers: [...current.teachers, inst],
        });
        setUsers(users.filter((x) => x._id !== y));
        setAddingStudentsLoading(false);
      }
      setAddingStudentsLoading(false);
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
        open={openInstructorModels}
        onOk={() => setOpenInstructorModels(false)}
        onCancel={() => setOpenInstructorModels(false)}
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
              {/* {addingStudentsLoading && <>loading...</>} */}
              {!current.teachers.some((x) => x._id === item._id) && (
                <List.Item
                  actions={[
                    <a
                      key="list-loadmore-edit"
                      onClick={() => {
                        AddInstructor(current._id, item._id, item);
                        setCurrentTeacher(item);
                      }}
                    >
                      Add {item?.enrolledBatches?.includes}
                    </a>,
                    // <a key="list-loadmore-more">more</a>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                    title={<a href="https://ant.design">{item.name}</a>}
                    description={
                      <>
                        <Tag color="blue">Assigned Batches : {item?.assignedBatches?.length}</Tag>
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

export default AddInstructorModal;

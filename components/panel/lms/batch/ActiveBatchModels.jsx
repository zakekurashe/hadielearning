import { API } from "@/config/APIs";
import { Button, Descriptions, Divider, List, Modal, Space, Tag } from "antd";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import PaymentModels from "./PaymentModels";
import AddStuModal from "./AddStuModel";
import AddInstructorModal from "./AddInstructorModal";

const ActiveBatchModels = ({ current, open, setOpen, setCurrent }) => {
  const [addPaymentsModel, setAddPaymentsModel] = useState(false);
  const [updatePaymentsModel, setUpdatePaymentsModel] = useState(false);
  const [CurrentStudentForPayments, setCurrentStudentForPayments] = useState({});
  const [certifateLoading, setCertifateLoading] = useState(false);

  const [openStudentModal, setOpenStudentModal] = useState(false);
  const [openInstructorModels, setOpenInstructorModels] = useState(false);

  const UnAssigned = async (sID, bID) => {
    try {
      let ok = confirm("Are you sure?");
      if (ok) {
        const { data } = await axios.put(`${API}/lms/remove/${sID}/${bID}/student`);
        if (data.ok) {
          toast.success("Student UnAssigned");
          setCurrent({
            ...current,
            enrolledStudents: current.enrolledStudents.filter((x) => x._id !== sID),
          });
        } else if (data.error) {
          toast.error("Error");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const UnAssignedTeachers = async (sID, bID) => {
    try {
      let ok = confirm("Are you sure?");
      if (ok) {
        const { data } = await axios.put(`${API}/lms/remove/${bID}/teacher`, {
          teacherId: sID,
        });
        if (data.ok) {
          toast.success("Instructor UnAssigned", { position: "bottom-center" });
          setCurrent({
            ...current,
            teachers: current.teachers.filter((x) => x._id !== sID),
          });
        } else if (data.error) {
          toast.error("Error");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const giveHimCertifications = async (sID, bID) => {
    if (!current.completed) {
      return toast.error("batch is not completed yet:|");
    }

    setCertifateLoading(true);
    try {
      let ok = confirm("Are you sure?");
      if (ok) {
        const { data } = await axios.put(`${API}/lms/certifications/${sID}/${bID}`);
        if (data.ok) {
          const updatedEnrolledStudents = current.enrolledStudents.map((student) => {
            if (student._id === sID) {
              return {
                ...student,
                certifications: [...student.certifications, { batch: bID }],
              };
            }
            return student;
          });
          setCurrent({
            ...current,
            enrolledStudents: updatedEnrolledStudents,
          });
          toast.success("Certifated", { position: "bottom-center" });
          setCertifateLoading(false);
        } else if (data.error) {
          toast.error("Error");
          setCertifateLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderPaymentStatus = (student) => {
    const payment = student.payments.find((p) => p.batch?._id === current._id);

    if (payment && payment.completed) {
      return (
        <>
          {student?.certifications?.find((x) => x.batch === current?._id) ? (
            <Tag role="button" color="#0f3f5d" onClick={() => giveHimCertifications(student?._id, current?._id)}>
              Certified
            </Tag>
          ) : (
            <Tag role="button" color="#0f3f5d" onClick={() => giveHimCertifications(student?._id, current?._id)}>
              Give him certificate
            </Tag>
          )}
        </>
      );
    } else if (payment && !payment.completed) {
      return (
        <Tag
          onClick={() => {
            setCurrentStudentForPayments(student);
            setUpdatePaymentsModel(true);
          }}
          role="button"
          color="#31af98"
        >
          Update payment
        </Tag>
      );
    } else {
      return (
        <Tag
          onClick={() => {
            setAddPaymentsModel(true);
            setCurrentStudentForPayments(student);
          }}
          role="button"
          color="blue"
        >
          Add payment
        </Tag>
      );
    }
  };

  return (
    <>
      <Modal title={`${current?.title}`} centered open={open} onOk={() => setOpen(false)} onCancel={() => setOpen(false)} width={1300}>
        <Descriptions
          title={`${current.courseDetails?.title} `}
          bordered
          column={{
            xxl: 4,
            xl: 3,
            lg: 3,
            md: 3,
            sm: 2,
            xs: 1,
          }}
        >
          <Descriptions.Item label="Conducting Days">
            {current.monday && <Tag>Monday</Tag>}
            {current.tuesday && <Tag>Tuesday</Tag>}
            {current.wednesday && <Tag>Wednesday</Tag>}
            {current.thursday && <Tag>Thursday</Tag>}
            {current.friday && <Tag>Friday</Tag>}
            {current.saturday && <Tag>Saturday</Tag>}
          </Descriptions.Item>
          <Descriptions.Item label="Start - End">
            {current.startDate?.substring(0, 10)} to {current.endDate?.substring(0, 10)}{" "}
          </Descriptions.Item>
          <Descriptions.Item label="timing">{current.timming}</Descriptions.Item>
          <Descriptions.Item label="Durations">{current.duration}</Descriptions.Item>
          <Descriptions.Item label="Enrollment Limits">{current.limit}</Descriptions.Item>
          <Descriptions.Item label="Completed">{current.completed ? "Yes" : "No"}</Descriptions.Item>
          {current.completed === false && (
            <Descriptions.Item label="Settings">
              <Space wrap>
                <Button type="primary" onClick={() => setOpenStudentModal(true)}>
                  Add Students
                </Button>
                <Button type="dashed" role="button" onClick={() => setOpenInstructorModels(true)}>
                  Assign Instructor to this batch
                </Button>
              </Space>
            </Descriptions.Item>
          )}
        </Descriptions>

        <Divider orientation="left">Enrolled Students</Divider>
        <List
          size="small"
          bordered
          dataSource={current?.enrolledStudents}
          renderItem={(item) => (
            <List.Item
              key={item._id}
              actions={[
                <React.Fragment key={3}> {renderPaymentStatus(item)}</React.Fragment>,

                <Tag key={1} role="button" color={item.payments?.find((x) => x.batch._id === current._id)?.completed ? "green" : "blue"}>
                  payments - {item.payments?.length}
                  {item.payments?.find((x) => x.batch._id === current._id) ? "Added" : " Not Added"}
                </Tag>,

                <Tag key={2} role="button" color={!current.completed ? "red" : "gray"} onClick={() => (!current.completed ? UnAssigned(item._id, current._id) : "")}>
                  Un Assign
                </Tag>,
              ]}
            >
              <List.Item.Meta title={item.name} description={item._id} />
            </List.Item>
          )}
        />

        <Divider orientation="left">Assigned Teachers</Divider>
        <List
          size="small"
          bordered
          dataSource={current?.teachers}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Tag key={"unassign"} role="button" color="red" onClick={() => UnAssignedTeachers(item._id, current._id)}>
                  Un Assign
                </Tag>,
              ]}
            >
              <List.Item.Meta title={item.name} description={item._id} />
            </List.Item>
          )}
        />
      </Modal>

      {!current.completed && <AddStuModal current={current} setCurrent={setCurrent} openStudentModal={openStudentModal} setOpenStudentModal={setOpenStudentModal} />}

      {!current.completed && (
        <AddInstructorModal setCurrent={setCurrent} current={current} openInstructorModels={openInstructorModels} setOpenInstructorModels={setOpenInstructorModels} />
      )}

      <PaymentModels
        from="batches"
        batch={current}
        setBatch={setCurrent}
        setUpdatePaymentsModel={setUpdatePaymentsModel}
        updatePaymentsModel={updatePaymentsModel}
        currentStudent={CurrentStudentForPayments}
        setCurrentStudent={setCurrentStudentForPayments}
        addPaymentsModel={addPaymentsModel}
        setAddPaymentsModel={setAddPaymentsModel}
      />
    </>
  );
};

export default ActiveBatchModels;

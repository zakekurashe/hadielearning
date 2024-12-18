import { Descriptions, Modal } from "antd";
import React from "react";

const EnrollmentViewModal = ({ currentObj, open, setOpen }) => {
  return (
    <Modal title={currentObj.firstName + " " + currentObj.lastName} centered open={open} onOk={() => setOpen(false)} onCancel={() => setOpen(false)} width={1000}>
      {/* {JSON.stringify(currentObj)} */}
      <Descriptions bordered column={{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
        <Descriptions.Item label="Email">{currentObj.email}</Descriptions.Item>
        <Descriptions.Item label="ID Card">{currentObj.idCard}</Descriptions.Item>
        <Descriptions.Item label="Date of birth">{currentObj.dateOfBirth}</Descriptions.Item>
        <Descriptions.Item label="Phone Number">{currentObj.phoneNumber}</Descriptions.Item>
        <Descriptions.Item label="WhatsApp Number">{currentObj.whatsAppphoneNumber}</Descriptions.Item>

        <Descriptions.Item label="Parent name">{currentObj.parentName}</Descriptions.Item>
        <Descriptions.Item label="Parent Occupation">{currentObj.parentOccupations}</Descriptions.Item>
        <Descriptions.Item label="Parent Phone">{currentObj.parentPhoneNumber}</Descriptions.Item>
        {/* <br /> */}
        <Descriptions.Item label="Interest">{currentObj.interest}</Descriptions.Item>
        <Descriptions.Item label="Want to achieve">{currentObj.wantToAchieve}</Descriptions.Item>
        <Descriptions.Item label="Enroll Into">{currentObj.enrollTo === "program" ? currentObj?.course : currentObj.workshop}</Descriptions.Item>
        <br />
        <Descriptions.Item label="City">{currentObj.city}</Descriptions.Item>
        <Descriptions.Item label="Address">{currentObj.address}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default EnrollmentViewModal;

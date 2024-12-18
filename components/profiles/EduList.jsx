import {  Card, List } from "antd";
import { useRouter } from "next/router";
import React from "react";
import Titles from "./Titles";
import { BsPen } from "react-icons/bs";
import moment from "moment/moment";

const EduList = ({ from = "main-page", eduList, deleteEducation, setCurrent, setOpen }) => {
  const router = useRouter();
  return (
    <Card title={<Titles name={"Education"} path={"/student/_/education"} from={from} router={router} />} className="mt-10">
      <List
        itemLayout="horizontal"
        dataSource={eduList}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <>
                {from === "editing-page" && (
                  <span className="text-danger" onClick={() => deleteEducation(item._id)}>
                    delete
                  </span>
                )}
              </>,
              <>
                {from === "editing-page" && (
                  <BsPen
                    color="blue"
                    onClick={() => {
                      setCurrent(item);
                      setOpen(true);
                    }}
                  />
                )}
              </>,
            ]}
          >
            <List.Item.Meta
              title={<a>{item.degree}</a>}
              description={
                <div>
                  <b>{item.school}</b>
                  <br />
                  <>
                    {moment(item?.from).format("MMMM YYYY")} - {item?.current ? "Present" : moment(item?.to).format("MMMM YYYY")}
                  </>
                  <br />
                  <>{item.description}</>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default EduList;

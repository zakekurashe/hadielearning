import { styles } from "@/config/styles";
import { Card, Col, Drawer, Row, Statistic } from "antd";
import React from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { BsFolderSymlink } from "react-icons/bs";
import { FaComments } from "react-icons/fa";
import { MdOutlinePlayLesson } from "react-icons/md";
import DescPeiChart from "./DescPeiChart";
import moment from "moment";
import Btn from "@/components/ui/common/Btn";
import { CloseOutlined } from "@ant-design/icons";

const Descriptions = ({

  assets,
  folders,
  lessons,
  comments,
  notice,
  from,

  heading,
  text,
  variant,

  addNotice,
  setHeading,
  setText,
  setVariant,
  open,
  setOpen,
  batchId,
}) => {
  const data = [
    {
      count: assets,
      courseId: "64919002d387054cafdc1b51",
      courseTitle: "Assets",
    },
    {
      count: folders,
      courseId: "64912dd3efcd18b51e4f7803",
      courseTitle: "Folders",
    },
    {
      count: comments,
      courseId: "64912dd3efcd18b51e4f7803",
      courseTitle: "Comments",
    },
    {
      count: lessons,
      courseId: "64912dd3efcd18b51e4f7803",
      courseTitle: "lessons",
    },
  ];

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={6} lg={6}>
          <Card hoverable role="button" bordered={false}>
            <Statistic
              // title="Lessons"
              value={`Lessons ${lessons}`}
              valueStyle={{
                color: "#0f3f5d",
              }}
              prefix={<MdOutlinePlayLesson />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={6} lg={6}>
          <Card hoverable role="button" bordered={false}>
            <Statistic
              value={`folders ${folders}`}
              valueStyle={{
                color: "#0f3f5d",
              }}
              prefix={<BsFolderSymlink />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={6} lg={6}>
          <Card hoverable role="button" bordered={false}>
            <Statistic
              value={`Assets ${assets}`}
              valueStyle={{
                color: "#0f3f5d",
              }}
              prefix={<AiOutlineDownload />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={6} lg={6}>
          <Card hoverable role="button" bordered={false}>
            <Statistic
              value={`Comments ${comments}`}
              valueStyle={{
                color: "#0f3f5d",
              }}
              prefix={<FaComments />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="my-4">
        <Col xs={24} sm={24} md={8} lg={8}>
          <Card bordered={false} title="Total Content">
            <DescPeiChart _data={data} COLORS={["#0f3f5d", "#00C49F", "#FFBB28", "#FF8042"]} />
          </Card>
        </Col>



        {notice ?
          (
            <Col xs={24} sm={24} md={16} lg={16}>
              <Card bordered={false}>
                <div className={`alert alert-${notice?.variant}`} role="alert">
                  <h4 className="alert-heading">{notice.heading}</h4>
                  <p>{notice.text}</p>
                  <hr />
                  <p className="mb-0">{moment(notice.createdAt).fromNow()}</p>
                </div>

                {from === "instructor" && <Btn onClick={() => setOpen(true)}> Update </Btn>}

              </Card>
            </Col>
          ) :
          <Col>
            <Card bordered={false}>
              {from === "instructor" && <Btn onClick={() => setOpen(true)}> Update </Btn>}
            </Card>
          </Col>
        }

      </Row>

      {from === "instructor" && (
        <Drawer
          // style={{ background: "linear-gradient(329deg,#31af98,#0f3f5d)" }}
          placement="right"
          closable={false}
          width={350}
          onClose={() => setOpen(false)}
          open={open}
          extra={<CloseOutlined onClick={() => setOpen(false)} />}
          title={"Update Alert"}
        >
          <div className="form-group">
            <label className="form-label fw-semibold">Heading</label>
            <input
              type="text"
              className="form-control"
              placeholder="Lecture 2 will be conducted on XX-XX-XXXX"
              name="heading"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label fw-semibold">Text</label>
            <textarea type="text" className="form-control" placeholder="type..." name="text" value={text} onChange={(e) => setText(e.target.value)} />
          </div>

          <div className="form-group">
            <label className="form-label fw-semibold">Variant</label>
            <select
              required
              className="form-select"
              value={variant}
              onChange={(e) => {
                setVariant(e.target.value);
              }}
            >
              <option value="">Choose</option>
              <option value="info">Info - Light Blue (mostly used)</option>
              <option value="danger">Red</option>
              <option value="success">Green</option>
              <option value="warning">Yellow</option>
            </select>
          </div>
          <br />
          <Btn onClick={() => addNotice(batchId)}>Update</Btn>
        </Drawer>
      )}
    </>
  );
};

export default Descriptions;

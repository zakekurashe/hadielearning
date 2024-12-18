import { _useBatchComments } from "@/actions/_student";
import Btn from "@/components/ui/common/Btn";
import { styles } from "@/config/styles";
import { useAuth } from "@/context/authContext";
import { MessageOutlined } from "@ant-design/icons";
import { Avatar, Card, Form, List } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { BiTrash } from "react-icons/bi";
import ReplyModel from "./ReplyModel";
import { toImageUrl } from "@/config/APIs";

const IconText = ({ icon, text, onClick }) => (
  <div onClick={onClick} className="d-flex align-items-center gap-1">
    {React.createElement(icon)}
    {text}
  </div>
);

const BatchComments = ({ from = "student" }) => {
  const [auth] = useAuth();
  const authToken = auth && auth?.token;
  const { id } = useRouter().query;

  const {
    loading: gettingLoading,
    fetchingOnlyBatchComments,
    setComment,
    comment,
    batchComments,
    replyModal,
    setReplyModal,
    currentComment,
    setCurrentComment,
    handleSubmit,
    deleteComment,
  } = _useBatchComments();

  useEffect(() => {
    if (authToken) {
      fetchingOnlyBatchComments(id);
    }
  }, [authToken]);

  return (
    <>
      <Card>
        <div className="d-flex flex-column">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="rounded-2 border border-secondary px-3 py-1 mb-2"
            style={{ color: styles.primaryColor }}
          />
        </div>
        <Btn onClick={() => handleSubmit(id)}>Submit</Btn>
      </Card>

      <hr />
      <div className="container">
        <List
          itemLayout="vertical"
          size="large"
          loading={gettingLoading}
          dataSource={batchComments}
          renderItem={(item) => (
            <List.Item
              style={{
                backgroundColor: "white",
                borderRadius: "10px",
                marginBottom: "15px",
              }}
              key={item._id}
              actions={[
                <IconText
                  onClick={() => {
                    setReplyModal(true);
                    setCurrentComment(item);
                  }}
                  icon={MessageOutlined}
                  text="Reply"
                  key="list-vertical-message"
                />,
                <>
                  {(auth?.user?._id === item?.commentBy?._id || from === "instructor") && (
                    <BiTrash key={"delete-comment"} role="button" onClick={() => deleteComment(id, item?._id)} />
                  )}
                </>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <>
                    {item?.commentBy?.image?.url?.includes("profileImage") ? (
                      <Avatar src={toImageUrl(item?.commentBy?.image?.url)}></Avatar>
                    ) : (
                      <Avatar src={item?.commentBy?.image?.url}></Avatar>
                    )}
                  </>
                }
                // avatar={<Avatar src={item.commentBy?.image?.url} />}
                title={
                  <>
                    <strong>{item?.commentBy?.name}</strong> -<small style={{ fontWeight: "normal" }}>{moment(item?.createdAt).fromNow()}</small>
                  </>
                }
                description={<span className="text-dark">{item?.text}</span>}
              />
            </List.Item>
          )}
        />
      </div>

      <ReplyModel current={currentComment} setCurrent={setCurrentComment} open={replyModal} setOpen={setReplyModal} />
    </>
  );
};

export default BatchComments;

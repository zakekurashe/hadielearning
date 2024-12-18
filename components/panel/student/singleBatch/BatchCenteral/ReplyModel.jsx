import { _useBatchCommentReply } from "@/actions/_student";
import { useAuth } from "@/context/authContext";
import { Avatar, Card, List, Modal } from "antd";
import React, { useEffect } from "react";
import moment from "moment";
import { styles } from "@/config/styles";
import Btn from "@/components/ui/common/Btn";
import { toImageUrl } from "@/config/APIs";

const ReplyModel = ({ current, setCurrent, open, setOpen }) => {
  const [auth] = useAuth();
  const authToken = auth && auth?.token;

  const { fetchingAllComments, handleSubmit, deleteComment, comment, setComment, allComments, fetchingLoading, loading } = _useBatchCommentReply();

  useEffect(() => {
    if (authToken && current._id) {
      fetchingAllComments(current._id);
    }
  }, [authToken, current._id]);

  return (
    <Modal
      title={current.name}
      centered
      width={700}
      open={open}
      onOk={() => {
        setOpen(false);
      }}
      onCancel={() => setOpen(false)}
      footer={null}
    >
      <div style={{ marginTop: "20px" }}>
        <div
          style={{
            backgroundColor: "#ededed",
            padding: "20px",
            borderRadius: "5px",
            marginBottom: "10px",
          }}
        >
          <strong>{current.commentBy?.name}</strong> -<small style={{ fontWeight: "normal" }}>{moment(current.createdAt).fromNow()}</small>
          <br />
          <p>{current.text} </p>
        </div>
        <hr />
        <Card>
          <div className="d-flex flex-column">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="rounded-2 border border-secondary px-3 py-1 mb-2"
              style={{ color: styles.primaryColor }}
            />
          </div>
          <Btn onClick={() => handleSubmit(current._id)}>Submit</Btn>
        </Card>
        <br />
        <List
          itemLayout="vertical"
          size="large"
          loading={fetchingLoading}
          dataSource={allComments}
          renderItem={(item) => (
            <List.Item
              key={item._id}
              actions={[
                <>
                  {auth?.user?._id === item.replyBy._id && (
                    <span role="button" className="text-danger" onClick={() => deleteComment(current._id, item._id)}>
                      delete
                    </span>
                  )}
                </>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <>
                    {item.replyBy?.image?.url?.includes("profileImage") ? (
                      <Avatar src={toImageUrl(item.replyBy?.image?.url)}></Avatar>
                    ) : (
                      <Avatar src={item.replyBy?.image?.url}></Avatar>
                    )}
                  </>
                }
                // avatar={<Avatar src={item.replyBy?.image?.url} />}
                title={
                  <>
                    <strong>{item.replyBy?.name}</strong> -<small style={{ fontWeight: "normal" }}>{moment(item.createdAt).fromNow()}</small>
                  </>
                }
                description={item.text}
              />
            </List.Item>
          )}
        />
      </div>
    </Modal>
  );
};

export default ReplyModel;

import { _useBatchFoldersInst } from "@/actions/_instructor";
import Btn from "@/components/ui/common/Btn";
import IconText from "@/components/ui/common/IconText";
import { toImageUrl } from "@/config/APIs";
import { styles } from "@/config/styles";
import { useAuth } from "@/context/authContext";
import { CloseOutlined } from "@ant-design/icons";
import { Card, Drawer, List } from "antd";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { BiFolder, BiTrash } from "react-icons/bi";

const InstBatchFolders = () => {
  const { id } = useRouter().query;
  const batchId = id;

  const [auth] = useAuth();
  const authToken = auth && auth?.token;
  const { fetchingAllFolders, AddFolder, deleteFolder, list, name, setName, loading, current, setCurrent, openFolder, setOpenFolder, removeAssignments } = _useBatchFoldersInst();

  useEffect(() => {
    if (authToken && batchId) {
      fetchingAllFolders(batchId);
    }
  }, [authToken, batchId,]);

  return (
    <>
      <Card>
        <h4 style={{ color: styles.primaryColor }}>Add Folders</h4>
        <form onSubmit={() => AddFolder(batchId)}>
          <label>Name</label>
          <input type="text" className="form-control" name="name" value={name} onChange={(e) => setName(e.target.value)} />
          <br />
        </form>

        <Btn type="submit" loading={loading} onClick={() => AddFolder(batchId)}>
          Add New
        </Btn>
      </Card>

      <br />

      <Card>
        <List
          loading={loading}
          style={{ maxWidth: "500px" }}
          itemLayout="vertical"
          dataSource={list}
          renderItem={(item) => (
            <List.Item
              actions={[
                <IconText key={1} Icon={<BiTrash color="red" role="button" onClick={() => deleteFolder(item._id, batchId)} />} />,
                <IconText
                  key={2}
                  Icon={
                    <BiFolder
                      role="button"
                      color={styles.primaryColor}
                      onClick={() => {
                        setCurrent(item);
                        setOpenFolder(true);
                      }}
                    />
                  }
                />,
              ]}
            >
              <List.Item.Meta
                title={
                  <div style={{ color: styles.primaryColor }}>
                    {item.name} ({item.data?.length})
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Card>

      <Drawer
        // style={{ background: "linear-gradient(329deg,#31af98,#0f3f5d)" }}
        placement="right"
        closable={false}
        width={350}
        onClose={() => setOpenFolder(false)}
        open={openFolder}
        extra={<CloseOutlined onClick={() => setOpenFolder(false)} />}
        title={current?.name}
      >
        <List
          dataSource={current.data}
          itemLayout="horizontal"
          renderItem={(item) => (
            <List.Item actions={[<BiTrash key={1} role="button" onClick={() => removeAssignments(current._id, item._id)} />]}>
              <List.Item.Meta title={<a onClick={() => window.open(toImageUrl(item.file))}>{item.file_name}</a>} />
            </List.Item>
          )}
        />
      </Drawer>
    </>
  );
};

export default InstBatchFolders;

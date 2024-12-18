import { _useBatchLessonInst } from "@/actions/_instructor";
import { styles } from "@/config/styles";
import { CheckCircleOutlined, CloseOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { IoTrashOutline } from "react-icons/io5";
import { MdPlayLesson } from "react-icons/md";
import { navsStyle } from "@/components/ui/common/active";
import Btn from "@/components/ui/common/Btn";

const InstLesson = () => {
  const { id } = useRouter().query;
  const batchId = id;
  const { list, loading, deleteItem, addItem, makeItCompleteItem, title, description, setTitle, setDescription, uploadOpen, setUploadOpen } = _useBatchLessonInst(batchId);

  return (
    <>
      <div className="mb-4 px-2">
        <div className="d-flex justify-content-between align-items-center mt-3 mb-4" style={{ color: styles.primaryColor, ...navsStyle }}>
          <div className="d-flex justify-content-center align-items-center gap-2">
            <MdPlayLesson /> Lessons
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-3 mb-4" style={{ color: styles.primaryColor }}>
          <Button icon={<UploadOutlined />} onClick={() => setUploadOpen(true)} size="small">
            Upload
          </Button>
        </div>

        {loading && <p className="text-center">....</p>}
        {list.length === 0 ? (
          <p className="text-center">No Data</p>
        ) : (
          <div className="customScrollbar">
            {list.map((x, index) => (
              <div key={index} className="d-flex flex-column justify-content-start align-items-start mb-3 px-1" style={{ color: styles.primaryColor }}>
                <div>
                  <span>{x.title}</span>
                  <small>{x.description}</small>
                </div>
                <div className="d-flex justify-content-center align-items-center gap-2">
                  {/* <CheckCircleOutlined color={"blue"} role="button" onClick={makeItCompleteItem} /> */}
                  <IoTrashOutline color="red" role="button" onClick={() => deleteItem(x._id)} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Drawer
        placement="right"
        closable={false}
        width={350}
        onClose={() => setUploadOpen(false)}
        open={uploadOpen}
        extra={<CloseOutlined onClick={() => setUploadOpen(false)} />}
        title={"Upload Assets"}
      >
        <div className="form-group">
          <label className="form-label fw-semibold">File Title</label>
          <input type="text" className="form-control" placeholder="Lecture Title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="form-group">
          <label className="form-label fw-semibold">Description</label>
          <textarea type="text" className="form-control file-control" name="description" value={description} onChange={(e) => setDescription(e.target.value)} required={true} />
          <div className="form-text">Description within 100 words</div>
        </div>

        <Btn loading={loading} className="my-3" onClick={addItem}>
          Add Asset
        </Btn>
      </Drawer>
    </>
  );
};

export default InstLesson;

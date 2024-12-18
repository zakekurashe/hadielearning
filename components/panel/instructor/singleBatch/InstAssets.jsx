import { toImageUrl } from "@/config/APIs";
import { styles } from "@/config/styles";
import { CloseOutlined, DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import React from "react";
import { MdWebAsset } from "react-icons/md";
import { navsStyle } from "@/components/ui/common/active";
import { Button, Drawer } from "antd";
import { IoTrashOutline } from "react-icons/io5";
import Btn from "@/components/ui/common/Btn";

const InstAssets = ({ assetLoading, assets, deleteAsset, addAsset, handleChange, uploadOpen, setUploadOpen, uploadingFile, setUploadingFile, title, setTitle }) => {
  return (
    <>
      <div className="mb-4 px-2">
        <div className="d-flex justify-content-between align-items-center mt-3 mb-4" style={{ color: styles.primaryColor, ...navsStyle }}>
          <div className="d-flex justify-content-center align-items-center gap-2">
            <MdWebAsset /> Assets
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-3 mb-4" style={{ color: styles.primaryColor }}>
          <Button icon={<UploadOutlined />} onClick={() => setUploadOpen(true)} size="small">
            Upload
          </Button>
        </div>

        {assetLoading && <p className="text-center">....</p>}
        {assets.length === 0 ? (
          <p className="text-center">No Data</p>
        ) : (
          <div className="customScrollbar">
            {assets.map((x, index) => (
              <div key={index} className="d-flex justify-content-between align-items-center mb-3 px-1" style={{ color: styles.primaryColor }}>
                <span>{x.title}</span>
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <DownloadOutlined onClick={() => window.open(toImageUrl(x.file))} />
                  <IoTrashOutline color="red" role="button" onClick={() => deleteAsset(x._id)} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Drawer
        // style={{ background: "linear-gradient(329deg,#31af98,#0f3f5d)" }}
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
          <label className="form-label fw-semibold">Select Asset/File</label>
          <input
            accept=".pdf,.js,.docx,.jsx,.json,.jpg,.jpeg,.png,.pptx,.xlsx,.txt"
            type="file"
            className="form-control file-control"
            name="file"
            onChange={(e) => handleChange(e)}
            required={true}
          />
          <div className="form-text">Upload file size less than or equal 1MB!</div>
          <div className="form-text">Formats: .pdf,.js,.docx,.jsx,.json,.jpg,.jpeg,.png,.pptx,.xlsx,.txt</div>
        </div>

        <Btn loading={assetLoading} className="my-3" onClick={addAsset}>
          Add Asset
        </Btn>
      </Drawer>
    </>
  );
};

export default InstAssets;

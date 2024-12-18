import { styles } from "@/config/styles";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { Drawer, Grid, Input } from "antd";
import React, { useEffect, useState } from "react";
import LeftColMenus from "./LeftColMenus";
import { MdWebAsset } from "react-icons/md";
import { FiExternalLink } from "react-icons/fi";
import BatchRightCol from "./BatchRightCol";
import { useAuth } from "@/context/authContext";
import InstBatchRightCol from "../../instructor/singleBatch/InstBatchRightCol";
import Btn from "@/components/ui/common/Btn";
import { _useUpdateClassLink } from "@/actions/_batches";

const { useBreakpoint } = Grid;

const BatchHeader = ({ setShowCenteral, showCenteral, batchId }) => {
  const [auth] = useAuth();
  const { updateClassId, loading, classLink, setClassLink, fetchClassLink } = _useUpdateClassLink();
  const role = auth?.user?.role;


  const points = Grid.useBreakpoint();

  const breakpoints = useBreakpoint();
  const [drawerVisibility, setDrawerVisibility] = useState(false);
  const [drawerVisibility2, setDrawerVisibility2] = useState(false);
  const [updateClassLink, setupdateClassLink] = useState(false);


  useEffect(() => {
    if (auth?.token) {
      fetchClassLink(batchId)
    }
  }, [auth?.token, batchId])

  return (
    <>
      <div className="pb-2 border-bottom d-flex flex-row justify-content-between align-items-center ">
        {!breakpoints.md && <MenuOutlined style={{ color: styles.primaryColor }} onClick={() => setDrawerVisibility(true)} />}
        {breakpoints.md && <span style={{ color: styles.primaryColor, fontWeight: "600" }}>Welcome {auth?.user?.name}</span>}
        <div className="d-flex flex-row justify-content-center align-items-center gap-2" style={{ color: styles.primaryColor, fontWeight: "600" }}>
          <span className="d-flex flex-row justify-content-center align-items-center gap-1 border-end px-1">
            {role === "student" ? (
              <a href={classLink} target="_" className="d-flex justify-content-center align-items-center gap-1 _link" role="button">
                Join Class
              </a>
            ) : (
              role === "instructor" && (
                <div onClick={() => setupdateClassLink(true)} className="" role="button">
                  Update Link
                </div>
              )
            )}
          </span>
          {!points.md && (
            <span className="d-flex flex-row justify-content-center align-items-center " onClick={() => setDrawerVisibility2(true)}>
              <MdWebAsset />
              Assets
            </span>
          )}
        </div>
      </div>
      <Drawer
        // style={{ background: "linear-gradient(329deg,#31af98,#0f3f5d)" }}
        placement="left"
        closable={false}
        width={250}
        onClose={() => setDrawerVisibility(false)}
        open={drawerVisibility}
        extra={<CloseOutlined onClick={() => setDrawerVisibility(false)} />}
      >
        <LeftColMenus setShowCenteral={setShowCenteral} showCenteral={showCenteral} />
      </Drawer>

      <Drawer
        // style={{ background: "linear-gradient(329deg,#31af98,#0f3f5d)" }}
        placement="right"
        closable={false}
        width={250}
        onClose={() => setDrawerVisibility2(false)}
        open={drawerVisibility2}
        extra={<CloseOutlined onClick={() => setDrawerVisibility2(false)} />}
      >
        {role === "student" && <BatchRightCol />}
        {role === "instructor" && <InstBatchRightCol />}
      </Drawer>

      <Drawer
        style={{ borderTopLeftRadius: "40px", borderTopRightRadius: "40px" }}
        placement="bottom"
        closable={false}
        width={250}
        onClose={() => setupdateClassLink(false)}
        open={updateClassLink}
        extra={<CloseOutlined onClick={() => setupdateClassLink(false)} />}
      >

        <div className="d-flex flex-column justify-content-start align-items-center " >
          <Input value={classLink} onChange={e => setClassLink(e.target.value)} style={{ maxWidth: "600px" }} placeholder="Update class link e:g https://something.com/someid123" className="mb-2" />
          <Btn loading={loading} onClick={() => updateClassId(batchId, classLink)}>Update</Btn>
        </div>

      </Drawer>
    </>
  );
};

export default BatchHeader;

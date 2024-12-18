import { _useBatchInfo } from "@/actions/_student";
import PanelHeading from "@/components/ui/common/PanelHeading";
import { useAuth } from "@/context/authContext";
import React, { useEffect } from "react";
import Descriptions from "./Descriptions";
import StudentBatchFolders from "./Folders";
import BatchComments from "./Comments";
import { _useBatchInfoInst } from "@/actions/_instructor";
import InstBatchFolders from "@/components/panel/instructor/singleBatch/InstBatchFolders";

const BatchCenteral = ({ batchId, showCenteral, from = "student" }) => {
  const [auth] = useAuth();
  const authToken = auth && auth?.token;
  const { assets, folders, lessons, comments, notice, infoLoading, gettingStatsBatch, batch } = _useBatchInfo();
  const {
    batch: instBatch,
    assets: instAssets,
    folders: instFolders,
    lessons: instLessons,
    comments: instComments,
    loading: instLoading,
    gettingData: instGettingData,
    notice: instNotice,
    heading,
    text,
    variant,
    getNotice,
    addNotice,
    setHeading,
    setText,
    setVariant,
    open,
    setOpen,
  } = _useBatchInfoInst();

  useEffect(() => {
    if (authToken) {
      if (from === "student") gettingStatsBatch(`lms/stu-batch-stats/${batchId}`);
      else if (from === "instructor") {
        instGettingData(batchId);
        getNotice(batchId);
      }
    }
  }, [authToken, batchId]);

  return (
    <>
      {(infoLoading || instLoading) && <p>loading...</p>}
      <div className="my-4">
        <PanelHeading title={from === "student" ? batch?.title : instBatch?.title} batch={batch} />
      </div>
      {showCenteral === "desc" && (
        <>
          {from === "student" ? (
            <Descriptions from={from} assets={assets} folders={folders} lessons={lessons} comments={comments} notice={notice} />
          ) : (
            <Descriptions
              heading={heading}
              text={text}
              variant={variant}
              setHeading={setHeading}
              setVariant={setVariant}
              setText={setText}
              addNotice={addNotice}
              from={from}
              assets={instAssets}
              folders={instFolders}
              lessons={instLessons}
              comments={instComments}
              batch={instBatch}
              notice={instNotice}
              open={open}
              setOpen={setOpen}
              batchId={batchId}
            />
          )}
        </>
      )}
      {showCenteral === "folders" && from === "student" && <StudentBatchFolders />}
      {showCenteral === "folders" && from === "instructor" && <InstBatchFolders />}
      {showCenteral === "comments" && <BatchComments from="instructor" />}
    </>
  );
};

export default BatchCenteral;

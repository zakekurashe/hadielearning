import { styles } from "@/config/styles";
import { CheckCircleFilled, DownloadOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { MdPlayLesson, MdWebAsset } from "react-icons/md";
import { navsStyle } from "@/components/ui/common/active";
import { Divider } from "antd";
import { useAuth } from "@/context/authContext";
import axios from "axios";
import { API, toImageUrl } from "@/config/APIs";
import { useRouter } from "next/router";
import { _useBatchAssetLessons } from "@/actions/_student";

const BatchRightCol = () => {
  const [auth] = useAuth();
  const authToken = auth && auth?.token;
  const { id } = useRouter().query;
  const { fetchingOnlyBatchLessons, fetchingSingleData, allAssets, assetloading, batchLessons, lessonsLoading } = _useBatchAssetLessons();

  useEffect(() => {
    if (authToken && id) {
      fetchingSingleData(id);
      fetchingOnlyBatchLessons(id);
    }
  }, [authToken, id]);

  return (
    <>
      <div className="mb-4 px-2">
        <div className="d-flex justify-content-between align-items-center mt-3 mb-4" style={{ color: styles.primaryColor, ...navsStyle }}>
          <div className="d-flex justify-content-center align-items-center gap-2">
            <MdWebAsset /> Assets
          </div>
        </div>
        {assetloading && <p className="text-center">....</p>}
        {allAssets.length === 0 ? (
          <p className="text-center">No Data</p>
        ) : (
          <div className="customScrollbar">
            {allAssets.map((x, index) => (
              <div key={index} className="d-flex justify-content-between align-items-center mb-3 px-1" style={{ color: styles.primaryColor }}>
                <span>{x.title}</span>
                <DownloadOutlined onClick={() => window.open(toImageUrl(x.file))} />
              </div>
            ))}
          </div>
        )}
      </div>
      <Divider />
      <div className="mb-4 px-2">
        <div className="d-flex justify-content-between align-items-center mt-3 mb-4" style={{ color: styles.primaryColor, ...navsStyle }}>
          <div className="d-flex justify-content-center align-items-center gap-2">
            <MdPlayLesson /> Lessons
          </div>
        </div>
        {lessonsLoading && <p className="text-center">....</p>}

        {batchLessons.length === 0 ? (
          <p className="text-center">No Data</p>
        ) : (
          <div className="customScrollbar">
            {batchLessons?.map((x, index) => (
              <div key={index} className="d-flex flex-column justify-content-start align-items-start mb-3 px-1" style={{ color: styles.primaryColor }}>
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <b>{x?.title}</b>
                  {x.completed && <CheckCircleFilled />}
                </div>
                <p>{x?.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default BatchRightCol;

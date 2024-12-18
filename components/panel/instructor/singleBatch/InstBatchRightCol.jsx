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
import { _useBatchAssetInst } from "@/actions/_instructor";
import InstAssets from "./InstAssets";
import InstLesson from "./InstLesson";

const InstBatchRightCol = () => {
  const [auth] = useAuth();
  const { id } = useRouter().query;

  const { assetLoading, assets, deleteAsset, deleteAssets, addAsset, handleChange, uploadOpen, setUploadOpen, uploadingFile, setUploadingFile, title, setTitle } =
    _useBatchAssetInst(id);




  return (
    <>
      <InstAssets
        assetLoading={assetLoading}
        assets={assets}
        deleteAsset={deleteAsset}
        deleteAssets={deleteAssets}
        addAsset={addAsset}
        handleChange={handleChange}
        uploadOpen={uploadOpen}
        setUploadOpen={setUploadOpen}
        uploadingFile={uploadingFile}
        setUploadingFile={setUploadingFile}
        title={title}
        setTitle={setTitle}
      />
      <Divider />
      <InstLesson />
    </>
  );
};

export default InstBatchRightCol;

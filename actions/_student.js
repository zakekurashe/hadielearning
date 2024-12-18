import { API } from "@/config/APIs";
import { useAuth } from "@/context/authContext";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const _getAllBatches = () => {
  const [auth] = useAuth();
  const authToken = auth && auth?.token;

  const [myBatches, setMyBatches] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllMyBatches = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API}/lms/stu-all-batches`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setLoading(false);
      setMyBatches(data.enrolledBatches);
    } catch (error) {
      toast.error("Failed, try again");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authToken) {
      getAllMyBatches();
    }
  }, [authToken]);

  return { loading, myBatches };
};

export const _useBatchInfo = () => {
  const [infoLoading, setInfoLoading] = useState(false);
  const [assets, setAssets] = useState(0);
  const [folders, setFolders] = useState(0);
  const [lessons, setLessons] = useState(0);
  const [comments, setComments] = useState(0);
  const [notice, setNotice] = useState({});
  const [batch, setBatch] = useState({});

  const gettingStatsBatch = async (_api) => {
    setInfoLoading(true);
    try {
      const { data } = await axios.get(`${API}/${_api}`);

      setAssets(data.assets);
      setFolders(data.folders);
      setLessons(data.lessons);
      setComments(data.comments);
      setBatch(data.batch);
      setNotice(data.notice);
    } catch (error) {
      console.log(error);
      toast.error("Try Again");
    } finally {
      setInfoLoading(false);
    }
  };

  return {
    infoLoading,
    gettingStatsBatch,
    assets,
    folders,
    lessons,
    comments,
    notice,
    batch,
  };
};

export const _useBatchComments = () => {
  const [auth] = useAuth();
  const [batchComments, setBatchComments] = useState([]);
  const [loading, setLoading] = useState([]);
  const [replyModal, setReplyModal] = useState(false);
  const [currentComment, setCurrentComment] = useState({});
  const [comment, setComment] = useState("");

  const fetchingOnlyBatchComments = async (x) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API}/lms/all-comments/${x}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setBatchComments(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed, try again");
    }
  };

  const handleSubmit = async (x) => {
    // e.preventDefault();
    if (!comment) {
      return toast.error("please write a message");
    }
    setLoading(true);
    const { data } = await axios.post(
      `${API}/lms/add-comment/${x}`,
      { text: comment },
      {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      }
    );

    if (data.ok) {
      fetchingOnlyBatchComments(x);
      setComment("");
      toast.success("added");
      setLoading(false);
    }
    try {
    } catch (error) {
      setLoading(false);
      toast.error("Failed, please try again");
    }
  };

  const deleteComment = async (batchId, commentId) => {
    try {
      const { data } = await axios.delete(`${API}/lms/delete-comment/${commentId}`, {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });

      if (data.ok) {
        toast.success("deleted");
        fetchingOnlyBatchComments(batchId);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed, try again");
    }
  };

  return {
    fetchingOnlyBatchComments,
    batchComments,
    loading,
    replyModal,
    setReplyModal,
    currentComment,
    setCurrentComment,
    comment,
    setComment,
    handleSubmit,
    deleteComment,
  };
};

export const _useBatchCommentReply = () => {
  const [auth] = useAuth();

  const [allComments, setAllComments] = useState([]);
  const [fetchingLoading, setFetchingLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchingAllComments = async (commentId) => {
    try {
      setFetchingLoading(true);
      const { data } = await axios.get(`${API}/lms/all-replies/${commentId}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setAllComments(data);
      setFetchingLoading(false);
    } catch (error) {
      setFetchingLoading(false);
      console.log(error);
    }
  };

  const handleSubmit = async (commentId) => {
    if (!comment) {
      return toast.error("please write a message");
    }
    setLoading(true);
    const { data } = await axios.post(
      `${API}/lms/add-reply/${commentId}`,
      { text: comment },
      {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      }
    );

    if (data.ok) {
      setLoading(false);
      setComment("");
      toast.success("added");
      fetchingAllComments(commentId);
    }
    try {
    } catch (error) {
      setLoading(false);
      toast.error("Failed, please try again");
    }
  };

  const deleteComment = async (commentId, replyId) => {
    try {
      const { data } = await axios.delete(`${API}/lms/delete-reply/${replyId}`, {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });

      if (data.ok) {
        toast.success("deleted");
        fetchingAllComments(commentId);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed, try again");
    }
  };

  return {
    fetchingAllComments,
    handleSubmit,
    deleteComment,
    comment,
    setComment,
    allComments,
    fetchingLoading,
    loading,
  };
};

export const _useBatchAssetLessons = () => {
  const [auth] = useAuth();
  const [allAssets, setAllAssets] = useState([]);
  const [assetloading, setAssetLoading] = useState(false);

  const [batchLessons, setBatchLessons] = useState([]);
  const [lessonsLoading, setLessonsLoading] = useState(false);

  const fetchingSingleData = async (x) => {
    try {
      setAssetLoading(true);
      const { data } = await axios.get(`${API}/lms/stu-assets/${x}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setAssetLoading(false);
      setAllAssets(data);
    } catch (error) {
      toast.error("Failed, try again");
    }
  };

  const fetchingOnlyBatchLessons = async (x) => {
    try {
      setLessonsLoading(true);
      const { data } = await axios.get(`${API}/lms/my-all-lessons/${x}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setBatchLessons(data);
      setLessonsLoading(false);
    } catch (error) {
      setLessonsLoading(false);
      toast.error("Failed, try again");
    }
  };

  return {
    fetchingOnlyBatchLessons,
    fetchingSingleData,
    allAssets,
    assetloading,
    batchLessons,
    lessonsLoading,
  };
};

export const _useFolders = () => {};

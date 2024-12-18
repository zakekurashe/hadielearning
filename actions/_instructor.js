import { API } from "@/config/APIs";
import { useAuth } from "@/context/authContext";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const _useMyBatches = () => {
  const [auth] = useAuth();
  const authToken = auth && auth?.token;
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const myBatches = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/lms/inst/my-batches`);

      if (data.error) {
        return toast.error(data.error);
      }
      setList(data.batches);
    } catch (error) {
      console.log(error);
      toast.error("Failed, try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authToken) {
      myBatches();
    }
  }, [authToken]);

  return { loading, list };
};

export const _useInstAssets = () => {
  const [auth] = useAuth();
  const authToken = auth && auth?.token;

  const [uploadingFile, setUploadingFile] = useState();
  const [title, setTitle] = useState("");

  const [openModel, setOpenModel] = useState(false);
  const [current, setCurrent] = useState({});

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchingBatchAssets = async (x) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API}/lms/all-assets/${x}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setList(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { files } = e.target;
    const file = e.target.files[0];
    const allowedExtensions = ["pdf", "js", "docx", "jsx", "json", "jpg", "jpeg", "png", "pptx", "xlsx", "txt"];

    if (file) {
      let fileExtension = file.name.split(".").pop().toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        toast.error("Unsupported file type!");
        e.target.value = null;
      } else if (allowedExtensions.includes(fileExtension)) {
        let fileSize;
        fileSize = files[0].size / 1024 / 1024;
        if (fileSize > 1) {
          toast.error("The file size greater than 5 MB. Make sure less than 5 MB.", {
            style: {
              border: "1px solid #ff0033",
              padding: "16px",
              color: "#ff0033",
            },
            iconTheme: {
              primary: "#ff0033",
              secondary: "#FFFAEE",
            },
          });
          e.target.value = null;
          return;
        }
        setUploadingFile(files[0]);
      }
    }
  };

  return {
    list,
    loading,
    fetchingBatchAssets,
    handleChange,
  };
};

export const _useBatchInfoInst = () => {
  const [auth] = useAuth();

  const [batch, setBatch] = useState({});
  const [assets, setAssets] = useState(0);
  const [folders, setFolders] = useState(0);
  const [lessons, setLessons] = useState(0);
  const [comments, setComments] = useState(0);
  const [loading, setLoading] = useState(false);

  // for notice
  const [notice, setNotice] = useState({});
  const [heading, setHeading] = useState("");
  const [text, setText] = useState("");
  const [variant, setVariant] = useState("");
  const [open, setOpen] = useState(false);

  const gettingData = async (x) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API}/lms/batch-stats/${x}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setBatch(data.batch);
      setAssets(data.assets);
      setFolders(data.folders);
      setLessons(data.lessons);
      setComments(data.comments);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed, try again");
    }
  };

  const getNotice = async (batchId) => {
    try {
      const { data } = await axios.get(`${API}/lms/get-notice/${batchId}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });

      console.log(data, "inst notice");
      setNotice(data);
    } catch (error) {
      toast.error("Failed, try again");
    }
  };

  const addNotice = async (batchId) => {
    if (!text || !variant || !heading) {
      return toast.error("All fields are required");
    }
    try {
      const { data } = await axios.post(
        `${API}/lms/add-update-notice/${batchId}`,
        {
          variant,
          text,
          heading,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      if (data.ok) {
        toast.success("added");
        setHeading("");
        setVariant("");
        setText("");
        getNotice(batchId);
      }
    } catch (error) {
      toast.error("Failed, try again");
    }
  };

  return {
    batch,
    assets,
    folders,
    lessons,
    comments,
    loading,
    gettingData,

    notice,
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
  };
};

export const _useBatchFoldersInst = () => {
  const [auth] = useAuth();
  const [list, setList] = useState([]);

  const [name, setName] = useState("");

  const [current, setCurrent] = useState({});
  const [openFolder, setOpenFolder] = useState(false);

  const [loading, setLoading] = useState(false);

  const fetchingAllFolders = async (x) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API}/lms/all-folders/${x}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setList(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const AddFolder = async (batchId) => {
    try {
      const { data } = await axios.post(
        `${API}/lms/create-folder/${batchId}`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      if (data.ok) {
        fetchingAllFolders(batchId);
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  const deleteFolder = async (commentId, batchId) => {
    // const ok = confirm("Are you sure?");
    // if (ok) {
    try {
      const { data } = await axios.delete(`${API}/lms/delete-folder/${commentId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (data.ok) {
        fetchingAllFolders(batchId);
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
    // }
  };

  const removeAssignments = async (x, y) => {
    const addAssignmentsURL = `${API}/lms/remove-assignment/${x}/${y}`;

    try {
      const { data } = await axios.put(addAssignmentsURL, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (data.ok) {
        fetchingBatchItems(id);
      }
    } catch (error) {
      // toast.error(error);
      console.log(error);
    }
  };

  return {
    fetchingAllFolders,
    AddFolder,
    deleteFolder,
    list,
    name,
    setName,
    loading,

    current,
    setCurrent,
    openFolder,
    setOpenFolder,
    removeAssignments,
  };
};

export const _useBatchAssetInst = (batchId) => {
  const [auth] = useAuth();
  const authToken = auth && auth?.token;
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  const [uploadingFile, setUploadingFile] = useState();
  const [title, setTitle] = useState("");

  const [open, setOpen] = useState(false);

  const fetchingBatchAssets = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/lms/all-assets/${batchId}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setList(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authToken && batchId) {
      fetchingBatchAssets();
    }
  }, [authToken, batchId]);

  const deleteAssets = async (assetId) => {
    const ok = confirm("Are you sure?");
    if (ok) {
      try {
        const { data } = await axios.delete(`${API}/lms/delete-asset/${assetId}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        if (data.ok) {
          fetchingBatchAssets();
        }
      } catch (error) {
        toast.error(error);
        console.log(error);
      }
    }
  };

  const addAsset = async () => {
    try {
      setLoading(true);
      const _formData = new FormData();

      _formData.append("title", title);
      _formData.append("file", uploadingFile);

      const { data } = await axios.post(`${API}/lms/new-asset/${batchId}`, _formData, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });

      if (data.ok) {
        setTitle("");
        setUploadingFile("");
        fetchingBatchAssets();
        setLoading(false);
        toast.success("Done");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { files } = e.target;
    const file = e.target.files[0];
    const allowedExtensions = ["pdf", "js", "docx", "jsx", "json", "jpg", "jpeg", "png", "pptx", "xlsx", "txt"];

    if (file) {
      let fileExtension = file.name.split(".").pop().toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        toast.error("Unsupported file type!");
        e.target.value = null;
      } else if (allowedExtensions.includes(fileExtension)) {
        let fileSize;
        fileSize = files[0].size / 1024 / 1024;
        if (fileSize > 1) {
          toast.error("The file size greater than 5 MB. Make sure less than 5 MB.", {
            style: {
              border: "1px solid #ff0033",
              padding: "16px",
              color: "#ff0033",
            },
            iconTheme: {
              primary: "#ff0033",
              secondary: "#FFFAEE",
            },
          });
          e.target.value = null;
          return;
        }
        setUploadingFile(files[0]);
      }
    }
  };

  return {
    assetLoading: loading,
    assets: list,
    deleteAsset: deleteAssets,
    addAsset,
    handleChange,
    uploadOpen: open,
    setUploadOpen: setOpen,

    uploadingFile,
    setUploadingFile,
    title,
    setTitle,
  };
};

export const _useBatchLessonInst = (batchId) => {
  const [auth] = useAuth();
  const authToken = auth && auth?.token;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploadOpen, setUploadOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  const fetchingLessons = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/lms/all-lessons/${batchId}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setList(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authToken && batchId) {
      fetchingLessons();
    }
  }, [authToken, batchId]);

  const deleteItem = async (lessonId) => {
    const ok = confirm("Are you sure?");
    if (ok) {
      try {
        const { data } = await axios.delete(`${API}/lms/delete-lesson/${lessonId}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        if (data.ok) {
          fetchingLessons();
        }
      } catch (error) {
        toast.error(error);
        console.log(error);
      }
    }
  };

  const addItem = async () => {
    if (!title || !description) {
      return toast.error("Title and description are required.");
    }
    if (description.length > 100) {
      return toast.error("Description should be short (100 words).");
    }

    try {
      const { data } = await axios.post(
        `${API}/lms/new-lesson/${batchId}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      if (data.ok) {
        fetchingLessons(batchId);
        setUploadOpen(false);
        setTitle("");
        setDescription("");
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  const makeItCompleteItem = async () => {
    try {
      const makeItURL = `${API}/lms/make-lesson-complete/${batchId}`;
      const { data } = await axios.put(makeItURL, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (data.ok) {
        fetchingLessons(batchId);
        toast.success("Make it completed");
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  return { list, loading, deleteItem, addItem, makeItCompleteItem, title, description, setTitle, setDescription, uploadOpen, setUploadOpen };
};

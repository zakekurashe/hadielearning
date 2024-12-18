import { API } from "@/config/APIs";
import { useAuth } from "@/context/authContext";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";



export const _useBatches = (from) => {
  const [auth] = useAuth();
  const AuthToken = auth && auth?.token;

  const [activeList, setActiveList] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getActiveBatch = async () => {
    try {
      const { data } = await axios.get(`${API}/lms/active-batches`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      console.log(data, "data");
      setActiveList(data);
      console.log(activeList, "acttive lists");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const getCompletedBatch = async () => {
    try {
      const { data } = await axios.get(`${API}/lms/completed-batches`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setCompletedList(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    if (AuthToken) {
      if (from === "active") {
        getActiveBatch();
      } else if (from === "completed") {
        getCompletedBatch();
      }
    }
  }, [AuthToken]);

  const markCompleted = async (x) => {
    try {
      const ok = confirm("Are you sure? Please check all the dates");
      if (ok) {
        setLoading(true);
        const { data } = await axios.put(`${API}/lms/make-batch/${x}/complete`, {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });
        setLoading(false);
        toast.success(data.message);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return { loading, activeList, completedList, markCompleted };
};

export const _useCreateOrUpdateBatches = () => {
  const [loading, setLoading] = useState(false);
  const [auth] = useAuth();

  const handleSubmit = async (e, _api, payloadData) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post(`${API}/lms/${_api}`, payloadData, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });

      if (data.ok) {
        setLoading(false);
        toast.success("Batch Created :)");
      } else if (data.error) {
        setLoading(false);
        return toast.error(data.error);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const updateSubmit = async (e, _api, payloadData) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = axios.put(`${API}/lms/${_api}`, payloadData, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });

      if (data.ok) {
        setLoading(false);
        toast.success("Batch Created :)");
      } else if (data.error) {
        setLoading(false);
        return toast.error(data.error);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return { loading, handleSubmit, updateSubmit };
};

export const _useSingleBatchId = ({ id }) => {
  // state
  const [batch, setBatch] = useState({});
  const [loading, setLoading] = useState(true);
  const [auth] = useAuth();

  useEffect(() => {
    if (auth && auth.token) getSingleBatch({ id });
  }, [auth && auth.token, id]);

  const getSingleBatch = async () => {
    try {
      const { data } = await axios.get(`${API}/lms/single-batch/${id}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setBatch(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return { batch, loading };
};

export const _useUpdateClassLink = () => {
  const [loading, setLoading] = useState(false);
  const [auth] = useAuth();
  const [classLink, setClassLink] = useState("");

  const fetchClassLink = async (x) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API}/lms/class-link/${x}`);
      console.log(data, "here isthe class link");
      setClassLink(data.classLink);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const updateClassId = async (x, classLink) => {
    try {
      setLoading(true);
      const { data } = await axios.patch(
        `${API}/lms/add-class-link/${x}`,
        { classLink },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Class Link Updated");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return { updateClassId, loading, fetchClassLink, classLink, setClassLink };
};

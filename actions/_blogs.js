import { API } from "@/config/APIs";
import { useAuth } from "@/context/authContext";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useCreateBlog = (from = "create") => {
  const [auth] = useAuth();
  const [loading, setLoading] = useState(false);

  const create = async (_api, values) => {
    const _formData = new FormData();
    _formData.append("title", values.title);
    _formData.append("content", values.content);
    _formData.append("outlines", values.slug);
    _formData.append("image", values.image); // Assuming `image` is the File object from an input type="file"
    _formData.append("description", values.description);
    _formData.append("seoTitle", values.seoTitle);
    _formData.append("metaDescription", values.metaDescription);

    _formData.append("tags", values.tags);
    values.categories.forEach((category) => {
      _formData.append("categories", category);
    });

    try {
      setLoading(true);
      if (from === "create") {
        const { data } = await axios.post(`${API}/${_api}`, _formData, {
          headers: {
            Authorization: auth && auth.token && `Bearer ${auth?.token}`,
          },
        });

        if (data?.error) {
          toast.error(data.error, { position: "bottom-center" });
          setLoading(false);
        } else {
          toast.success("Action is done successfully", {
            position: "bottom-center",
          });
          setLoading(false);
        }
      }

      if (from === "edit") {
        const { data } = await axios.put(`${API}/${_api}`, _formData, {
          headers: {
            Authorization: auth && auth.token && `Bearer ${auth?.token}`,
          },
        });

        if (data?.error) {
          toast.error(data.error, { position: "bottom-center" });
          setLoading(false);
        } else {
          toast.success("Action is done successfully", {
            position: "bottom-center",
          });
          setLoading(false);
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Post create failed. Try again.");
      setLoading(false);
    }
  };

  return { create, loading };
};

export const useBlog = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [auth] = useAuth();

  const fetchingAllBlogs = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API}/blogs-for-admin`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setList(data);
      setLoading(false);
    } catch (error) {
      toast.error("Failed, try again.");
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth && auth.token) fetchingAllBlogs();
  }, [auth && auth.token]);

  const deleteBlog = async (id) => {
    try {
      const confirmed = window?.confirm("Are you sure you want to delete this blog?");

      if (confirmed) {
        const { data } = await axios.delete(`${API}/blog/${id}`, {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });
        fetchingAllBlogs();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { list, loading, deleteBlog };
};

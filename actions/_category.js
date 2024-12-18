import { API } from "@/config/APIs";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useCategory = () => {
  const [categoriesList, setCategoriesList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCategories = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/categories`);
      // console.log(data);
      setCategoriesList(data);
    } catch (err) {
      console.log(err);
      toast.error("Failed, try again.");
    } finally {
      setLoading(false);
    }
  };

  const DeleteCategory = async (id) => {
    try {
      const { data } = await axios.delete(`${API}/category/${id}`);
      getCategories();
      // setCategoriesList(categoriesList.filter((cat) => cat.slug !== id));
      toast.success("Category deleted");
    } catch (err) {
      console.log(err);
      toast.error("Category delete falied");
    }
  };

  const addCategory = async (e, category, setCategory) => {
    e.preventDefault();
    if (!category) {
      toast.error("Please give it a name");
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.post(`${API}/category`, { name: category });
      getCategories();
      setCategory("");
      setLoading(false);
      toast.success("Category created successfully");
    } catch (err) {
      toast.error("Duplicate error. Try different name.");
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return { categoriesList, loading, getCategories, DeleteCategory, addCategory };
};

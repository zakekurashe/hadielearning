import { API } from "@/config/APIs";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export const useAccounts = () => {
  const [loading, setLoading] = useState(false);

  const create_account = async (e, email, password, role, name, status) => {
    e.preventDefault();

    if (!email || !password || !role || !name || !status) {
      toast.error("All fields are required", { position: "bottom-center" });
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.post(`${API}/register`, {
        email,

        password,
        role,
        name,
        status,
      });
      if (data.error) {
        setLoading(false);
        return toast.error(data.error);
      } else {
        setLoading(false);
        toast.success(`${name} is registered as ${role} `);
      }
    } catch (err) {
      console.log("err => ", err);
      setLoading(false);
      toast.error("Register failed. Try again.");
    }
  };

  return { create_account, loading };
};

import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { API } from "@/config/APIs";
import { useAuth } from "@/context/authContext";

export const useMyProfile = () => {
  const [auth] = useAuth();
  const authToken = auth && auth?.token;

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [triggerFetch, setTriggerFetch] = useState(false);

  const gettingMyProfile = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/my-profile`);
      if (data.ok) {
        setProfile(data._profile);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed, try again");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authToken) {
      gettingMyProfile();
    }
  }, [authToken, triggerFetch]);

  return { profile, loading, refetch: () => setTriggerFetch(!triggerFetch) };
};

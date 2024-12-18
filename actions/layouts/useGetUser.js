import { API } from "@/config/APIs";
import { useAuth } from "@/context/authContext";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export const _useCurrentStu = () => {
  const [auth] = useAuth();
  const authToken = auth && auth?.token;
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const getCurrentStudent = async () => {
    try {
      const { data } = await axios.get(`${API}/current-student`);
      if (data.ok) {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      router.push("/");
    }
  };

  useEffect(() => {
    if (authToken) {
      getCurrentStudent();
    }
  }, [authToken]);

  return { loading };
};

export const _useStuInst = () => {
  const [loading, setLoading] = React.useState(false);
  const [auth] = useAuth();
  const authToken = auth && auth?.token;
  const router = useRouter();

  React.useEffect(() => {
    if (authToken) {
      getStuInst();
    }
  }, [authToken]);

  const getStuInst = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API}/current-student-or-instructor`);
      if (data.ok) {
        setLoading(false);
      } else if (data.error) {
        setLoading(false);
        router.push("/");
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      router.push("/");
    }
  };

  return { loading };
};

const useGetUser = (_api) => {
  const [loading, setLoading] = React.useState(true);
  const [auth] = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (auth?.token) {
      getCurrentUser();
    }
  }, [auth?.token]);

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get(`${API}/${_api}`);
      if (data.ok) {
        setLoading(false);
      } else if (data.error) {
        setLoading(false);
        router.push("/");
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      router.push("/");
    }
  };

  return { loading };
};

export default useGetUser;

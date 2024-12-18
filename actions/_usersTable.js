"use client";
import { API } from "@/config/APIs";
import { useAuth } from "@/context/authContext";
import axios from "axios";
import { useEffect, useState } from "react";

export const usersTable = () => {
  const [auth] = useAuth();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchingAllUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API}/admin/all-user`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });

      setList(data.users);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth && auth.token) fetchingAllUsers();
  }, [auth && auth.token]);

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      let ok = window?.confirm("Are you sure?");
      if (ok) {
        const { data } = await axios.delete(`${API}/admin/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });
        fetchingAllUsers();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { list, loading, deleteUser };
};

export const useTeachers = () => {
  const [auth] = useAuth();
  const [instLoading, setInstLoading] = useState(false);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchingTeachers = async () => {
      try {
        setInstLoading(true);
        const { data } = await axios.get(`${API}/get-all-instructors`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setTeachers(data);

        setInstLoading(false);
      } catch (error) {
        setInstLoading(false);
        console.log(error);
        toast.error("Try Again");
      }
    };

    if (auth && auth.token) fetchingTeachers();
  }, [auth && auth.token]);

  return { instLoading, teachers };
};


export const _AllStudents = () => {
  
}

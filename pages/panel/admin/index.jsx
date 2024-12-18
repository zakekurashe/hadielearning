import AdminLayout from "@/components/panel/admin/AdminLayout";
import React from "react";
import { useAuth } from "../../../context/authContext";

const Admin = () => {

  const [auth] = useAuth()


  return <AdminLayout>
    {
      auth?.user?.role === "admin" ? <p>Welcome Mr. Admin</p>
        : <p>You are currently login with viewer account, so you will have limited options only..</p>
    }
  </AdminLayout>;
};

export default Admin;

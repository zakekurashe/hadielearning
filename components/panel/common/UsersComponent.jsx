"use client";

import { usersTable } from "@/actions/_usersTable";
import PanelHeading from "@/components/ui/common/PanelHeading";
import { useAuth } from "@/context/authContext";
import { Card } from "antd";
import React from "react";
import { FaUsers } from "react-icons/fa";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useRouter } from "next/router";

const UsersComponent = () => {
  const [auth] = useAuth();
  const { loading, list, deleteUser } = usersTable();
  const router = useRouter();

  return (
    <Card>
      <PanelHeading Icon={<FaUsers />} title={"Users"} para={"Here is the user list (Roles are Instructor, Student, Admin & Coordinator)"} />

      {loading ? (
        <>Loading...</>
      ) : (
        <div className="table-responsive">
          {auth?.user?.role === 'reader' ? <h4>Sorry, You don not have the right to view the data.</h4> : <table class="table table-striped  text-dark" style={{ backgroundColor: "white", borderRadius: "10px" }}>
            <thead>
              <tr>
                <th scope="col">{loading ? "loading..." : "#"}</th>
                <th scope="col">Name</th>
                <th scope="col">Role</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>



              {list.length === 0 ? (
                <h5 className="text-dark p-4">No Users</h5>
              ) : (
                list &&
                list?.map((x, index) => (
                  <tr key={index}>
                    <td className="text-dark" scope="row ">
                      {++index}
                    </td>
                    <td className="text-dark">{x.name}</td>
                    <td className="text-dark">{x.role}</td>
                    <td className="text-dark">{x.email}</td>

                    {auth?.user?._id !== x._id && (
                      <td className="text-dark">
                        <BiEdit style={{ cursor: "pointer" }} onClick={() => router.push(`/cms/accounts/single/${x._id}`)} />
                      </td>
                    )}

                    {auth?.user?._id !== x._id && (
                      <td className="text-dark">
                        <BiTrash style={{ cursor: "pointer" }} onClick={() => deleteUser(x._id)} />
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>}
        </div>
      )}
    </Card>
  );
};

export default UsersComponent;

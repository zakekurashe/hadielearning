import { useWorkshop } from "@/actions/_workshops";
import { API } from "@/config/APIs";
import { useAuth } from "@/context/authContext";
import { Button, Card } from "antd";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";

const WorkshopListComponent = () => {
  const { loading, list, deleteWorkshop, enableWorkshop, disableWorkshop } = useWorkshop();

  return (
    <>
      {list && (
        <div className="table-responsive">
          <table className="table table-striped  text-dark" style={{ backgroundColor: "white", borderRadius: "10px" }}>
            <thead>
              <tr>
                <th scope="col">{loading ? "loading..." : "#"}</th>
                <th scope="col">Category</th>
                <th scope="col">Title</th>
                <th scope="col">Instructor</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {list.length === 0 && !loading ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    No Workshops
                  </td>
                </tr>
              ) : (
                list?.map((x, index) => (
                  <tr key={x._id}>
                    <th className="text-dark" scope="row ">
                      {++index}
                    </th>
                    <td className="text-dark">{x?.categories[0]?.name}</td>
                    <td className="text-dark">{x?.title}</td>
                    <td className="text-dark">{x?.instructor?.name}</td>

                    <td className="text-dark">
                      {x?.show ? (
                        <Button onClick={() => disableWorkshop(x?._id)}>Enabled</Button>
                      ) : (
                        <Button danger={true} onClick={() => enableWorkshop(x?._id)}>
                          Disabled
                        </Button>
                      )}
                    </td>

                    <td className="text-dark">
                      <Link href={`/cms/workshop/detail/${x._id}`}>
                        <BiEdit />
                      </Link>
                    </td>
                    <td className="text-dark">
                      <BiTrash onClick={() => deleteWorkshop(x?._id)} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default WorkshopListComponent;

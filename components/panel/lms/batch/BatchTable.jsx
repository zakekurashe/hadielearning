import { _useBatches } from "@/actions/_batches";
import { Tag } from "antd";
import Link from "next/link";
import React from "react";
import { BsFolder2Open } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

const BatchTable = ({ from, loading, list, markCompleted, setCurrent, setOpen }) => {
  return (
    <>
      <div className="table-responsive">
        <table class="table table-striped  text-dark">
          <thead>
            <tr>
              <th scope="col">{loading ? "loading..." : "#"}</th>
              <th scope="col">Batch</th>
              <th scope="col">Assign Course</th>
              <th scope="col"> Assigned Students </th>
              <th scope="col"> Instructors </th>
              <th scope="col"> From </th>
              <th scope="col"> To </th>
              <th scope="col"> </th>
              <th scope="col"> </th>
              <th scope="col"> </th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 && !loading ? (
              <tr>
                <td colSpan="6" className="text-center">
                  No Batch
                </td>
              </tr>
            ) : (
              list?.map((x, index) => (
                <tr key={x._id}>
                  <th className="text-dark" scope="row ">
                    {++index}
                  </th>

                  <td className="text-dark">{x.title}</td>
                  <td className="text-dark">
                    <Link href={`/lms/course/${x.courseDetails?._id}`}>
                      <span>{x.courseDetails?.title}</span>
                    </Link>
                  </td>
                  <td className="text-dark">{x.enrolledStudents?.length}</td>
                  <td className="text-dark">{x.teachers?.length}</td>
                  <td className="text-dark">{x.startDate.substring(0, 10)}</td>
                  <td className="text-dark">{x.endDate.substring(0, 10)}</td>

                  <td className="text-dark">
                    <BsFolder2Open
                      role="button"
                      onClick={() => {
                        setCurrent(x);
                        setOpen(true);
                      }}
                    />
                  </td>
                  {from === "active" && (
                    <>
                      <td className="text-dark">
                        <Link href={`/lms/batch/detail/${x._id}`}>
                          <FaEdit role="button" />
                        </Link>
                      </td>
                      <td className="text-dark">
                        <Tag role="button" onClick={() => markCompleted(x._id)}>
                          Mark as complete
                        </Tag>
                      </td>
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BatchTable;

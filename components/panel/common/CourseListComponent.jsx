import { useCourseList } from "@/actions/_course";
import { useAuth } from "@/context/authContext";
import { Button, Card } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { BiEdit, BiTrash } from "react-icons/bi";

const CourseListComponent = () => {
  const [auth] = useAuth()
  const path = useRouter().pathname;
  const { list, loading, deleteCourse, disableCourse, enableCourse2, disableCourse2, enableCourse } = useCourseList();

  return (
    <Card>
      {auth?.user?.role === 'reader' ? <h5>Sorry, you do not have the right to view the data.</h5> :
        <div className="table-responsive">
          <table class="table table-striped  text-dark">
            <thead>
              <tr>
                <th scope="col">{loading ? "loading..." : "#"}</th>
                <th scope="col">Category</th>
                <th scope="col">Title</th>
                <th scope="col">Instructor</th>
                <th scope="col">Disable in form</th>
                <th scope="col"> {loading && "loading..."} </th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {list.length === 0 && !loading ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    No Course
                  </td>
                </tr>
              ) : (
                list?.map((x, index) => (
                  <tr key={x._doc.name}>
                    <th className="text-dark" scope="row ">
                      {++index}
                    </th>
                    <td className="text-dark">{x?._doc?.categories[0]?.name}</td>
                    <td className="text-dark">{x?._doc?.title}</td>
                    <td className="text-dark">{x?._doc?.instructor?.name}</td>
                    <td className="text-dark">
                      {x?._doc?.show ? (
                        <Button onClick={() => disableCourse(x?._doc?._id)}>Enabled</Button>
                      ) : (
                        <Button danger={true} onClick={() => enableCourse(x?._doc?._id)}>
                          Disabled
                        </Button>
                      )}
                    </td>
                    <td className="text-dark">
                      {x?._doc?.show2 ? (
                        <Button onClick={() => disableCourse2(x?._doc?._id)}>Enabled</Button>
                      ) : (
                        <Button danger={true} onClick={() => enableCourse2(x?._doc?._id)}>
                          Disabled
                        </Button>
                      )}
                    </td>
                    <td className="text-dark">
                      <Link href={`${path.includes("lms") ? `/lms/course/detail/${x?._doc?._id}` : `/cms/course/detail/${x?._doc?._id}`}`}>
                        <BiEdit />
                      </Link>
                    </td>
                    <td className="text-dark">
                      <BiTrash onClick={() => deleteCourse(x?._doc?._id)} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      }
    </Card>
  );
};

export default CourseListComponent;

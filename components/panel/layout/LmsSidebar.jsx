import { Menu } from "antd";

import { useRouter } from "next/router";
import { active, navsStyle } from "@/components/ui/common/active";
import { useAuth } from "@/context/authContext";

import { BackwardFilled, HomeOutlined } from "@ant-design/icons";
import { FaChalkboardTeacher, FaPlus } from "react-icons/fa";
import { MdImageSearch, MdLibraryBooks, MdOutlineCreateNewFolder, MdOutlineDashboardCustomize, MdOutlineLibraryBooks } from "react-icons/md";
import Logo from "@/components/ui/common/Logo";

const LmsSidebar = ({ from = "without-sidebar" }) => {
  const router = useRouter();
  const [auth] = useAuth();

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      style={{
        height: from === "sidebar" ? "90%" : "100%",
        borderRight: from === "sidebar" ? 0 : "0.01rem solid #80808026",
        // background: "linear-gradient(329deg,#31af98,#0f3f5d)",
        background: "white",
        color: "#0f3f5d",
      }}
    >
      <div className={`${from === "sidebar" ? "text-start" : "text-center"}`}>
        <Logo />
      </div>
      <Menu.Item className="mt-3" onClick={() => router.push("/")} icon={<HomeOutlined />} style={{}}>
        Home
      </Menu.Item>
      <Menu.Item onClick={() => router.push("/lms")} className="mt-1" style={active("/lms", router) ? navsStyle : {}} icon={<MdOutlineDashboardCustomize />}>
        Dashboard
      </Menu.Item>
      <Menu.Item
        className="mt-2"
        icon={<MdOutlineDashboardCustomize />}
        onClick={() => router.push("/lms/enrollments/applications")}
        style={active("applications", router) ? navsStyle : {}}
      >
        Applications
      </Menu.Item>

      <Menu.Item
        className="mt-1"
        icon={<MdOutlineDashboardCustomize />}
        onClick={() => router.push("/lms/enrollments/charts")}
        style={active("/lms/enrollments/charts", router) ? navsStyle : {}}
      >
        Enrollments Charts
      </Menu.Item>

      <Menu.Item className="mt-3" style={active("course/list", router) ? navsStyle : {}} onClick={() => router.push("/lms/course/list")} icon={<FaChalkboardTeacher />}>
        Courses
      </Menu.Item>
      <Menu.Item style={active("add", router) ? navsStyle : {}} onClick={() => router.push("/lms/course/add")} className="mt-1" icon={<MdOutlineCreateNewFolder />}>
        Add Course
      </Menu.Item>

      <Menu.Item style={active("active-batches", router) ? navsStyle : {}} onClick={() => router.push("/lms/batch/list/active")} className="mt-3" icon={<MdLibraryBooks />}>
        Active Batches
      </Menu.Item>
      <Menu.Item style={active("completed-batches", router) ? navsStyle : {}} onClick={() => router.push("/lms/batch/list/completed")} className="mt-1" icon={<FaPlus />}>
        Completed Batches
      </Menu.Item>
      <Menu.Item style={active("create-batches", router) ? navsStyle : {}} onClick={() => router.push("/lms/batch/add")} className="mt-1" icon={<MdOutlineLibraryBooks />}>
        Create Batches
      </Menu.Item>
      <Menu.Item style={active("/students/list", router) ? navsStyle : {}} onClick={() => router.push("/lms/students/list")} className="mt-3" icon={<FaPlus />}>
        Students
      </Menu.Item>
      <Menu.Item
        style={active("enrolled-students", router) ? navsStyle : {}}
        onClick={() => router.push("/lms/students/enrolled-students")}
        className="mt-1"
        icon={<MdImageSearch />}
      >
        Enrolled Students
      </Menu.Item>
      {/* <Menu.Item style={active("library", router) ? navsStyle : {}} onClick={() => router.push("/cms-test/library")} className="mt-3" icon={<MdImageSearch />}>
        Gallery
      </Menu.Item> */}
      {auth?.user && (auth?.user?.role === "admin" || auth?.user?.role === "reader") && (
        <Menu.Item onClick={() => router.push("/admin")} className="mt-3" icon={<BackwardFilled />}>
          Back
        </Menu.Item>
      )}
    </Menu>
  );
};

export default LmsSidebar;

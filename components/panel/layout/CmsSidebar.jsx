import { Menu } from "antd";
import { useRouter } from "next/router";

import { MdAdd, MdCategory, MdLibraryBooks, MdOutlineCreateNewFolder, MdOutlineDashboardCustomize, MdOutlineDensitySmall, MdOutlineLibraryBooks } from "react-icons/md";
import { BackwardFilled, HomeOutlined } from "@ant-design/icons";
import { FaChalkboardTeacher, FaPlus } from "react-icons/fa";

import { active, navsStyle } from "@/components/ui/common/active";
import { useAuth } from "@/context/authContext";
import Logo from "@/components/ui/common/Logo";
import { BiStats } from "react-icons/bi";

const CmsSidebar = ({ from = "without-sidebar" }) => {
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
        background: "white",
        color: "#0f3f5d",
      }}
    >
      <div className={`${from === "sidebar" ? "text-start" : "text-center"}`}>
        <Logo />
      </div>
      <Menu.Item className="mt-3" icon={<HomeOutlined />} onClick={() => router.push("/")} style={active("/", router) ? navsStyle : {}}>
        Home
      </Menu.Item>
      <Menu.Item className="mt-1" icon={<MdOutlineDashboardCustomize />}>
        Dashboard
      </Menu.Item>
      <Menu.Item className="mt-1" onClick={() => router.push("/cms/stats")} icon={<BiStats />}>
        Stats
      </Menu.Item>
      <Menu.Item className="mt-3" onClick={() => router.push("/cms/accounts/users")} icon={<FaChalkboardTeacher />}>
        Instructors
      </Menu.Item>
      <Menu.Item onClick={() => router.push("/cms/accounts/create")} className="mt-1" icon={<MdOutlineCreateNewFolder />}>
        Create Acounts
      </Menu.Item>
      <Menu.Item onClick={() => router.push("/cms/categories")} className="mt-3" icon={<MdCategory />}>
        Categories
      </Menu.Item>
      <Menu.Item onClick={() => router.push("/cms/course/list")} className="mt-3" icon={<MdLibraryBooks />}>
        Courses
      </Menu.Item>
      <Menu.Item onClick={() => router.push("/cms/course/add")} className="mt-1" icon={<FaPlus />}>
        Add Courses
      </Menu.Item>
      <Menu.Item onClick={() => router.push("/cms/workshop/list")} className="mt-3" icon={<MdOutlineLibraryBooks />}>
        Workshops
      </Menu.Item>
      <Menu.Item onClick={() => router.push("/cms/workshop/add")} className="mt-1" icon={<FaPlus />}>
        Add Workshops
      </Menu.Item>
      {/* blogs */}
      <Menu.Item onClick={() => router.push("/cms/blog/add")} className="mt-3" icon={<MdAdd />}>
        Add Blog
      </Menu.Item>
      <Menu.Item onClick={() => router.push("/cms/blog/list")} className="mt-1" icon={<MdOutlineDensitySmall />}>
        All Blogs
      </Menu.Item>

      {auth?.user && (auth?.user?.role === "admin" || auth?.user?.role === "reader") && (
        <Menu.Item onClick={() => router.push("/admin")} className="mt-3" icon={<BackwardFilled />}>
          Back
        </Menu.Item>
      )}
    </Menu>
  );
};

export default CmsSidebar;

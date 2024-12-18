import { Menu } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { BsClipboard2Check } from "react-icons/bs";
import { MdCastForEducation, MdOutlineDashboardCustomize } from "react-icons/md";
import { RxActivityLog } from "react-icons/rx";
import { useRouter } from "next/router";
import { FaWordpress } from "react-icons/fa";
import Logo from "@/components/ui/common/Logo";
import { active, navsStyle } from "@/components/ui/common/active";

const AdminSidebar = ({ from = "without-sidebar" }) => {
  const router = useRouter();

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
      <Menu.Item className="mt-3" icon={<HomeOutlined />} style={active("/", router) ? navsStyle : {}}>
        Home
      </Menu.Item>
      {/* <Menu.Item className="mt-1" icon={<MdOutlineDashboardCustomize />}>
        Dashboard
      </Menu.Item>
      <Menu.Item className="mt-1" icon={<BsClipboard2Check />}>
        Payments Logs
      </Menu.Item>
      <Menu.Item className="mt-1" icon={<RxActivityLog />}>
        Activity Logs
      </Menu.Item> */}

      <Menu.Item onClick={() => router.push("/cms")} className="mt-3" icon={<FaWordpress />}>
        CMS
      </Menu.Item>
      <Menu.Item onClick={() => router.push("/lms")} className="mt-1" icon={<MdCastForEducation />}>
        LMS
      </Menu.Item>
    </Menu>
  );
};

export default AdminSidebar;

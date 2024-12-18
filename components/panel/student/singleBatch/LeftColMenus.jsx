import Logo from "@/components/ui/common/Logo";
import { active, navsStyle } from "@/components/ui/common/active";
import { useAuth } from "@/context/authContext";
import { AppstoreOutlined, BackwardOutlined, CommentOutlined, FolderOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import Link from "next/link";
import React from "react";

const LeftColMenus = ({ setShowCenteral, showCenteral }) => {
  const [auth] = useAuth()


  return (
    <>
      <div className={"text-start px-3 py-1"}>
        <Logo />
      </div>

      <div className="px-3 py-1">
        <Menu>
          <Menu.Item key="1" className="mt-3" onClick={() => setShowCenteral("desc")} style={showCenteral === "desc" ? navsStyle : {}} icon={<AppstoreOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" className="mt-1" onClick={() => setShowCenteral("folders")} style={showCenteral === "folders" ? navsStyle : {}} icon={<FolderOutlined />}>
            Folders
          </Menu.Item>
          <Menu.Item key="3" className="mt-1" onClick={() => setShowCenteral("comments")} style={showCenteral === "comments" ? navsStyle : {}} icon={<CommentOutlined />}>
            Comments
          </Menu.Item>
          <Menu.Item key="4" className="mt-4" icon={<BackwardOutlined />}>
            <Link href={auth?.user?.role === "instructor" ? '/instructor' : "/student/learning"}> Back</Link>
          </Menu.Item>
        </Menu>
      </div>
    </>
  );
};

export default LeftColMenus;

import useGetUser from "@/actions/layouts/useGetUser";
import React from "react";
import { Layout, Grid, Drawer, Dropdown, Avatar, Button } from "antd";
import { MenuOutlined, ClockCircleOutlined, LogoutOutlined } from "@ant-design/icons";
import { useAuth } from "@/context/authContext";
import { FaUser } from "react-icons/fa";
import LmsSidebar from "./LmsSidebar";
import CmsSidebar from "./CmsSidebar";
import AdminSidebar from "./AdminSidebar";
import { MdClose } from "react-icons/md";
import { _useCommon } from "@/actions/layouts/_common";
import { useRouter } from "next/router";
const { Sider, Header, Content } = Layout;
const { useBreakpoint } = Grid;

const PanelLayout = ({ children, api }) => {
  const [auth] = useAuth();
  const [drawerVisibility, setDrawerVisibility] = React.useState(false);
  const { logout } = _useCommon();

  const { loading } = useGetUser(api);
  const breakpoints = useBreakpoint();


  const items = [
    {
      key: "1",
      label: <span>Profile</span>,
      icon: <FaUser />,
    },
    {
      key: "2",
      label: (
        <span target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          Logout
        </span>
      ),
      icon: <LogoutOutlined />,
      onClick: logout,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {breakpoints.md && (
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          {api.includes("lms") ? <LmsSidebar /> : api.includes("cms") ? <CmsSidebar /> : api.includes("admin") && <AdminSidebar />}
        </Sider>
      )}

      <Layout>
        <Header
          className="bg-light"
          style={{
            width: "100%",
            backgroundColor: "white !important",
            display: "flex",
            justifyContent: "space-between",
            gap: "20px",
            alignItems: "center",
            padding: "20px",
            borderBottom: "0.01rem solid #80808026",
          }}
        >
          {!breakpoints.md && <MenuOutlined style={{ fontSize: 20 }} onClick={() => setDrawerVisibility(true)} />}
          <h5 style={{ color: "#0f3f5d", marginLeft: `${breakpoints.md ? "200px" : "0px"}` }}> Welcome Hadi, </h5>
          <Dropdown menu={{ items }}>
            <Avatar
              style={{
                backgroundColor: "#0f3f5d",
                color: "white",
                justifySelf: "end",
              }}
            >
              {auth?.user?.name[0]}
            </Avatar>
          </Dropdown>

          <Drawer
            // style={{ position: "absolute" }}
            placement="left"
            closable={false}
            onClose={() => setDrawerVisibility(false)}
            open={drawerVisibility}
            extra={<ClockCircleOutlined style={{ color: "black" }} onClick={() => setDrawerVisibility(false)} />}
          >
            {api.includes("lms") ? <LmsSidebar from="sidebar" /> : api.includes("cms") ? <CmsSidebar from="sidebar" /> : api.includes("admin") && <AdminSidebar from="sidebar" />}
            <Button style={{ width: "100%" }} onClick={() => setDrawerVisibility(false)}>
              <MdClose />
            </Button>
          </Drawer>
        </Header>
        <Content
          style={{
            minHeight: "80vh",
            marginLeft: `${breakpoints.md ? "200px" : "0px"}`,
            // margin: "20px",
            // marginTop: "20px",
            padding: "20px",
            background: "white",
          }}
        >
          {loading ? "loading..." : children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default PanelLayout;

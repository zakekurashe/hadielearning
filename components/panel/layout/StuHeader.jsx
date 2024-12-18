import { _useCommon } from "@/actions/layouts/_common";
import Logo from "@/components/ui/common/Logo";
import { toImageUrl } from "@/config/APIs";
import { useAuth } from "@/context/authContext";
import { Avatar, Dropdown } from "antd";
import { useRouter } from "next/router";
import { AiOutlineCheck, AiOutlineLogout } from "react-icons/ai";
import { BsCardList } from "react-icons/bs";
import { FaGraduationCap } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";

export default function StuHeader() {
  const [auth] = useAuth();
  const { logout } = _useCommon();
  const router = useRouter();

  const items = [
    {
      label: auth?.user?.name,
      key: "0",
      icon: <RxAvatar size={17} />,
      // onClick: () => {
      //   // setOpenProfile(true);
      //   router.push("/student-test");
      // },
    },
    // {
    //   label: "Enrollments",
    //   key: "4",
    //   icon: <BsCardList size={17} />,
    //   onClick: () => {
    //     router.push("/student-test/enrollments");
    //   },
    // },
    // {
    //   type: "divider",
    // },
    {
      label: "Learning",
      key: "1",
      icon: <FaGraduationCap size={17} />,
      onClick: () => {
        // setOpenProfile(true);
        router.push("/student/learning");
      },
    },
    {
      label: "Completed Batches",
      key: "2",
      disabled: true,
      icon: <AiOutlineCheck size={17} />,
      onClick: () => { },
    },
    {
      type: "divider",
    },
    {
      label: "Logout",
      onClick: logout,
      key: "3",
      icon: <AiOutlineLogout size={17} />,
    },
  ];

  return (
    <div style={{ marginBottom: "80px" }}>
      <div className="main-head">
        <div className="container d-flex justify-content-between py-1 px-2  ">
          <Logo />

          <div className="d-flex justify-content-center align-items-center">
            <div style={{ borderLeft: "1px solid lightgrey" }} className="px-2">
              <Dropdown menu={{ items }} className="custom-dropdown" overlayStyle={{ zIndex: 9999 }}>
                {auth?.user?.image?.url?.includes("profileImage") ? (
                  <Avatar src={toImageUrl(auth?.user?.image?.url)}>{auth?.user?.name[0]}</Avatar>
                ) : (
                  <Avatar src={auth?.user?.image?.url}>{auth?.user?.name[0]}</Avatar>
                )}
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

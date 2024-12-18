import React, { useEffect, useState } from "react";
import { List } from "antd";
import { FiEdit } from "react-icons/fi";
import { LuBrainCircuit } from "react-icons/lu";
import Link from "next/link";
import { FaUserGraduate } from "react-icons/fa";
import { HiOutlineLightBulb } from "react-icons/hi";
import { MdOutlineSettings, MdWork } from "react-icons/md";
import { useRouter } from "next/router";
import { CgFileDocument } from "react-icons/cg";
import axios from "axios";
import toast from "react-hot-toast";
import LearningLayout from "./LearningLayout";
import { useAuth } from "@/context/authContext";
import { API } from "@/config/APIs";
import { styles } from "@/config/styles";

const navsData = [
  {
    title: "General",
    icon: <FiEdit size={22} color={styles.primaryColor} />,
    path: "/_/general",
  },
  {
    title: "Enrollment Info",
    icon: <CgFileDocument size={22} color={styles.primaryColor} />,
    path: "/_/enrollmentInfo",
  },
  {
    title: "Skills",
    icon: <LuBrainCircuit size={22} color={styles.primaryColor} />,
    path: "/_/skills",
  },
  {
    title: "Education",
    icon: <FaUserGraduate size={22} color={styles.primaryColor} />,
    path: "/_/education",
  },
  {
    title: "Experience",
    icon: <HiOutlineLightBulb size={22} color={styles.primaryColor} />,
    path: "/_/experience",
  },
  {
    title: "Certificates",
    icon: <HiOutlineLightBulb size={22} color={styles.primaryColor} />,
    path: "/_/certificate",
  },
  {
    title: "Portfolio",
    icon: <MdWork size={22} color={styles.primaryColor} />,
    path: "/_/portfolio",
  },
  {
    title: "Settings",
    icon: <MdOutlineSettings size={22} color={styles.primaryColor} />,
    path: "/_/settings",
  },
];

const EditProfileLayout = ({ children }) => {
  const [auth] = useAuth();
  const pathname = useRouter().pathname;
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState();

  const gettingCurrentProfile = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/my-profile`);
      setDisabled(data.ok);
    } catch (error) {
      toast.error("Failed, try again");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth && auth?.token) gettingCurrentProfile();
  }, [auth , auth?.token]);

  return (
    <LearningLayout>
      <div className="container rounded bg-white mb-5" style={{ paddingTop: "50px" }}>
        <div className="d-flex gap-3 d-block d-md-none pb-3 mb-1 overflow-auto">
          {navsData?.map((x) => (
            <b
              className="text-dark"
              style={{
                padding: "10px",
                borderRadius: "10px",
                backgroundColor: `${x.path === pathname && "rgba(0,0,0,0.2)"}`,
              }}
              onClick={() => router.push(x.path)}
              key={x.title}
            >
              {x.title}
            </b>
          ))}
        </div>

        <div className="row ">
          <div className="col-md-3 d-none d-md-block">
            <List
              itemLayout="horizontal"
              dataSource={navsData}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <>
                        {item.path === "/_/general" ? (
                          <Link href={item.path}>
                            <span
                              style={{
                                padding: "10px",
                                borderRadius: "10px",
                                backgroundColor: `${item.path === pathname && "rgba(0,0,0,0.2)"}`,
                              }}
                              role="button"
                              className="d-flex justify-content-start align-items-center gap-3"
                            >
                              {item.icon} {item.title}
                            </span>
                          </Link>
                        ) : (
                          <Link href={!disabled ? "/_/general" : item.path}>
                            <span
                              style={{
                                padding: "10px",
                                borderRadius: "10px",
                                backgroundColor: `${item.path === pathname && "rgba(0,0,0,0.2)"}`,
                              }}
                              role="button"
                              className={`d-flex justify-content-start align-items-center gap-3 ${!disabled && "disable-pointer"}`}
                            >
                              {item.icon} {item.title}
                            </span>
                          </Link>
                        )}
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          </div>

          <div className="col-md-8">{children}</div>
        </div>
      </div>
    </LearningLayout>
  );
};

export default EditProfileLayout;

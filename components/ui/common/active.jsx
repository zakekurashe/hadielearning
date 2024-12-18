// import { useRouter } from "next/router";

import { styles } from "@/config/styles";

export const active = (x, router) => {
  if (router.pathname.includes(x)) return true;
  return false;
};

export const navsStyle = { backgroundColor: "white", color: styles.primaryColor, fontWeight: "bold", borderRight: `0.2rem solid ${styles.primaryColor}`, borderRadius: "0px" };

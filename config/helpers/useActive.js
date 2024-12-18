import { useRouter } from "next/router";

export const useActive = (path) => {
  const router1 = useRouter().pathname.split("/")[2];
  const router2 = useRouter().pathname;

  return router2 === path || router1 === path ? { fontWeight: "550" } : {};
};

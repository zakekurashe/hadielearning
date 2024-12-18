import { useAuth } from "@/context/authContext";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export const _useCommon = () => {
  const [auth, setAuth] = useAuth();
  const router = useRouter();

  const logout = () => {
    Cookies.remove("auth");
    setAuth({
      user: null,
      token: "",
    });
    router.push("/");
  };

  return { logout };
};

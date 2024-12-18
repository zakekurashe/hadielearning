import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineRollback } from "react-icons/ai";

import Link from "next/link";
import { useAuth } from "@/context/authContext";
import { API } from "@/config/APIs";
import Cookies from "js-cookie";

const Login = () => {
  // context
  const [auth, setAuth] = useAuth();
  const token = auth?.token;
  // hooks
  const router = useRouter();
  // state
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleEmail = (event) => {
    if (!isValidEmail(event.target.value)) {
      setShow(true);
    } else {
      setShow(false);
    }

    setEmail(event.target.value);
  };

  const payloadValues = {
    email,
    password,
  };

  const onFinish = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${API}/login`, payloadValues);
      console.log(data);
      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        setAuth({ user: data.user, token: data.token });
        // localStorage.setItem("auth", JSON.stringify(data));
        Cookies.set("auth", JSON.stringify(data));

        toast.success("Successfully logged in");
        setLoading(false);
        router.push("/");
      }
    } catch (err) {
      toast.error("SignIn failed. Try again.");
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth && token) {
      router.push("/");
    }
  }, [auth, token, router]);

  return (
    <>
      <div id="enrollScreen" className="container-fluid ">
        <div className="row">
          <div className="col-lg-4 col-md-4 bg-danger" id="forImage" />
          <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12" id="rightCol">
            <div className="form ">
              <div className="row d-flex justify-content-center align-items-center" style={{ height: "90vh" }}>
                <div className="col-md-8  col-sm-12 " id="startForm">
                  <div>
                    <div className="col-md-8  col-sm-12 mb-4  ">
                      <Link href={"/"}>
                        <span className="d-flex align-items-center gap-2" role="button">
                          <AiOutlineRollback />
                          <span>Home</span>
                        </span>
                      </Link>
                    </div>
                    <h2> Login </h2>
                    <br />

                    <div className="form-group py-3">
                      <label>
                        Email<span className="text-danger">*</span>
                        {show && <small className="text-danger mx-3">Invalid Email</small>}
                      </label>
                      <input required type="email" className="form-control" placeholder="example@gmail.com" name="email" value={email} onChange={handleEmail} />
                    </div>

                    <div className="form-group py-3">
                      <label>
                        Password<span className="text-danger">*</span>
                      </label>
                      <input required type="password" className="form-control" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <br />
                  </div>

                  {!password || !email ? (
                    <div className="col-12 d-flex justify-content-between align-items-start">
                      <div>
                        <button className="z-btn-disable">Login</button>
                        <br />
                        <br />
                        <span role="button" className="m-2" onClick={() => router.push("/auth/request-forget-password")}>
                          Forgotten password?
                        </span>
                      </div>
                      <button className="z-btn-register" onClick={() => router.push("/auth/register")}>
                        Register
                      </button>
                    </div>
                  ) : (
                    <div className="col-12 d-flex justify-content-between align-items-start">
                      <div>
                        <button className="z-btn mx-2 " onClick={onFinish}>
                          {loading ? "loading..." : "Login"}
                        </button>

                        <br />
                        <br />
                        <span role="button" className="m-2" onClick={() => router.push("/auth/request-forget-password")}>
                          Forgotten password?
                        </span>
                      </div>
                      <button className="z-btn-register" onClick={() => router.push("/auth/register")}>
                        Register
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

import React, { useEffect, useState } from "react";
import { Button, Card } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@/context/authContext";
import EditProfileLayout from "@/components/panel/layout/EditProfileLayout";
import { API } from "@/config/APIs";
import { styles } from "@/config/styles";

const Settings = () => {
  const [auth] = useAuth();
  const [enable, setEnable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading2, setLoading2] = useState(false);

  const gettingProfilePrivacy = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API}/my-privacy`);
      if (data.ok) {
        setEnable(data.public);
        setLoading(false);
      }
    } catch (error) {
      toast.error("Failed, try again", styles.toastBootom);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth && auth?.token) {
      gettingProfilePrivacy();
    }
  }, [auth, auth?.token]);

  const PrivacySubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put(`${API}/update-privacy`, { public: enable });
      if (data.ok) {
        toast.success("Updated", styles.toastBootom);
      }
    } catch (error) {
      toast.error("Failed, try again", styles.toastBootom);
    } finally {
      setLoading(false);
    }
  };

  const PasswordSubmit = async () => {
    if (password !== password2) {
      toast.error("Password doesnt match", styles.toastBootom);
      return;
    } else if (password === password2) {
      try {
        setLoading2(true);
        const { data } = await axios.put(`${API}/update-user-by-user`, { password, id: auth?.user?._id });
        if (data.error) {
          toast.error(data.error, styles.toastBootom);
        } else {
          setLoading2(false);
          toast.success("Updated", styles.toastBootom);
        }
      } catch (error) {
        toast.error("Failed, try again", styles.toastBootom);
      } finally {
        setLoading2(false);
      }
    }
  };

  return (
    <EditProfileLayout>
      <Card title={"Privacy"}>
        <div>
          <p className="text-secondary">
            In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on
            meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.
          </p>

          <div className="col-md-6">
            <div className="d-flex justify-content-start align-items-center  gap-2 form-group py-2">
              <label> Make public profile {loading && "loading..."}</label>
              <input type="checkbox" checked={enable} onChange={() => setEnable(!enable)} />
            </div>
          </div>

          <Button style={{ backgroundColor: styles.primaryColor }} className="text-light" onClick={PrivacySubmit}>
            Save
          </Button>
        </div>
      </Card>

      <Card title="Change Password" className="mt-3">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group py-2">
              <label> Password </label>
              <input min={6} value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group py-2">
              <label> Confirm Password </label>
              <input min={6} value={password2} onChange={(e) => setPassword2(e.target.value)} type="password" className="form-control" />
            </div>
          </div>
        </div>

        <Button style={{ backgroundColor: styles.primaryColor }} className="text-light" loading={loading2} onClick={PasswordSubmit}>
          Save
        </Button>
      </Card>
    </EditProfileLayout>
  );
};

export default Settings;

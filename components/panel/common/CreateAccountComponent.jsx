import { useAccounts } from "@/actions/_accountCreates";
import PanelHeading from "@/components/ui/common/PanelHeading";
import { FolderAddOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import React, { useState } from "react";

const CreateAccountComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const { create_account, loading } = useAccounts();

  return (
    <Card>
      <PanelHeading title={"Create Account"} Icon={<FolderAddOutlined />} para={"You can add any user, e:g Admin, Author (CMS Rights), Student Coordinator (LMS Rights)"} />
      <form>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group py-2">
              <label for="exampleFormControlInput1">
                Email<span className="text-danger">*</span>
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="example@hadielearning.com "
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group py-2">
              <label for="exampleFormControlInput1">
                Name<span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" id="exampleFormControlInput1" name="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group py-2">
              <label for="exampleFormControlInput1">
                Password<span className="text-danger">*</span>
              </label>
              <input
                minLength={6}
                type="password"
                className="form-control"
                id="exampleFormControlInput1"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group py-2">
              <label>
                Choose Role<span className="text-danger">*</span>
              </label>
              <select
                required
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
                className="form-select"
              >
                <option value="">Choose</option>
                <option value="admin">Admin</option>
                <option value="author">Author (Employee)</option>
                <option value="instructor">Course Instructor</option>
                <option value="student">student</option>
                <option value="cord">Student Coordinator</option>
                <option value="reader">Reader as Admin</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group py-2">
              <label for="exampleFormControlInput1">
                Working<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="e:g ReactJs Developer"
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>
          </div>
        </div>

        <Button loading={loading} onClick={(e) => create_account(e, email, password, role, name, status)} className="mt-3">
          Create
        </Button>
      </form>
    </Card>
  );
};

export default CreateAccountComponent;

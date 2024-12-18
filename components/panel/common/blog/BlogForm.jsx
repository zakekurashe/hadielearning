import { useCategory } from "@/actions/_category";
import { Button, Select } from "antd";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import React, { useMemo } from "react";
import CatsAlert from "@/components/ui/common/CatsAlert";
import { toImageUrl } from "@/config/APIs";

const BlogForm = ({ _values, _setValues, handleSubmit, submitLoading, changeHandler, setCats, cats, from, blogId }) => {
  const Editor = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);
  const { categoriesList } = useCategory();

  const removeImage = () => _setValues((prev) => ({ ...prev, image: "" }));

  // from="blog-create"

  return (
    <>
      <div className="form-group py-2">
        <label htmlFor="exampleFormControlInput1"> Slug Title</label>
        <input type="text" className="form-control" id="exampleFormControlInput1" name="slug" placeholder="Blog Title" value={_values.slug} onChange={changeHandler} />
      </div>

      <div className="form-group py-2">
        <label htmlFor="exampleFormControlInput1"> Seo Title</label>
        <input type="text" className="form-control" id="exampleFormControlInput1" name="seoTitle" placeholder="SEO Title" value={_values.seoTitle} onChange={changeHandler} />
      </div>
      <div className="form-group py-2">
        <label htmlFor="exampleFormControlInput1">Meta Description</label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          name="metaDescription"
          placeholder="Meta Description"
          value={_values.metaDescription}
          onChange={changeHandler}
        />
      </div>

      <hr />

      <div className="form-group py-2">
        <label htmlFor="exampleFormControlInput1">Title</label>
        <input type="text" className="form-control" id="exampleFormControlInput1" name="title" placeholder="Title" value={_values.title} onChange={changeHandler} />
      </div>

      <div className="form-group py-2">
        <label htmlFor="exampleFormControlInput1">Description</label>
        <textarea
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          name="description"
          placeholder="Blog Description"
          value={_values.description}
          onChange={changeHandler}
        />
      </div>

      <div className="form-group py-2">
        <label htmlFor="exampleFormControlInput1">Featured Image</label>
        <input
          onChange={changeHandler}
          type="file"
          accept="images/*"
          // hidden
          className="form-control"
          id="exampleFormControlInput1"
        />
      </div>
      <small className="form-text">Please upload image within 1mb, formet jpg,jpeg,webp</small>
      {from === "blog-create" && _values.image && (
        <div className="form-group py-2">
          <img width="auto" height={300} src={URL.createObjectURL(_values.image)} onClick={removeImage} />
          <br />
          <small>Just click on image to remove.</small>
        </div>
      )}

      {from === "blog-edit" && _values.preImage && (
        <div className="form-group py-2">
          {_values.preImage?.url.includes("blogImages") ? (
            _values.preImage?.url && <img width="auto" height={300} src={toImageUrl(_values.preImage?.url)} onClick={() => _setValues((prev) => ({ ...prev, preImage: "" }))} />
          ) : (
            <img width="auto" height={300} src={_values.preImage?.url} onClick={() => _setValues((prev) => ({ ...prev, preImage: "" }))} />
          )}

          <br />
          <small>Just click on image to remove.</small>
        </div>
      )}

      {from === "blog-edit" && (
        <>
          {_values?.image && (
            <div className="form-group py-2">
              <img width="auto" height={300} src={window?.URL.createObjectURL(_values?.image)} onClick={() => _setValues((prevValues) => ({ ...prevValues, image: "" }))} />
              <br />
              <small>Just click on image to remove.</small>
            </div>
          )}

          {_values.preImage?.url}
        </>
      )}

      <div className="form-group py-2">
        <Editor
          type="text"
          id="exampleFormControlInput1"
          name="content"
          placeholder="Content"
          value={_values.content}
          onChange={(e) => _setValues((pre) => ({ ...pre, content: e }))}
        />
      </div>

      <div className="form-group py-2">
        {cats?.length === 0 || (cats.length === 1 && <CatsAlert />)}
        <label htmlFor="exampleFormControlInput1">Categories</label>
        <Select mode="multiple" allowClear style={{ width: "100%" }} placeholder="Please select" onChange={(v) => setCats(v)}>
          {categoriesList.map((item) => (
            <Select.Option key={item.name}>{item.name}</Select.Option>
          ))}
        </Select>
      </div>

      <div className="form-group py-2">
        <label htmlFor="exampleFormControlInput1">Poplar Tags</label>
        <input type="text" className="form-control" placeholder="Tags" name="tags" value={_values.tags} onChange={changeHandler} />
        <small className="form-text">Please use comma separated values (eg. #TREND,#DESIGNING,#JAVSSCRIPT,#EARNING,#EDUCATION)</small>
      </div>

      <br />

      <Button loading={submitLoading} onClick={handleSubmit}>
        Submit
      </Button>
    </>
  );
};

export default BlogForm;

import PanelHeading from "@/components/ui/common/PanelHeading";
import { Card, Divider } from "antd";
import React from "react";
import { BsTrash } from "react-icons/bs";
import { useCategory } from "@/actions/_category";
import { MdCategory } from "react-icons/md";

const CategoryComponent = () => {
  const [category, setCategory] = React.useState("");
  const { loading, categoriesList, DeleteCategory, addCategory } = useCategory();

  return (
    <Card hoverable={true}>
      <PanelHeading Icon={<MdCategory />} title={"Categoy"} para={"You can add, delete category. But these categoies may link to the course, workshop and other."} />

      <form onSubmit={(e) => addCategory(e, category, setCategory)}>
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6">
            <div className="form-group py-2">
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="for example: Development"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-1">
            <div className="form-group ">
              <input type="submit" name="Add" className="bg-dark  text-light btn" />
            </div>
          </div>
        </div>
      </form>

      <Divider />
      <div className="row justify-content-center align-items-center">
        <div className="col-md-6 text-center">
          <h5 className="mb-5">All Categories</h5>
          <div className="container">
            {loading && "loading..."}
            {/* {JSON.stringify(categoriesList)} */}

            <ul className="list-group list-group-flush">
              {categoriesList?.map((x) => (
                <li key={x._id} className="list-group-item d-flex justify-content-between align-items-center ">
                  <p>{x.name}</p>
                  <BsTrash onClick={async () => DeleteCategory(x._id)} color="red" style={{ cursor: "pointer" }} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CategoryComponent;

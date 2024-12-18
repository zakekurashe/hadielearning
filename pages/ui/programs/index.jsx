import CourseCard from "@/components/ui/common/CourseCard";
import Footer from "@/components/ui/common/Footer";
import Tops from "@/components/ui/common/Tops";
import { API } from "@/config/APIs";
// import { Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";



const CourseList = ({ list, searchQuery }) => {
  const [filteredCourses, setfilteredCourses] = useState(list)
  const [sortBy, setSortBy] = useState('all')


  useEffect(() => {
    setfilteredCourses(list.filter((course) => {
      return course?.title?.toLowerCase().includes(searchQuery.toLowerCase());
    }))
  }, [searchQuery])

  useEffect(() => {
    if (sortBy === 'free') {
      setfilteredCourses(list.filter(x => x?.regFee == 0))
    } else if (sortBy === 'paid') {
      setfilteredCourses(list.filter(x => x?.regFee > 0))
    } else {
      setfilteredCourses(list)
    }
  }, [sortBy])



  return <div className="container pb-5">
    <div className="row mt-100">
      {/* <div className="d-flex justify-content-end mb-3">
        <Select
          defaultValue="all"
          style={{ width: 120 }}
          onChange={v => setSortBy(v)}
          options={[
            { value: 'all', label: 'All' },
            { value: 'free', label: 'Free' },
            { value: 'paid', label: 'Advance' },
          ]}
        />
      </div> */}
      {filteredCourses?.map((course) => (
        <React.Fragment key={course?.slug}>
          {course?.show2 && (
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-4 course-card">
              <CourseCard x={course} />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  </div>
}

const Programs = ({ initialCourses }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };



  return (
    <>
      <Tops header grid extra
        title={"Hadi, providing you with one of the best online course platforms"}
        desc={
          "With the help of industry experts, we have developed various computer short courses for hadi e-learning that can help you learn the tips and tricks of the digital world."
        }
        conLink={"https://hadielearning.com/programs"}
      />


      {/* form and page heading */}
      <div className="position-relative">
        <div className="container d-flex flex-column justify-content-center align-items-center mt-150">
          <div className="page__title-content">
            <h1 className="pragrams-h1 text-center" style={{ fontSize: "40px", color: "#0f3f5d" }}>
              Programs to level up your digital skills
            </h1>
          </div>
          <p className="text-center mb-4 mt-3" style={{ maxWidth: "800px" }}>
            <em>
              We have got all your digital skill training needs covered with our extensive offered program list. All you have to do is to explore our program list, choose the
              program of your choice, and take your first step toward financial independence.
            </em>
          </p>
        </div>

        <div className="container">
          <div className="row  gap-2 justify-content-center align-items-center">
            <div className="col-md-5 col-sx-12 mb-2">
              <form action="">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div
                      style={{
                        backgroundColor: "#0f3f5d",
                        border: "none",
                        borderTopRightRadius: "0px",
                        borderBottomRightRadius: "0px",
                        color: "white",
                        height: "40px",
                      }}
                      className="input-group-text"
                    >
                      <FaSearch color="white" />
                    </div>
                  </div>
                  <input
                    style={{ border: "1px solid #0f3f5d" }}
                    type="text"
                    className="form-control"
                    id="inlineFormInputGroupUsername"
                    placeholder="Search course here"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* course list */}

      <CourseList list={initialCourses} searchQuery={searchQuery} />


      <Footer />
    </>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get(`${API}/courses2`);

  return {
    props: {
      initialCourses: data.courses,
    },
  };
}

export default Programs;

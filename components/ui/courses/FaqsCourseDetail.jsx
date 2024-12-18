import { Collapse } from "antd";
import { useEffect, useState } from "react";

const FaqsCourseDetail = ({ details, page }) => {

  const [items, setItems] = useState([]);

  useEffect(() => {
    if (page === "outline") {

      setItems(details?.map((x, i) => ({
        key: i,
        label: x?.title,
        children: x?.details
      })))
    }
    if (page === "FAQs") {

      setItems(details?.map((x, i) => ({
        key: i,
        label: x?.question,
        children: x?.answer
      })))

    }
  }, [page, details])


  return (
    <>
      <section className="faq__area pb-50 pt-10">
        <div className="row">
          <div className="col-xl-12 col-lg-12 ">
            <div className="faq__accordion p-relative">
              <div className="accordion" id="accordionExample">
                {/* frist */}

                {page === "outline" && (
                  <>
                    <Collapse items={items}  />
                  </>
                )}

                {page === "FAQs" && (
                  <Collapse items={items} defaultActiveKey={['1']} />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FaqsCourseDetail;
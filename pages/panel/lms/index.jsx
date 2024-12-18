import LMSLayout from "@/components/panel/lms/LMSLayout";
import Stats2 from "@/components/ui/common/Stats2";
import { API } from "@/config/APIs";
import axios from "axios";

// import { Card, Grid } from "antd";
// import { useState } from "react";

// import CountUp from "react-countup";
// import VisibilitySensor from "react-visibility-sensor";

// const CounterBox = ({ counter, title, color, image }) => {
//   const [viewCountUp, setViewCountUp] = useState(false);

//   const onVisibilityChange = (isVisible) => {
//     if (isVisible) {
//       setViewCountUp(true);
//     }
//   };
//   return (
//     <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 mb-1 ">
//       <Card hoverable>
//         <div className="d-flex align-items-center gap-3" style={{ color: "#135c6c" }}>

//           <div className="d-flex flex-column ">
//             <b style={{ color: "#135c6c", fontSize: "30px" }}>
//               <VisibilitySensor onChange={onVisibilityChange} offset={{ top: 10 }} delayedCall>
//                 <>
//                   <CountUp end={viewCountUp ? counter : 0} duration={8} /> <span>+</span>
//                 </>
//               </VisibilitySensor>
//             </b>
//             <span>{title}</span>
//           </div>
//         </div >
//       </Card>
//     </div >
//   )
// }

const LMS = ({ stats }) => {
  return (
    <LMSLayout>
      <Stats2 from="admins" stats={stats} />
    </LMSLayout>
  );
};

export async function getServerSideProps() {
  const res = await axios.get(`${API}/stat/all-stats`);

  return {
    props: {
      stats: res.data,
    },
  };
}

export default LMS;

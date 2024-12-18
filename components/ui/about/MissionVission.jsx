
import { useState } from "react";
import Mission from "./Mission";
import Vission from "./Vission";

const MissionVission = () => {

  const [tabs, setTabs] = useState('mission')

  return (
    <section className="expart__area pt-200 wow fadeInUp" >
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="expart__wrapper">
              <div className="expart__nav">
                <ul className="nav nav-pills justify-content-end" >
                  <li className="nav-item text-center">
                    <a onClick={() => setTabs('mission')} role="button" className={`nav-link ${tabs === "mission" && 'active'}`} >
                      Mission
                    </a>
                  </li>
                  <li className="nav-item text-center">
                    <a onClick={() => setTabs('vision')} role="button" className={`nav-link ${tabs === "vision" && 'active'}`} >
                      Vision
                    </a>
                  </li>
                </ul>
              </div>
              <div className="expart__tab">
                <div className="tab-content" id="expart-Content">
                  <div className={`tab-pane fade ${tabs === 'mission' && "show active"}`} >
                    <Mission image="1" />
                  </div>
                  <div className={`tab-pane fade ${tabs === 'vision' && "show active"}`} >
                    <Vission image="2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


  );
};

export default MissionVission;

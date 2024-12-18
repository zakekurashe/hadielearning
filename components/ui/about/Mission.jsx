
const Mission = () => {
  return (
    <>
      <div className="expart__tab-content white-bg">
        <div
          className="expart__thumb"
          style={{
            backgroundImage: `url(/images/about/compress/mission.webp`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div className="row">
          <div className="col-xl-6 col-lg-6 offset-lg-6">
            <div className="expart__content">
              <h3>The mission we are on</h3>
              <q>
                <i>
                  The mission of Hadi E-Learning is to empower the youth with the treasure of technical knowledge. We want our talented youth to excel in this digital age and set
                  higher benchmarks for themselves. We aim and strive to create opportunities for them so they don&apos;t have to stop on their road to success due to hurdles like fewer
                  or no opportunities.
                </i>
              </q>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mission;

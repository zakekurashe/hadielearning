
const FreeFlow = () => {
  return (
    <div className="boxes">
      <div id="leftBox">
        <h1>01</h1>
        <div className="left-box-content">
          <h2 className="myH2">Explore our available program list</h2>
        </div>
        <div className="left-box-image">
          <img src="/images/how-it-works/compress/explore.webp" />
        </div>
      </div>

      <div id="rightBox">
        <div className="right-box-image">
          <img src="/images/how-it-works/compress/whatsapp.webp" />
        </div>

        <div className="right-box-content">
          <h2 className="myH2">Chat with our student coordinator to learn more about your options</h2>
        </div>
        <h1>02</h1>
      </div>

      <div id="leftBox2">
        <h1>03</h1>
        <div className="left-box-content2">
          <h2 className="myH2">Choose the program that suits you the best </h2>
        </div>
        <div className="left-box-image2">
          <img src="/images/how-it-works/compress/chose.webp" />
        </div>
      </div>

      <div id="rightBox">
        <div className="right-box-image2">
          <img src="/images/how-it-works/compress/form.webp" />
        </div>

        <div className="right-box-content">
          <h2 className="myH2">Fill out the registration form and get the link to the relevant entry test.</h2>
        </div>

        <h1>04</h1>
      </div>

      <div id="leftBox3">
        <h1>05</h1>
        <div className="left-box-content3">
          <h2 className="myH2">Take the Test</h2>
        </div>
        <div className="left-box-image3">
          <img src="/images/how-it-works/compress/test.webp" />
        </div>
      </div>

      <div id="rightBox-pass">
        <div className="right-box-pass-image2">
          <img src="/images/how-it-works//compress/pass.webp" />
        </div>

        <div className="right-box-content-pass">
          <div className="">
            <h2 className="text-start">Pass</h2>
            <h5>You will be added to the waitlist and will be entertained on a first come first basis.</h5>
          </div>
        </div>

        <h1>5.1</h1>
      </div>

      <div id="leftBox3-fail">
        <h1>5.2</h1>
        <div className="left-box-content3-fail">
          {/* <a href="#leftBox2-fail"> */}
          <h2 className="myH2">Fail</h2>
          <h5 style={{ maxWidth: "300px" }}>Dont worry! Get back to step 5 and reattempt.</h5>
          {/* </a> */}
        </div>
        <div className="left-box-image3-fail">
          <img src="/images/how-it-works/compress/fail.webp" />
        </div>
      </div>

      <div id="rightBox3">
        <div className="right-box-image3">
          <img src="/images/how-it-works/compress/repeat.webp" />
        </div>

        <div className="right-box-content3">
          <h2 className="myH2">Learn about the course outline, outcomes, and schedules</h2>
        </div>
        <h1>06</h1>
      </div>
    </div>
  )
}

export default FreeFlow
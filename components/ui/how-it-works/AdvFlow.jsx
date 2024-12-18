
const AdvFlow = () => {
  return (
    <div className="boxes">

      <div id="leftBox">
        <h1>01</h1>
        <div className="left-box-content">
          <h2>Browse through our available program list</h2>
        </div>
        <div className="left-box-image">
          <img src="/images/how-it-works/adv/step1.png" />
        </div>
      </div>



      <div id="rightBox">
        <div className="right-box-image">
          <img src="/images/how-it-works/adv/step2.png" />
        </div>

        <div className="right-box-content">
          <h2>
            Chat with our student coordinator to gain insights into your options
          </h2>
        </div>
        <h1>02</h1>
      </div>



      <div id="leftBox2">
        <h1>03</h1>
        <div className="left-box-content2">
          <h2>Select the program that aligns best with your preferences and goals </h2>
        </div>
        <div className="left-box-image2">
          <img src="/images/how-it-works/adv/step-3.png" />
        </div>
      </div>



      <div id="rightBox">
        <div className="right-box-image2">
          <img src="/images/how-it-works/adv/step4.png" />
        </div>

        <div className="right-box-content">
          <h2>
            Learn about the course outline, outcomes, and schedules
          </h2>
        </div>

        <h1>04</h1>
      </div>



      <div id="leftBox3">
        <h1>05</h1>
        <div className="left-box-content3">
          <h2>Complete the registration form</h2>
        </div>
        <div className="left-box-image3">
          <img src="/images/how-it-works/adv/step5.png" />
        </div>
      </div>



      <div id="rightBox-pass">
        <div className="right-box-pass-image2">
          <img src="/images/how-it-works/adv/step6.png" />
        </div>

        <div className="right-box-content-pass">
          <div className="">
            <h2 className="text-start">Make the payment for your selected course</h2>

          </div>
        </div>

        <h1>6</h1>
      </div>



      <div id="leftBox3-fail">
        <h1>7</h1>
        <div className="left-box-content3-fail">
          <a href="#leftBox2-fail">
            <h2> Congratulations! You are now enrolled in the Program</h2>

          </a>
        </div>
        <div className="left-box-image3-fail">
          <img src="/images/how-it-works/adv/step7.png" />
        </div>
      </div>



    </div >
  )
}

export default AdvFlow
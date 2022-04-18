import React, { Fragment } from "react";
import "./About.css";
import { YouTube, Instagram, LinkedIn } from "@mui/icons-material";

const About = () => {
  return (
    <Fragment>
      <div className="row">
        <h2>About</h2>
        <div className="col-12">
          <div className="card">
            <div className="aboutContainer">
              <div className="aboutImage">
                <img
                  width={850}
                  height={450}
                  src={
                    "https://res.cloudinary.com/da7rhhzzp/image/upload/v1650274785/avatar/founder_qnm7rd.jpg"
                  }
                  alt="founderImage"
                />
              </div>
              <div className="aboutInfo">
                <h1>Ashwani Sharma</h1>
                <p>This is a iot sample wesbite made by Ashwani Sharma.</p>
                <p>Using MERN stack and Socket.IO.</p>
                <p>
                  For Raspberry PI to control and monitor Any industrial process
                  realtime anywhere on internet.
                </p>
                <div className="aboutLink">
                  <a
                    href="https://www.youtube.com/channel/UCle7667MeUHZIyAP7f3f8Tw"
                    target="blank"
                  >
                    <YouTube className="youtubeSvg" />
                  </a>

                  <a
                    href="https://www.instagram.com/ashsharma786"
                    target="blank"
                  >
                    <Instagram className="instagramSvg" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ashwani786sharma"
                    target="blank"
                  >
                    <LinkedIn className="linkedinSvg" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default About;

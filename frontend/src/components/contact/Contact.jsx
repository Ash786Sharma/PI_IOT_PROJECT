import React from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";
const Contact = () => {
  return (
    <div className="row">
      <h2>Contact</h2>
      <div className="col-12">
        <div className="card">
          <div className="contactContainer">
            <a className="mailBtn" href="mailto:mymailforabhi@gmail.com">
              <Button>Contact: ash786sharma@gmail.com</Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

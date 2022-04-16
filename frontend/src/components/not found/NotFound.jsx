import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <Fragment>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="notFoundContainer">
              <h1>Page Not Found</h1>
              <h2>or</h2>
              <h3> You Have No Access To This Resource</h3>
              <h4>Contact To Admin</h4>
              <Link to="/account/dashboard">Back</Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default NotFound;

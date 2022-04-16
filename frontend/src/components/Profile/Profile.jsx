import React from "react";
import { useSelector } from "react-redux";
import "./Profile.css";

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="row">
      <div className="col-12">
        <h2>My Profile</h2>
        <div className="card">
          <div className="userContainer">
            <div>
              <img src={user.avatar.url} alt={user.name} />
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substring(0, 10)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

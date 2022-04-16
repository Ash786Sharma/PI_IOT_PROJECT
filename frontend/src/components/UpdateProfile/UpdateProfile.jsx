import React, { Fragment, useState, useEffect } from "react";
import "./UpdateProfile.css";
import Loader from "../loader/Loader";
import { MailOutline, Face } from "@mui/icons-material/";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  loadUser,
  updateProfile,
} from "../../redux/action/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../redux/constants/userConstants";
const UpdateProfile = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/profile.png");

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());
      history.push("/profile");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, user, isUpdated, history]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="row">
            <div className="col-12">
              <h2>Update Profile</h2>
              <div className="card">
                <div className="updateProfileContainer">
                  <form
                    className="updateProfileForm"
                    encType="multipart/form-data"
                    onSubmit={updateProfileSubmit}
                  >
                    <div id="updateProfileImage">
                      <img src={avatarPreview} alt="Avatar Preview" />
                      <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={updateProfileDataChange}
                      />
                    </div>
                    <div>
                      <div className="updateProfileName">
                        <Face />
                        <input
                          type="text"
                          placeholder="Name"
                          required
                          name="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="updateProfileEmail">
                        <MailOutline />
                        <input
                          type="email"
                          placeholder="Email"
                          required
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <input
                        type="submit"
                        value="Update Profile"
                        className="updateProfileBtn"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateProfile;

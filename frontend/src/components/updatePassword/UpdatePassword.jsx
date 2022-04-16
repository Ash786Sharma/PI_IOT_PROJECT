import React, { Fragment, useEffect, useState } from "react";
import "./UpdatePassword.css";
import Loader from "../loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import { LockOpen, Lock, VpnKey } from "@mui/icons-material/";
import { clearErrors, updatePassword } from "../../redux/action/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../redux/constants/userConstants";

const UpdatePassword = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Password Updated Successfully");
      history.push("/profile");
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, alert, isUpdated, history]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="row">
            <div className="col-12">
              <h2>Update Password</h2>
              <div className="card">
                <div className="updatePasswordContainer">
                  <form
                    className="updatePasswordForm"
                    encType="multipart/form-data"
                    onSubmit={updatePasswordSubmit}
                  >
                    <div>
                      <div className="updatePassword">
                        <VpnKey />
                        <input
                          type="password"
                          placeholder="Old Password"
                          required
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                        />
                      </div>
                      <div className="updatePassword">
                        <LockOpen />
                        <input
                          type="password"
                          placeholder="New Password"
                          required
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>
                      <div className="updatePassword">
                        <Lock />
                        <input
                          type="password"
                          placeholder="Confirm Password"
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <input
                      type="submit"
                      value="Change"
                      className="updatePasswordBtn"
                    />
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

export default UpdatePassword;

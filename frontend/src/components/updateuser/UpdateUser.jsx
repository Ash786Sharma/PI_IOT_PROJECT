import React, { Fragment, useEffect, useState } from "react";
import "./UpdateUser.css";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@mui/material/";
import { MailOutline, Person, VerifiedUser } from "@mui/icons-material/";
import { UPDATE_USER_RESET } from "../../redux/constants/userConstants";
import {
  getUserDetails,
  updateUser,
  clearErrors,
} from "../../redux/action/userAction";

const UpdateUser = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, user } = useSelector((state) => state.userDetails);

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const userId = match.params.id;

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User Updated Successfully");
      history.push("/account/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, alert, error, history, isUpdated, updateError, user, userId]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(userId, myForm));
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-12">
          <h2>Update User</h2>
          <div className="card">
            <div className="userDetailContainer">
              <form
                className="userDetailForm"
                onSubmit={updateUserSubmitHandler}
              >
                <div>
                  <div className="userDetail">
                    <Person />
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="userDetail">
                    <MailOutline />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="userDetail">
                    <VerifiedUser />
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="">Choose Role</option>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      updateLoading ? true : false || role === "" ? true : false
                    }
                  >
                    Update
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;

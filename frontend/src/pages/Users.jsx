import React, { Fragment, useEffect, useState } from "react";
import "../components/userlist/UsersCard.css";
import { ArrowCircleLeft, ArrowCircleRight, Circle } from "@mui/icons-material";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import UsersCard from "../components/userlist/UsersCard";
import { getAllUsers, clearErrors } from "../redux/action/userAction";
import { DELETE_USER_RESET } from "../redux/constants/userConstants";
import Loader from "../components/loader/Loader";
const Users = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, error, users, pages, pageCount } = useSelector(
    (state) => state.allUsers
  );

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const nextPage = (e) => {
    e.preventDefault();
    if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
      // console.log(currentPage);
    }
  };
  const prevPage = (e) => {
    e.preventDefault();
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      // console.log(currentPage);
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success(message);
      history.push("/account/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers(currentPage));
  }, [
    dispatch,
    alert,
    error,
    currentPage,
    message,
    deleteError,
    isDeleted,
    history,
  ]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="row">
            {users &&
              users.map((user, index) => <UsersCard key={index} item={user} />)}
          </div>
          {pageCount !== 1 && (
            <div className="paginationBox">
              <button className="prevButton" onClick={prevPage}>
                <ArrowCircleLeft />
              </button>
              {pages &&
                pages.map((i, index) => (
                  <span
                    key={index + i}
                    className={currentPage === index + 1 ? `current` : ``}
                  >
                    <Circle />
                  </span>
                ))}
              <button className="nextButton" onClick={nextPage}>
                <ArrowCircleRight />
              </button>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Users;

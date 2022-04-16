import React from "react";
import "./UsersCard.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { deleteUser } from "../../redux/action/userAction";
import { useDispatch } from "react-redux";

const UsersCard = ({ item }) => {
  const dispatch = useDispatch();

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <div className="col-4">
      <div className="card">
        <div className="usersContainer">
          <div className="infoContainer">
            <img src={item.avatar.url} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.email}</p>
            <p className={item.role === "admin" ? "green" : "red"}>
              {item.role}
            </p>
          </div>
          <div className="optionsContainer">
            <Link to={`/account/user/${item._id}`}>
              <Edit />
            </Link>
            <Button onClick={() => deleteUserHandler(item._id)}>
              <Delete />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersCard;

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/action/userAction";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import Loader from "../components/loader/Loader";

const Logout = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();

  useEffect(() => {
    alert.success("Logout Success");
  }, [alert]);

  setTimeout(() => {
    dispatch(logout());
    history.push("/");
  }, 500);

  return <Loader />;
};

export default Logout;

import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./assets/css/grid.css";
import "./assets/css/theme.css";
import "./assets/css/index.css";
import LoginSignup from "./components/loginSingnup/LoginSignup";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./Routes/ProtectedRoute";
import store from "./store";
import { loadUser } from "./redux/action/userAction";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import ResetPassword from "./components/resetPassword/ResetPassword";
import NotFound from "./components/not found/NotFound";

// window.addEventListener("contextmenu", (e) => e.preventDefault());

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <BrowserRouter>
      <Route path="/" exact component={LoginSignup} />
      <Route path="/forgotpassword" exact component={ForgotPassword} />
      <Route path="/password/reset/:token" exact component={ResetPassword} />
      <ProtectedRoute path="/account/dashboard" exact component={Layout} />
      <Route
        component={
          window.location.pathname === "/" ||
          window.location.pathname === "/forgotpassword" ||
          window.location.pathname === "/password/reset/:token" ||
          window.location.pathname === "/account/dashboard" ||
          window.location.pathname === "/account/dashboard"
            ? null
            : NotFound
        }
      />
    </BrowserRouter>
  );
};

export default App;

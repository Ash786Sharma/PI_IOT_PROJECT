import React from "react";

import { Route, Switch } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Logout from "../pages/Logout";
import Profile from "../components/Profile/Profile";
import UpdateProfile from "../components/UpdateProfile/UpdateProfile";
import UpdatePassword from "../components/updatePassword/UpdatePassword";
import Controls from "../pages/Controls";
import Chat from "../pages/Chat";
import Users from "../pages/Users";
import UpdateUser from "../components/updateuser/UpdateUser";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "../components/not found/NotFound";
import Contact from "../components/contact/Contact";
import About from "../components/about/About";
const Routes = () => {
  return (
    <Switch>
      <Route path="/account/dashboard" exact component={Dashboard} />
      <Route path="/account/controls" exact component={Controls} />
      <Route path="/account/chat" exact component={Chat} />
      <ProtectedRoute
        isAdmin={true}
        path="/account/users"
        exact
        component={Users}
      />
      <Route path="/logout" exact component={Logout} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/updateprofile" exact component={UpdateProfile} />
      <Route path="/updatepassword" exact component={UpdatePassword} />
      <Route path="/account/user/:id" exact component={UpdateUser} />
      <Route path="/account/notFound" exact component={NotFound} />
      <Route path="/account/about" exact component={About} />
      <Route path="/account/contact" exact component={Contact} />
    </Switch>
  );
};

export default Routes;

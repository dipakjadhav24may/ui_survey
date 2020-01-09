import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import ProtectedRoute from "./protected.route";
import UnProtectedRoute from "./unprotected.route";

import SignInPage from "../pages/signInPage";
import SignUpPage from "../pages/signUpPage";
import App from "./app";
import NotFound from "../pages/notFound";

const Routes = () => (
  <Router>
    <Switch>
      <UnProtectedRoute exact path="/" component={SignInPage} />
      <UnProtectedRoute path="/signup" component={SignUpPage} />
      <ProtectedRoute path="/app" component={App} />
      <UnProtectedRoute component={NotFound} />
    </Switch>
  </Router>
);

export default Routes;

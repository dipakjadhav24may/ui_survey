import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import ProtectedRoute from "./protected.route";
import UnProtectedRoute from "./unprotected.route";

import { connect } from "react-redux";

import SignInPage from "../pages/signInPage";
import SignUpPage from "../pages/signUpPage";
import App from "./app";
import NotFound from "../pages/notFound";
import jwtDecode from "jwt-decode";
import store from "../redux/store";
import { SET_UNAUTHENTICATED } from "../redux/types";

const Routes = ({ token }) => {
  if (token) {
    let decodedToken = jwtDecode(token);
    // console.log(
    //   "TCL: Routes -> token valid till",
    //   new Date(decodedToken.exp * 1000)
    // );
    if (decodedToken.exp * 1000 < Date.now()) {
      store.store.dispatch({ type: SET_UNAUTHENTICATED });
    }
  } else {
    store.store.dispatch({ type: SET_UNAUTHENTICATED });
  }
  return (
    <Router>
      <Switch>
        <UnProtectedRoute exact path="/" component={SignInPage} />
        <UnProtectedRoute path="/signup" component={SignUpPage} />
        <ProtectedRoute path="/app" component={App} />
        <UnProtectedRoute component={NotFound} />
      </Switch>
    </Router>
  );
};

const mapStateToProps = state => ({
  token: state.user.token
});
export default connect(mapStateToProps)(Routes);

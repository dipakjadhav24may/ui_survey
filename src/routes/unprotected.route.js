import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const UnProtectedRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        !authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/app/dashboard" />
        )
      }
    />
  );
};

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(UnProtectedRoute);

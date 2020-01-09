import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "../auth";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!Auth.isAuthenticated()) {
          return <Component {...props} />;
        } else {
          let returnRoute = "/app/dashboard";
          //   returnRoute = Auth.getNavRoute();

          return (
            <Redirect
              to={{
                pathname: returnRoute,
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;

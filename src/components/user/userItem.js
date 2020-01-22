/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { withRouter } from "react-router-dom";
// import * as ROUTE from "../../utils/routes";

const userItem = ({
  user: { firstName, lastName, email },
  history
}) => { 
  return (
    <div className="card" >
      <div className="card-body">
        <div className="row">
          <div className="col-sm-4">
            <p className="card-text">firstName: {firstName}</p>
          </div>
          <div className="col-sm-4">
            <p className="card-text">LastName: {lastName}</p>
          </div>
          <div className="col-sm-4">
            <p className="card-text">Email: {email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(userItem);

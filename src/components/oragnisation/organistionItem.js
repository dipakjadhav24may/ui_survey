/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { withRouter } from "react-router-dom";
import * as ROUTE from "../../utils/routes";

const OrganistionItem = ({
  organisation: { orgId, orgName, city, state, country },
  history
}) => {
  const onClickHandler = event => {
    const singlePageRoute = ROUTE.ORGANISATIONS + "/" + orgId;
    history.push(singlePageRoute);
  };
  return (
    <div className="card" onClick={onClickHandler}>
      <div className="card-body">
        <h5 className="card-title">{orgName}</h5>
        <div className="row">
          <div className="col-sm-4">
            <p className="card-text">city: {city}</p>
          </div>
          <div className="col-sm-4">
            <p className="card-text">state: {state}</p>
          </div>
          <div className="col-sm-4">
            <p className="card-text">country: {country}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(OrganistionItem);

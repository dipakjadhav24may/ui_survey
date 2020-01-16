import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as ROUTES from "../../../utils/routes";
import { logOutAction } from "../../../redux/actions/userActions";

export class Header extends Component {
  signOutHandler = () => {
    this.props.logOutAction(this.props.history);
  };

  render() {
    const { location } = this.props;
    const dashboardClass =
      location.pathname === ROUTES.DASHBOARD ? "active" : "";
    const organisationClass =
      location.pathname === ROUTES.ORGANISATIONS ? "active" : "";
    const profileClass = location.pathname === ROUTES.PROFILE ? "active" : "";
    return (
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className={"nav-link " + dashboardClass}
                to={ROUTES.DASHBOARD}
              >
                Projects
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={"nav-link " + organisationClass}
                to={ROUTES.ORGANISATIONS}
              >
                Organisation
              </Link>
            </li>
            <li className="nav-item">
              <Link className={"nav-link " + profileClass} to={ROUTES.PROFILE}>
                Profile
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li
              className="nav-item navbar-right"
              onClick={this.signOutHandler}
              style={{ cursor: "pointer" }}
            >
              <span className="nav-link">Sign Out</span>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default connect(null, { logOutAction })(withRouter(Header));

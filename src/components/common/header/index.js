import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as ROUTES from "../../../utils/routes";
import Auth from "../../../auth";
import { logoutAction } from "../../../redux/actions/appActions";

export class Header extends Component {
  signOutHandler = () => {
    Auth.logout(() => {
      this.props.logoutAction();
      this.props.history.push(ROUTES.LANDING);
    });
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to={ROUTES.DASHBOARD}>
              Ui Survey
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to={ROUTES.ORGANISATIONS}>
              Organisation
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li
            className="nav-item navbar-right text-white"
            onClick={this.signOutHandler}
            style={{ cursor: "pointer" }}
          >
            Sign Out
          </li>
        </ul>
      </nav>
    );
  }
}

export default connect(null, { logoutAction })(withRouter(Header));

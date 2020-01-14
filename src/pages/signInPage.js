import React, { Component } from "react";
// import Layout from "../components/common/layout";
import { loginAction } from "../redux/actions/appActions";
// import { SignUpLink } from "./SignUp";
import { Link } from "react-router-dom";
// import * as ROUTES from "./routes";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Auth from "../auth";
import * as CONSTANTS from "../utils/constants";
import * as ROUTES from "../utils/routes";

const INITIAL_STATE = {
  username: CONSTANTS.username,
  password: CONSTANTS.password,
  errors: null
};

class SignInPage extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  UNSAFE_componentWillMount() {
    if (
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.username
    ) {
      this.setState({
        username: this.props.location.state.username,
        password: ""
      });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.isLoggedIn !== this.props.isLoggedIn) {
      Auth.login(() => {
        this.props.history.push(ROUTES.DASHBOARD);
      });
    }

    if (nextProps.response && nextProps.response.status === 401) {
      this.setState({
        error: { message: nextProps.response.message }
      });
    }
  }

  onSubmit = event => {
    let data = { username: this.state.username, password: this.state.password };
    this.props.loginAction(data);
    this.setState({ ...INITIAL_STATE });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  gotosignup() {
    this.props.history.push(ROUTES.SIGNUP);
  }

  render() {
    const { username, password, error } = this.state;

    const isInvalid = password === "" || username === "";
    return (
      <div className="text-center c-signinContainer">
        <h1>SignIn</h1>
        <div className="form-group">
          <input
            className="form-control"
            name="username"
            value={username}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
        </div>
        {error && <p className="text-danger">{error.message}</p>}
        <button
          disabled={isInvalid}
          className="btn btn-success mt-3"
          type="submit"
          onClick={this.onSubmit}
        >
          Sign In
        </button>

        <p className="mt-5">
          Don't have an account? <Link to={"/signup"}>Sign Up</Link>
        </p>
      </div>
    );
  }
}

const mapStateToProps = ({ appReducer }) => ({
  isLoggedIn: appReducer.isLoggedIn,
  response: appReducer.response
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loginAction
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);

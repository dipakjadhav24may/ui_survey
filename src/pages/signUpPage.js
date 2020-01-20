import React, { Component } from "react";
import { Link } from "react-router-dom";

// import { compose } from "recompose";
import { connect } from "react-redux";
import * as ROUTES from "../utils/routes";
import { isEmail, isEmpty } from "../utils/helpermethods";
import axios from "axios";
import { BASE_URL } from "../utils/config";

const INITIAL_STATE = {
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
  orgName: "",
  errors: null
};

class SignUpPage extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmitHandler = event => {
    event.preventDefault();
    const {
      userName,
      email,
      password,
      firstName,
      lastName,
      orgName
    } = this.state;
    let userData = {
      email,
      firstName,
      lastName,
      orgName,
      password,
      userName
    };
    axios
      .post(BASE_URL + "token/signup", userData)
      .then(response => {
        if (response.status === 200) {
          let username = this.state.userName;
          this.setState({ ...INITIAL_STATE });
          this.props.history.push(ROUTES.LANDING, {
            username
          });
        }
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  onChange = event => {
    const errors = {};
    if (isEmpty(event.target.value)) {
      errors[event.target.name] = "field must not be empty";
    }
    if (event.target.name === "email") {
      if (!isEmail(event.target.value)) {
        errors[event.target.name] = "Must be a valid email address";
      }
      if (isEmpty(event.target.value)) {
        errors[event.target.name] = "Email field must not be empty";
      }
    }

    if (
      event.target.name === "confirmPassword" &&
      event.target.value.length >= this.state.password.length &&
      event.target.value !== this.state.password
    ) {
      errors[event.target.name] = "Passwords must match";
    }

    this.setState({ [event.target.name]: event.target.value, errors });
  };

  render() {
    const {
      firstName,
      lastName,
      userName,
      email,
      password,
      confirmPassword,
      orgName,
      errors
    } = this.state;

    const isInvalid =
      isEmpty(firstName) ||
      isEmpty(lastName) ||
      isEmpty(userName) ||
      isEmpty(email) ||
      !isEmail(email) ||
      isEmpty(password) ||
      confirmPassword !== password ||
      isEmpty(orgName);

    return (
      <div className=" c-signinContainer">
        <h1 className="text-center">Sign up</h1>
        <div className="row">
          <div className="col-md-6 col-xs-12">
            <div className="form-group">
              <label>First Name:</label>
              <input
                className={`form-control ${
                  errors && errors.firstName ? "is-invalid" : ""
                }`}
                name="firstName"
                value={firstName}
                onChange={this.onChange}
                type="text"
              />
              <div className="invalid-feedback">
                {errors && "First name " + errors.firstName}
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xs-12">
            <div className="form-group">
              <label>Last Name:</label>
              <input
                className={`form-control ${
                  errors && errors.lastName ? "is-invalid" : ""
                }`}
                name="lastName"
                value={lastName}
                onChange={this.onChange}
                type="text"
              />
              <div className="invalid-feedback">
                {errors && "Last name " + errors.lastName}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-xs-12">
            <div className="form-group">
              <label>Email:</label>
              <input
                className={`form-control ${
                  errors && errors.email ? "is-invalid" : ""
                }`}
                name="email"
                value={email}
                onChange={this.onChange}
                type="text"
              />
              <div className="invalid-feedback">{errors && errors.email}</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-xs-12">
            <div className="form-group">
              <label>Username:</label>
              <input
                className={`form-control ${
                  errors && errors.userName ? "is-invalid" : ""
                }`}
                name="userName"
                value={userName}
                onChange={this.onChange}
                type="text"
              />
              <div className="invalid-feedback">
                {errors && "Username " + errors.userName}
              </div>
            </div>
          </div>

          <div className="col-md-6 col-xs-12">
            <div className="form-group">
              <label>Company:</label>
              <input
                className={`form-control ${
                  errors && errors.orgName ? "is-invalid" : ""
                }`}
                name="orgName"
                value={orgName}
                onChange={this.onChange}
                type="text"
              />
              <div className="invalid-feedback">
                {errors && "Company " + errors.orgName}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-xs-12">
            <div className="form-group">
              <label>Password:</label>
              <input
                className={`form-control ${
                  errors && errors.password ? "is-invalid" : ""
                }`}
                name="password"
                value={password}
                onChange={this.onChange}
                type="password"
              />
              <div className="invalid-feedback">
                {errors && "Password " + errors.password}
              </div>
            </div>
          </div>

          <div className="col-md-6 col-xs-12">
            <div className="form-group">
              <label>Confirm Password:</label>
              <input
                className={`form-control ${
                  errors && errors.confirmPassword ? "is-invalid" : ""
                }`}
                name="confirmPassword"
                value={confirmPassword}
                onChange={this.onChange}
                type="password"
              />
              <div className="invalid-feedback">
                {errors && errors.confirmPassword}
              </div>
            </div>
          </div>
        </div>

        <button
          className="btn btn-success"
          type="submit"
          disabled={isInvalid}
          onClick={this.onSubmitHandler.bind(this)}
        >
          Sign Up
        </button>
        <p className="mt-5">
          Already have an account? <Link to={"/"}>Sign In</Link>
        </p>
      </div>
    );
  }
}

const mapStateToProps = ({ appReducer }) => ({});

export default connect(mapStateToProps, {})(SignUpPage);

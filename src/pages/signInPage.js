import React, { Component } from "react";
import { loginUserAction } from "../redux/actions/userActions";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Layout from "../components/common/layout";

const INITIAL_STATE = {
  username: "",
  password: "",
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
    // if (nextProps.ui.errors !== this.props.ui.errors) {
    //   this.setState({
    //     errors: nextProps.ui.errors
    //   });
    // }
  }

  onSubmit = event => {
    event.preventDefault();
    let data = { username: this.state.username, password: this.state.password };
    this.props.loginUserAction(data, this.props.history);
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    // const {
    //   ui: { loading }
    // } = this.props;

    const { username, password } = this.state;

    const isInvalid = password === "" || username === "";
    return (
      <Layout>
        <div className="text-center c-signinContainer">
          <h1>Sign In</h1>
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
          {/* {error && <p className="text-danger">{error.message}</p>} */}
          <button
            disabled={isInvalid}
            className="btn btn-success mt-3"
            type="submit"
            onClick={this.onSubmit}
          >
            Sign In
          </button>

          <p className="mt-5">
            Don't have an account?{" "}
            <Link className="custom-link" to={"/signup"}>
              Sign up
            </Link>
            <br></br>
            <small>&copy; 2020 Radioactive</small>
          </p>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  ui: state.ui
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loginUserAction
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);

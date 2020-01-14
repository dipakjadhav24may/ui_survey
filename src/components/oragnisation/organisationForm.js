import React, { Component } from "react";
import { isEmpty } from "../../utils/helpermethods";
import { createOrgAction } from "../../redux/actions/appActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const INITIAL_STATE = {
  city: "",
  country: "",
  orgName: "",
  state: "",
  errors: null
};

class OrganisationForm extends Component {
  state = { ...INITIAL_STATE };

  onSubmitHandler = event => {
    event.preventDefault();
    const { city, country, orgName, state } = this.state;
    const { userToken } = this.state;

    let userData = {
      city,
      country,
      orgName,
      state
    };
    this.props.createOrgAction(userData, userToken);
  };
  componentWillMount() {
    console.log(
      "TCL: OrganisationForm -> componentWillMount -> componentWillMount"
    );
  }
  componentWillUpdate() {
    console.log(
      "TCL: OrganisationForm -> componentWillUpdate -> componentWillUpdate"
    );
  }
  componentDidMount() {
    console.log(
      "TCL: OrganisationForm -> componentDidMount -> componentDidMount"
    );
  }
  componentDidUpdate() {
    console.log(
      "TCL: OrganisationForm -> componentDidUpdate -> componentDidUpdate"
    );
  }
  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.organisations.length > this.props.organisations.length) {
      this.setState({
        ...INITIAL_STATE
      });
    }
  }

  onChange = event => {
    const errors = { ...this.state.errors };

    if (isEmpty(event.target.value)) {
      errors[event.target.name] = "field must not be empty";
    } else {
      errors[event.target.name] = "";
    }
    this.setState({ [event.target.name]: event.target.value, errors });
  };

  render() {
    console.log("TCL: OrganisationForm -> render -> render");

    const { city, country, orgName, state, errors } = this.state;

    const isInvalid =
      isEmpty(city) || isEmpty(country) || isEmpty(orgName) || isEmpty(state);
    return (
      <div>
        <h2 className="text-center mb-4">Create Organization</h2>
        <div className="form-group">
          <label>City:</label>
          <input
            className={`form-control ${
              errors && errors.city ? "is-invalid" : ""
            }`}
            name="city"
            value={city}
            onChange={this.onChange}
            type="text"
          />
          <div className="invalid-feedback">
            {errors && "City " + errors.city}
          </div>
        </div>

        <div className="form-group">
          <label>Country:</label>
          <input
            className={`form-control ${
              errors && errors.country ? "is-invalid" : ""
            }`}
            name="country"
            value={country}
            onChange={this.onChange}
            type="text"
          />
          <div className="invalid-feedback">
            {errors && "Country" + errors.country}
          </div>
        </div>
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
          <div className="invalid-feedback">{errors && errors.orgName}</div>
        </div>

        <div className="form-group">
          <label>State:</label>
          <input
            className={`form-control ${
              errors && errors.state ? "is-invalid" : ""
            }`}
            name="state"
            value={state}
            onChange={this.onChange}
            type="text"
          />
          <div className="invalid-feedback">
            {errors && "State " + errors.state}
          </div>
        </div>
        <button
          className="btn btn-success"
          type="submit"
          disabled={isInvalid}
          onClick={this.onSubmitHandler.bind(this)}
        >
          Create
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ appReducer }) => ({
  userToken: appReducer.userToken,
  organisations: appReducer.organisations
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createOrgAction
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OrganisationForm);

import React, { Component } from "react";
import { isEmpty } from "../../utils/helpermethods";
import { createOrgAction } from "../../redux/actions/dataActions";
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

  UNSAFE_componentWillReceiveProps(nextProps, nextState) {
    if (
      nextProps.data.organisations.length > this.props.data.organisations.length
    ) {
      this.setState({
        ...INITIAL_STATE
      });
    }
  }

  onSubmitHandler = event => {
    event.preventDefault();
    const { city, country, orgName, state } = this.state;
    const {
      user: {
        user: { userId },
        token
      }
    } = this.props;

    let userData = {
      city,
      country,
      orgName,
      state,
      createdBy: userId
    };
    this.props.createOrgAction(userData, token);
  };

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
    const { city, country, orgName, state, errors } = this.state;
    const isInvalid =
      isEmpty(city) || isEmpty(country) || isEmpty(orgName) || isEmpty(state);
    return (
      <div>
        <h2 className="text-center mb-4">Create Organization</h2>
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

const mapStateToProps = state => ({
  user: state.user,
  ui: state.ui,
  data: state.data
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ createOrgAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OrganisationForm);

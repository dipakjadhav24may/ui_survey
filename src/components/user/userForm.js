import React, { Component } from "react";
import { isEmpty } from "../../utils/helpermethods";
import { createOrgUserAction } from "../../redux/actions/dataActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom';


const INITIAL_STATE = {
    firstName: "",
    lasteName: "",
    email: "",
    userName: "",
    userType: "",
    password: "",
    errors: null
};

class UserForm extends Component {
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
        const { firstName, lasteName, email } = this.state;
        console.log("Props data===", this.props)
        const {
      user: { token },
            match: {
        params: { orgId, groupId }
      }
    } = this.props;

        let userData = {
            "email": email,
            "firstName": firstName,
            "groupId": groupId,
            "lastName": lasteName,
            "mobileNo": "",
            "orgId": orgId,
            "password": 123456,
            "userName": email,
            "userType": "USER"
        }
        this.props.createOrgUserAction(userData, token);
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
        const { firstName, lasteName, email, errors } = this.state;
        const isInvalid =
            isEmpty(firstName) || isEmpty(lasteName) || isEmpty(email);
        return (
            <div>
                <h2 className="text-center mb-4">Create User</h2>
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
                    <div className="invalid-feedback">{errors && errors.firstName}</div>
                </div>
                <div className="form-group">
                    <label>LastName:</label>
                    <input
                        className={`form-control ${
                            errors && errors.lasteName ? "is-invalid" : ""
                            }`}
                        name="lasteName"
                        value={lasteName}
                        onChange={this.onChange}
                        type="text"
                    />
                    <div className="invalid-feedback">
                        {errors && "lasteName " + errors.lasteName}
                    </div>
                </div>

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
                    <div className="invalid-feedback">
                        {errors && "email " + errors.email}
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
    bindActionCreators({ createOrgUserAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserForm));

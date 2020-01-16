import React, { Component } from "react";
import { createGroupAction } from "../../redux/actions/dataActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { isEmpty } from "../../utils/helpermethods";

class CreateGroupForm extends Component {
  state = {
    groupName: "",
    errors: null
  };

  UNSAFE_componentWillReceiveProps(nextProps, nextState) {
    if (
      nextProps.data.organisation.groups.length !==
      this.props.data.organisation.groups.length
    ) {
      this.setState({ groupName: "" });
    }
  }

  onSubmitHandler = event => {
    event.preventDefault();

    const { groupName } = this.state;
    const { orgId, token } = this.props;

    let newGroupData = {
      groupName,
      orgId
    };
    this.props.createGroupAction(newGroupData, token);
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
    const { errors, groupName } = this.state;
    const isInvalid = isEmpty(groupName);
    return (
      <div className="row">
        <div className="col-xs-10 col-sm-10">
          <div className="form-group">
            <input
              className={`form-control ${
                errors && errors.groupName ? "is-invalid" : ""
              }`}
              name="groupName"
              value={groupName}
              placeholder="Group Name"
              onChange={this.onChange}
              type="text"
            />
            <div className="invalid-feedback">{errors && errors.groupName}</div>
          </div>
        </div>
        <div className="col-xs-2 col-sm-2">
          <button
            className="btn btn-success btn-block"
            type="submit"
            disabled={isInvalid}
            onClick={this.onSubmitHandler.bind(this)}
          >
            Create
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  data: state.data
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ createGroupAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroupForm);

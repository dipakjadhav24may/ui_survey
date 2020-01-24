import React, { Component } from "react";
import {
  getOrgUserAction,
  getSurveysAction
} from "../redux/actions/dataActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import Layout from "../components/common/layout";
import UserForm from "../components/user/userForm";
import UserTable from "../components/user/userTable";
import { BASE_URL } from "../utils/config";

class User extends Component {
  state = {
    users: [],
    group: {},
    selectedUsers: [],
    selectedSurvey: {},
    surveys: []
  };

  componentDidMount() {
    const {
      user: {
        user: { userId },
        token
      },
      match: {
        params: { orgId, groupId }
      }
    } = this.props;
    this.props.getOrgUserAction(orgId, groupId, token);
    axios
      .get(BASE_URL + "organization/group/" + groupId)
      .then(response => {
        this.setState({
          group: response.data
        });
      })
      .catch(error => console.log(error));
    this.props.getSurveysAction(userId, token);
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.data.organisation !== this.props.data.organisation) {
      this.setState({ users: nextProps.data.organisation.users });
    }
    if (nextProps.data.surveys !== this.props.data.surveys) {
      this.setState({ surveys: nextProps.data.surveys });
    }
  }

  onSelectHandler = (users, type) => {
    let { selectedUsers } = this.state;
    if (type === "all") {
      if (selectedUsers.length === users.length) {
        this.setState({
          selectedUsers: []
        });
      } else {
        this.setState({
          selectedUsers: users
        });
      }
    } else {
      let index;
      let checkedUsers = selectedUsers.filter((userSL, key) => {
        if (userSL.userId === users.userId) {
          index = key;
          return true;
        }
        return false;
      });
      let updatedUsers = selectedUsers;
      if (checkedUsers.length === 0) {
        updatedUsers.push(users);
        this.setState({
          selectedUsers: updatedUsers
        });
      } else {
        updatedUsers.splice(index, 1);
        this.setState({
          selectedUsers: updatedUsers
        });
      }
    }
  };

  handleSurveyChange = survey => {
    this.setState({
      selectedSurvey: survey
    });
  };

  sendSurvey = event => {
    let { selectedUsers, selectedSurvey } = this.state;
     const { history } = this.props;
    if (
      selectedUsers.length === 0 ||
      Object.values(selectedSurvey).length === 0
    ) {
      return;
    }

    const {
      user: { token }
    } = this.props;

    axios.defaults.headers.common["Authorization"] = token;

    selectedUsers.forEach((user, index) => {
      let assessmentData = {
        status: "INVITE",
        surveyId: selectedSurvey.firebaseSurveyId,
        userId: user.userId
      };

      axios
        .post(BASE_URL + "organization/assessment", assessmentData)
        .then(response => {
          if (index + 1 === selectedUsers.length) {
            this.setState({
              selectedUsers: [],
              selectedSurvey: {}
            });
          }
        })
        .catch(error => console.log(error));
         history.goBack();
    });
  };

  render() {
    const { users, group, selectedUsers, surveys, selectedSurvey } = this.state;
    const { history } = this.props;

    return (
      <Layout showHF={true}>
        <div className="container mt-5 px-0">
          <div
            className="btn btn-secondary mb-5"
            onClick={() => {
              history.goBack();
            }}
          >
            Go Back
          </div>
          <div className="row">
            <div className="col-sm-8 mb-5">
              <div className="row">
                <div className="col-sm-6">
                  <h2 className="mb-4">{group.groupName} Users </h2>
                </div>
                <div className="col-sm-6">
                  <div className="btn-group mt-2">
                    <button
                      type="button"
                      className="btn btn-secondary px-4 py-2 dropdown-toggle dropdown-button"
                      data-toggle="dropdown"
                      data-display="static"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {selectedSurvey && selectedSurvey.surveyId
                        ? selectedSurvey.surveyName
                        : "Surveys"}
                    </button>
                    <div className="dropdown-menu">
                      {surveys.length ? (
                        surveys.map(survey => (
                          <button
                            className="dropdown-item"
                            type="button"
                            onClick={this.handleSurveyChange.bind(this, survey)}
                            key={survey.surveyId}
                          >
                            {survey.surveyName}
                          </button>
                        ))
                      ) : (
                        <Link
                          className="dropdown-item"
                          type="button"
                          to={`/app/createnewproject`}
                        >
                          Create Survey
                        </Link>
                      )}
                    </div>
                  </div>
                  {/* {selectedUsers.length ? ( */}
                  <span
                    className="float-right border p-2 mt-2"
                    onClick={this.sendSurvey}
                    style={{ cursor: "pointer" }}
                  >
                    Send Survey
                    <i
                      className="fa fa-paper-plane  ml-2"
                      aria-hidden="true"
                    ></i>
                  </span>
                  {/* ) : null} */}
                </div>
              </div>

              <UserTable
                users={users}
                selectedUsers={selectedUsers}
                onSelectHandler={this.onSelectHandler}
              />
            </div>
            <div className="col-sm-4">
              <UserForm />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  ui: state.ui,
  data: state.data
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getOrgUserAction, getSurveysAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(User);

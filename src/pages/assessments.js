import React, { Component } from "react";
import { getOrgUserAction } from "../redux/actions/dataActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import axios from "axios";
import Layout from "../components/common/layout";
import { BASE_URL } from "../utils/config";

class Assessments extends Component {
  state = {
    assessments: [],
    user: {},
    organisation: {},
    group: {}
  };

  componentDidMount() {
    const {
      user: { token },
      match: {
        params: { userId, orgId, groupId }
      }
    } = this.props;
    // this.props.getOrgUserAction(orgId, groupId, token);
    axios.defaults.headers.common["Authorization"] = token;
    axios
      .all([
        this.getUserAccount(userId),
        this.getOrganisation(orgId),
        this.getGroup(groupId)
      ])
      .then(
        axios.spread((user_response, org_response, group_response) => {
          this.setState({
            user: user_response.data,
            organisation: org_response.data,
            group: group_response.data
          });
        })
      )
      .catch(error => {
        console.log(error);
      });
  }

  getUserAccount = userId => {
    return axios.get(`${BASE_URL}organization/users/${userId}`);
  };

  getOrganisation = orgId => {
    return axios.get(`${BASE_URL}organization/org/${orgId}`);
  };

  getGroup = groupId => {
    return axios.get(`${BASE_URL}organization/group/${groupId}`);
  };

  //   UNSAFE_componentWillReceiveProps(nextProps, nextState) {
  //     if (nextProps.data.organisation !== this.props.data.organisation) {
  //       this.setState({ users: nextProps.data.organisation.users });
  //     }
  //   }

  render() {
    const { user, organisation, group } = this.state;
    console.log("TCL: Assessments -> render -> group", group);
    console.log("TCL: Assessments -> render -> organisation", organisation);
    console.log("TCL: Assessments -> render -> user", user);
    const {
      match: {
        params: { orgId, groupId }
      }
    } = this.props;

    return (
      <Layout showHF={true}>
        <div className="container mt-5 px-0">
          <div className="row">
            <div className="col-sm-8 mb-5">
              <h2 className="text-center mb-4">
                {user.firstName && user.firstName + "'s"} Assessments
              </h2>
              {/* <UserTable users={users} orgId={orgId} groupId={groupId} /> */}
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
  bindActionCreators({ getOrgUserAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Assessments);

import React, { Component } from "react";
import { getOrgUserAction } from "../redux/actions/dataActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import axios from "axios";
import Layout from "../components/common/layout";
import UserForm from "../components/user/userForm";
import UserTable from "../components/user/userTable";
import { BASE_URL } from "../utils/config";

class User extends Component {
  state = {
    users: [],
    group: {}
  };

  componentDidMount() {
    const {
      user: { token },
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
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.data.organisation !== this.props.data.organisation) {
      this.setState({ users: nextProps.data.organisation.users });
    }
  }

  render() {
    const { users, group } = this.state;
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
              <h2 className="text-center mb-4">{group.groupName} Users</h2>
              <UserTable users={users} orgId={orgId} groupId={groupId} />
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
  bindActionCreators({ getOrgUserAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(User);

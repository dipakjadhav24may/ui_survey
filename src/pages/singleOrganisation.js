import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getSingleOrgAction } from "../redux/actions/dataActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as ROUTES from "../utils/routes";
import Layout from "../components/common/layout";
import CreateGroupForm from "../components/singleOrganisation/createGroupForm";
import GroupTable from "../components/singleOrganisation/groupTable";
import UserTable from "../components/singleOrganisation/usersTable";
class OrganisationItem extends Component {
  state = {
    organisation: {},
    groupName: "",
    errors: null
  };

  componentDidMount() {
    const {
      user: { token },
      match: {
        params: { id: orgId }
      }
    } = this.props;
    this.props.getSingleOrgAction(orgId, token);
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.data.organisation !== this.props.data.organisation) {
      this.setState({ organisation: nextProps.data.organisation });
    }
  }

  render() {
    const { organisation } = this.state;
    const {
      user: { token },
      match: {
        params: { id: orgId }
      }
    } = this.props;
    return (
      <Layout showHF={true}>
        <div className="container mt-5 px-0">
          <Link className="btn btn-secondary" to={ROUTES.ORGANISATIONS}>
            Go Back
          </Link>
          <div className="row">
            <div className="col-sm-12">
              <h2 className="text-center mb-4">{organisation.orgName}</h2>
              <h4>Groups</h4>
              <CreateGroupForm orgId={orgId} token={token} />
              <div className="row">
                <div className="col-sm-12">
                  <GroupTable
                    groups={organisation.groups}
                    orgName={organisation.orgName}
                  />
                </div>
              </div>
              <h4 className="mt-5">Users</h4>
              <div className="row mb-5">
                <div className="col-sm-12">
                  <UserTable
                    users={organisation.users}
                    orgName={organisation.orgName}
                  />
                </div>
              </div>
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
  bindActionCreators({ getSingleOrgAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OrganisationItem);

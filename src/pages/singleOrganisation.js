import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getOrgListAction } from "../redux/actions/appActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as ROUTES from "../utils/routes";

import Layout from "../components/common/layout";

class OrganisationItem extends Component {
  state = {
    organisation: {},
    loading: false
  };

  componentDidMount() {
    // this.props.getSingleOrgAction(orgId,this.props.userToken);
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextState) {
    if (nextProps !== this.props) {
      this.setState({ organisation: nextProps.organisation });
    }
  }

  render() {
    const { organisation } = this.state;
    console.log("TCL: Organisation -> render -> organisation", organisation);

    return (
      <Layout showHF={true}>
        <div className="container mt-5 px-0">
          <Link className="btn btn-secondary" to={ROUTES.ORGANISATIONS}>
            Go Back
          </Link>
          <div className="row">
            <div className="col-sm-12">
              <h2 className="text-center mb-4">Single Organization</h2>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = ({ appReducer }) => ({
  userToken: appReducer.userToken,
  organisation: appReducer.organisation
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getOrgListAction
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OrganisationItem);

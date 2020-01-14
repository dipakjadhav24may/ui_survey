import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { getOrgListAction } from "../redux/actions/appActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// import * as ROUTES from "../utils/routes";

import Layout from "../components/common/layout";
import OrganisationForm from "../components/oragnisation/organisationForm";
import OrganistionItem from "../components/oragnisation/organistionItem";

class Organisation extends Component {
  state = {
    organisations: [],
    loading: false
  };

  componentDidMount() {
    this.props.getOrgListAction(this.props.userToken);
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextState) {
    if (nextProps !== this.props) {
      this.setState({ organisations: nextProps.organisations });
    }
  }

  render() {
    const { organisations } = this.state;

    return (
      <Layout showHF={true}>
        <div className="container mt-5 px-0">
          <div className="row">
            <div className="col-sm-8">
              <h2 className="text-center mb-4">Yours Organization</h2>
              <ul className="list-group c-organistionList">
                {organisations.map(organisation => {
                  return (
                    <li
                      className="list-group-item"
                      style={{ border: "none" }}
                      key={organisation.orgId}
                    >
                      <OrganistionItem organisation={organisation} />
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="col-sm-4">
              <OrganisationForm />
            </div>
          </div>
        </div>
      </Layout>
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
      getOrgListAction
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Organisation);

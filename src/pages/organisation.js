import React, { Component } from "react";
import { getOrgListAction } from "../redux/actions/dataActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Layout from "../components/common/layout";
import OrganisationForm from "../components/oragnisation/organisationForm";
import OrganistionItem from "../components/oragnisation/organistionItem";

class Organisation extends Component {
  state = {
    organisations: []
  };

  componentDidMount() {
    const {
      user: {
        user: { userId },
        token
      }
    } = this.props;
    this.props.getOrgListAction(userId, token);
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.data !== this.props.data) {
      this.setState({ organisations: nextProps.data.organisations });
    }
  }

  render() {
    const { organisations } = this.state;
   
    return (
      <Layout showHF={true}>
        <div className="container mt-5 px-0">
          <div className="row">
            <div className="col-sm-8 mb-5">
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

const mapStateToProps = state => ({
  user: state.user,
  ui: state.ui,
  data: state.data
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getOrgListAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Organisation);

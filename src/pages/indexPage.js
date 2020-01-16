import React from "react";
import Layout from "../components/common/layout";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import * as ROUTES from "../utils/routes";
import SurveyTable from "../components/dashboard/projectTable";

const Dashboard = ({ user: { user, token } }) => {
  return (
    <Layout showHF={true}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-9 col-xs-12"></div>
          <div className="col-sm-3 col-xs-12 ">
            <Link
              className="btn btn-dark btn-lg float-right mt-4 mr-4"
              to={ROUTES.CREATENEWPROJECT}
            >
              Create new Project
            </Link>
          </div>
          <div className="col-sm-12 col-xs-12">
            <SurveyTable surveys={[]} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  ui: state.ui
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

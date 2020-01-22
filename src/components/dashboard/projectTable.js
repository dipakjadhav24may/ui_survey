import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as ROUTES from "../../utils/routes";

const SurveyTable = ({ surveys, data: { organisations }, history }) => {
  return (
    <table className="table table-striped border-bottom border-right border-left">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Survey Name</th>
          <th scope="col">Organisation Name</th>
        </tr>
      </thead>
      <tbody>
        {surveys &&
          surveys.map((survey, index) => {
            let organisation = organisations.filter(org => {
              return org.orgId === survey.orgId;
            })[0];
            // console.log("TCL: organisation", organisation);
            return (
              <tr
                key={survey.surveyId}
                onClick={() => {
                  history.push(`${ROUTES.EDITPROJECT}/${survey.surveyId}`);
                }}
              >
                <th scope="row">{index + 1}</th>
                <td>{survey.surveyName}</td>
                <td>{organisation && organisation.orgName}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  ui: state.ui,
  data: state.data
});

export default connect(mapStateToProps)(withRouter(SurveyTable));

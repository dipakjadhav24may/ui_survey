import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import * as ROUTES from "../../utils/routes";

const SurveyTable = ({ surveys, history }) => {
  return (
    <table className="table table-striped border-bottom border-right border-left">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Survey Name</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {surveys &&
          surveys.map((survey, index) => {
            return (
              <tr key={survey.surveyId}>
                <th scope="row">{index + 1}</th>
                <td>{survey.surveyName}</td>
                <td>
                  <Link to={`${ROUTES.EDITPROJECT}/${survey.surveyId}`}>
                    Edit
                  </Link>
                </td>
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

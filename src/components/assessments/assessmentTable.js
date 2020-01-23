/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-has-content */
import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const AssessmentTable = ({ assessments, data: { surveys } }) => {
  return (
    <Fragment>
      <table className="table table-striped border-bottom border-right border-left">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Asessment FirebaseID</th>
            <th scope="col">AsessmentID</th>
            <th scope="col">Survey Name</th>
            <th scope="col">Status</th>
            <th scope="col">Link</th>
          </tr>
        </thead>
        <tbody>
          {assessments &&
            assessments.map((assessment, index) => {
              let surveyData = surveys.filter(survey => {
                return survey.surveyId === Number(assessment.surveyId);
              });
              let survey = {};
              if (surveyData.length) {
                survey = surveyData[0];
              }
              return (
                <tr key={assessment.assessmentId}>
                  <th scope="row">{index + 1}</th>
                  <td>{assessment.firebaseAssessmentId}</td>
                  <td>{assessment.assessmentId}</td>
                  <td>{survey && survey.surveyName}</td>
                  <td>{assessment.status}</td>
                  <td>
                    <a href={assessment.url} target="_blank">
                      {assessment.url}
                    </a>{" "}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  ui: state.ui,
  data: state.data
});

export default connect(mapStateToProps)(withRouter(AssessmentTable));

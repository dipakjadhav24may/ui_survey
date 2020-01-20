import React from "react";
import { connect } from "react-redux";

const SurveyTable = ({ surveys, data: { organisations } }) => {
  console.log("TCL: organisations", organisations);

  return (
    <table className="table table-striped border-bottom border-right border-left">
      <tbody>
        {surveys &&
          surveys.map((survey, index) => {
            return (
              <tr key={survey.surveyId}>
                <th scope="row">{index + 1}</th>
                <td>{survey.surveyName}</td>
                <td>Organisation</td>
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

export default connect(mapStateToProps)(SurveyTable);

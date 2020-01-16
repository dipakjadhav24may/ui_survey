import React from "react";

const SurveyTable = ({ surveys }) => {
  return (
    <table className="table table-striped border-bottom border-right border-left">
      <tbody>
        {surveys &&
          surveys.map((survey, index) => {
            return (
              <tr key={survey.surveyId}>
                <th scope="row">{index + 1}</th>
                <td>Survey Name</td>
                <td>Organisation</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default SurveyTable;

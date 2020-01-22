import React, { Component } from "react";
import SurveyCreator from "../components/surveyeditor/SurveyCreator";
import Layout from "../components/common/layout";
export class EditProject extends Component {
  render() {
    return (
      <Layout showHF={true}>
        <SurveyCreator />
      </Layout>
    );
  }
}

export default EditProject;

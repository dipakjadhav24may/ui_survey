import React, { Component } from "react";
import SurveyCreator from "../components/surveybuilder/SurveyCreator";
import Layout from "../components/common/layout";
export class CreateNewProject extends Component {
  render() {
    return (
      <Layout showHF={true}>
        <SurveyCreator />
      </Layout>
    );
  }
}

export default CreateNewProject;

import React, { Component } from "react";
import SurveyCreator from "../components/createNewProject/SurveyCreator";
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

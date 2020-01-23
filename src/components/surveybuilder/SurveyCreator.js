import React, { Component } from "react";
import {
  saveSurveyDataToStoreAction,
  createSurveyAction
} from "../../redux/actions/dataActions";
import { withRouter } from "react-router-dom";
import { createSurvey } from "../../firebase";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as SurveyJSCreator from "survey-creator";
import * as SurveyKo from "survey-knockout";
import "survey-creator/survey-creator.css";

import "jquery-ui/themes/base/all.css";
import "nouislider/distribute/nouislider.css";
import "select2/dist/css/select2.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css";

import "jquery-bar-rating/dist/themes/css-stars.css";
import "jquery-bar-rating/dist/themes/fontawesome-stars.css";

import $ from "jquery";
import "jquery-ui/ui/widgets/datepicker.js";
import "select2/dist/js/select2.js";
import "jquery-bar-rating";

//import "icheck/skins/square/blue.css";
import "pretty-checkbox/dist/pretty-checkbox.css";

import * as widgets from "surveyjs-widgets";
import "./surveycreator.css";

SurveyJSCreator.StylesManager.applyTheme("default");

//widgets.icheck(SurveyKo, $);
widgets.prettycheckbox(SurveyKo);
widgets.select2(SurveyKo, $);
widgets.inputmask(SurveyKo);
widgets.jquerybarrating(SurveyKo, $);
widgets.jqueryuidatepicker(SurveyKo, $);
widgets.nouislider(SurveyKo);
widgets.select2tagbox(SurveyKo, $);
widgets.signaturepad(SurveyKo);
widgets.sortablejs(SurveyKo);
widgets.ckeditor(SurveyKo);
widgets.autocomplete(SurveyKo, $);
widgets.bootstrapslider(SurveyKo);

class SurveyCreator extends Component {
  state = {
    surveyName: "",
    showProgressBar: "top"
  };
  surveyCreator;

  componentDidMount() {
    let options = {
      generateValidJSON: true,
      isAutoSave: true,
      showState: true,
      showLogicTab: true,
      showEmbededSurveyTab: true
    };
    this.surveyCreator = new SurveyJSCreator.SurveyCreator(
      "surveyCreatorContainer",
      options
    );

    const {
      data: {
        surveyData: { surveyText, surveyName }
      }
    } = this.props;

    if (surveyText || surveyName) {
      this.setState({
        surveyName
      });

      this.surveyCreator.text = surveyText;
    }
    this.surveyCreator.saveSurveyFunc = this.saveMySurvey;
  }

  handleOnChange = event => {
    this.setState(
      {
        [event.target.name]: event.target.value
      },
      () => {
        const { surveyName } = this.state;
        this.props.saveSurveyDataToStoreAction({
          surveyName
        });
      }
    );
  };

  saveSurveyToDB = event => {
    const { surveyName } = this.state;
    const {
      user: {
        user: { userId },
        token
      },
      history
    } = this.props;

    let surveyData = JSON.parse(this.surveyCreator.text);
    surveyData.title = surveyName;

    createSurvey(surveyData).then(surveyId => {
      let SurveyObj = {
        active: true,
        firebaseSurveyId: surveyId,
        surveyName,
        createdByUser: userId
      };
      this.props.createSurveyAction(SurveyObj, token, history);
    });
  };

  render() {
    const { surveyName } = this.state;

    let isInvalid =
      surveyName === "" ||
      (this.surveyCreator.text && this.surveyCreator.text === "");

    return (
      <div className="mainContainer container-fluid">
        <div className="row  ">
          <div className="col-sm-6">
            <div className="form-group mt-4">
              <input
                value={surveyName}
                className="form-control"
                name="surveyName"
                placeholder="Survey Name"
                type="text"
                onChange={this.handleOnChange}
              />
            </div>
          </div>
          <div className="col-sm-6 mt-2 my-4">
            <div className="btn-group ml-4 float-right">
              <button
                type="button"
                className="btn btn-primary px-5"
                disabled={isInvalid}
                onClick={this.saveSurveyToDB}
              >
                Save
              </button>
            </div>
          </div>
          <div id="surveyCreatorContainer" className="col-sm-12" />
        </div>
      </div>
    );
  }

  saveMySurvey = () => {
    const { surveyName } = this.state;

    this.props.saveSurveyDataToStoreAction({
      surveyName,
      surveyText: this.surveyCreator.text
    });
  };
}

const mapStateToProps = state => ({
  user: state.user,
  ui: state.ui,
  data: state.data
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      saveSurveyDataToStoreAction,
      createSurveyAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SurveyCreator));

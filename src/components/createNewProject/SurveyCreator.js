import React, { Component } from "react";
import {
  getOrgListAction,
  getSingleOrgAction,
  getOrgGroupsAction,
  saveSurveyDataToStoreAction,
  createSurveyAction
} from "../../redux/actions/dataActions";
import { withRouter } from "react-router-dom";
import { createSurvey } from "../../firebase";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
    showProgressBar: "top",
    organisations: [],
    groups: [],
    selectedOrganisation: {},
    selectedGroup: {}
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
      user: {
        user: { userId },
        token
      },
      data: {
        surveyData: {
          selectedOrganisation,
          selectedGroup,
          surveyText,
          surveyName
        }
      }
    } = this.props;

    if (
      surveyText ||
      surveyName ||
      (selectedGroup && Object.values(selectedGroup).length) ||
      (selectedOrganisation && Object.values(selectedOrganisation).length)
    ) {
      this.setState({
        selectedOrganisation,
        selectedGroup,
        surveyName
      });
      this.surveyCreator.text = surveyText;
    }
    this.surveyCreator.saveSurveyFunc = this.saveMySurvey;
    this.props.getOrgListAction(userId, token);
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.data !== this.props.data) {
      this.setState({
        organisations: nextProps.data.organisations,
        groups: nextProps.data.organisation.groups
      });
    }
  }

  handleOrgChange = organisation => {
    this.setState({ selectedOrganisation: organisation }, () => {
      this.props.saveSurveyDataToStoreAction({
        selectedOrganisation: organisation
      });
    });
    const {
      user: { token }
    } = this.props;
    this.props.getSingleOrgAction(organisation.orgId, token);
  };

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

  handleGroupChange = group => {
    this.setState({ selectedGroup: group }, () => {
      this.props.saveSurveyDataToStoreAction({
        selectedGroup: group
      });
    });
  };

  saveSurveyToDB = event => {
    const { surveyName, selectedOrganisation, selectedGroup } = this.state;
    const {
      user: { token },
      history
    } = this.props;

    this.props.saveSurveyDataToStoreAction({});

    let surveyData = JSON.parse(this.surveyCreator.text);
    surveyData.title = surveyName;
    surveyData.organisation_id = selectedOrganisation.orgId;
    surveyData.group_id = selectedGroup.groupId;

    createSurvey(surveyData).then(surveyId => {
      let SurveyObj = {
        active: true,
        firebaseSurveyId: surveyId,
        groupId: selectedGroup.groupId,
        orgId: selectedOrganisation.orgId,
        surveyName
      };
      this.props.createSurveyAction(SurveyObj, token, history);
    });
  };

  render() {
    const {
      organisations,
      groups,
      selectedGroup,
      selectedOrganisation,
      surveyName
    } = this.state;

    let isInvalid =
      !selectedGroup ||
      !selectedOrganisation ||
      (selectedGroup && Object.values(selectedGroup).length === 0) ||
      (selectedOrganisation &&
        Object.values(selectedOrganisation).length === 0) ||
      surveyName === "" ||
      (this.surveyCreator.text && this.surveyCreator.text === "");

    return (
      <div className="mainContainer container-fluid">
        <div className="row  ">
          <div className="col-sm-12">
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
          <div className="col-sm-6 mt-2 mb-4">
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-secondary dropdown-toggle dropdown-button"
                data-toggle="dropdown"
                data-display="static"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {selectedOrganisation && selectedOrganisation.orgId
                  ? selectedOrganisation.orgName
                  : "Organisations"}
              </button>
              <div className="dropdown-menu">
                {organisations.length ? (
                  organisations.map(organisation => (
                    <button
                      className="dropdown-item"
                      type="button"
                      onClick={this.handleOrgChange.bind(this, organisation)}
                      key={organisation.orgId}
                    >
                      {organisation.orgName}
                    </button>
                  ))
                ) : (
                  <Link
                    className="dropdown-item"
                    type="button"
                    to={"/app/organisations"}
                  >
                    Create organisation
                  </Link>
                )}
              </div>
            </div>
            <div className="btn-group ml-4">
              <button
                type="button"
                className="btn btn-secondary dropdown-toggle dropdown-button"
                data-toggle="dropdown"
                data-display="static"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {selectedGroup && selectedGroup.groupId
                  ? selectedGroup.groupName
                  : "Groups"}
              </button>
              <div className="dropdown-menu">
                {selectedOrganisation && selectedOrganisation.orgId ? (
                  groups.length ? (
                    groups.map(group => (
                      <button
                        className="dropdown-item"
                        type="button"
                        onClick={this.handleGroupChange.bind(this, group)}
                        key={group.groupId}
                      >
                        {group.groupName}
                      </button>
                    ))
                  ) : (
                    <Link
                      className="dropdown-item"
                      type="button"
                      to={`/app/organisations/${selectedOrganisation.orgId}`}
                    >
                      Create Group
                    </Link>
                  )
                ) : (
                  <button className="dropdown-item" type="button">
                    Select organisation first
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="col-sm-6 mt-2 mb-4">
            <div className="btn-group ml-4 float-right">
              <button
                type="button"
                className="btn btn-secondary"
                disabled={isInvalid}
                onClick={this.saveSurveyToDB}
              >
                Save Survey
              </button>
            </div>
          </div>
          <div id="surveyCreatorContainer" className="col-sm-12" />
        </div>
      </div>
    );
  }

  saveMySurvey = () => {
    const { surveyName, selectedOrganisation, selectedGroup } = this.state;

    this.props.saveSurveyDataToStoreAction({
      surveyName,
      selectedOrganisation,
      selectedGroup,
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
      getOrgListAction,
      getSingleOrgAction,
      getOrgGroupsAction,
      saveSurveyDataToStoreAction,
      createSurveyAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SurveyCreator));

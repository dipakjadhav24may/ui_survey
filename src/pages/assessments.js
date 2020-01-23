import React, { Component } from "react";
import { getOrgUserAssessmentsAction } from "../redux/actions/dataActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import axios from "axios";
import Layout from "../components/common/layout";
import { BASE_URL } from "../utils/config";
import AssessmentTable from "../components/assessments/assessmentTable";

class Assessments extends Component {
  state = {
    assessments: [],
    user: {}
  };

  componentDidMount() {
    const {
      user: { token },
      match: {
        params: { userId }
      }
    } = this.props;

    axios.defaults.headers.common["Authorization"] = token;
    axios
      .get(`${BASE_URL}organization/users/${userId}`)
      .then(user_response => {
        this.setState({
          user: user_response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
    this.props.getOrgUserAssessmentsAction(userId, token);
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.data.organisation !== this.props.data.organisation) {
      this.setState({ assessments: nextProps.data.organisation.assessments });
    }
  }

  render() {
    const { user, assessments } = this.state;

    const { history } = this.props;

    return (
      <Layout showHF={true}>
        <div className="container mt-5 px-0">
          <div
            className="btn btn-secondary"
            onClick={() => {
              history.goBack();
            }}
          >
            Go Back
          </div>
          <div className="row">
            <div className="col-sm-12  mb-5">
              <h2 className="text-center mb-4">
                {user.firstName && user.firstName + "'s"} Assessments
              </h2>
              <AssessmentTable assessments={assessments} />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  ui: state.ui,
  data: state.data
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getOrgUserAssessmentsAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Assessments);

import React from "react";
import Layout from "../components/common/layout";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getSurveysAction } from "../redux/actions/dataActions";

const Profilepage = ({ user: { user, token } }) => {
  console.log("TCL: Profilepage -> user", user);
  return (
    <Layout showHF={true}>
      <div className="container">
        <div className="row">
          <div className="offset-sm-3 col-sm-6 mt-5">
            <ul className="list-group">
              <li className="list-group-item">
                <strong>Email </strong>
                <span className="float-right"> {user.email}</span>
              </li>
              <li className="list-group-item">
                <strong>Name </strong>
                <span className="float-right">
                  {" "}
                  {user.firstName} {user.lastName}
                </span>
              </li>
              <li className="list-group-item">
                <strong>Username </strong>
                <span className="float-right"> {user.userName}</span>
              </li>
              <li className="list-group-item">
                <strong>Mobile No. </strong>
                <span className="float-right"> {user.mobileNo}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  ui: state.ui,
  data: state.data
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getSurveysAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profilepage);

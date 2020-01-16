import React from "react";
import Layout from "../components/common/layout";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const Profile = ({ loggedInUser, userToken }) => {
  console.log("TCL: Profile -> loggedInUser", loggedInUser);
  return <Layout showHF={true}>Profile</Layout>;
};

const mapStateToProps = ({ appReducer }) => ({
  loggedInUser: appReducer.loggedInUser,
  userToken: appReducer.userToken
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

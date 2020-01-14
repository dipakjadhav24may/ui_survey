import React from "react";
import Layout from "../components/common/layout";
import { connect } from "react-redux";

const Dashboard = ({ loggedInUser, userToken }) => {
  console.log("TCL: Dashboard -> loggedInUser", loggedInUser);
  console.log("TCL: Dashboard -> userToken", userToken);

  return (
    <Layout showHF={true}>{loggedInUser ? loggedInUser.email : ""}</Layout>
  );
};

const mapStateToProps = ({ appReducer }) => ({
  loggedInUser: appReducer.loggedInUser,
  userToken: appReducer.userToken
});

export default connect(mapStateToProps, {})(Dashboard);

import React from "react";
import { Route, Switch } from "react-router-dom";

import Dashboard from "../pages/indexPage";
import Organisation from "../pages/organisation";
import User from "../pages/user";
import SingleOrganisation from "../pages/singleOrganisation";
import Profile from "../pages/profilePage";
import NotFound from "../pages/notFound";
import CreateNewProject from "../pages/createNewProject";

const App = ({ match, history }) => {
  return (
    <div>
      <Switch>
        <Route
          path={`${match.url}/dashboard`}
          render={props => <Dashboard {...props} />}
        />
        <Route
          path={`${match.url}/createnewproject`}
          render={props => <CreateNewProject {...props} />}
        />
        <Route
          path={`${match.url}/organisations/:id`}
          render={props => <SingleOrganisation {...props} />}
        />
        <Route
          path={`${match.url}/organisations`}
          render={props => <Organisation {...props} />}
        />
        <Route
          path={`${match.url}/profile`}
          render={props => <Profile {...props} />}
        />
        <Route
          path={`${match.url}/users/:orgId/:groupId`}
          render={props => <User {...props} />}
        />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;

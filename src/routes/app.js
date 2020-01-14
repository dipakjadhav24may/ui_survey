import React from "react";
import { Route, Switch } from "react-router-dom";

import Dashboard from "../pages/indexPage";
import NotFound from "../pages/notFound";
import Organisation from "../pages/organisation";
import SingleOrganisation from "../pages/singleOrganisation";

const App = ({ match, history }) => {
  return (
    <div>
      <Switch>
        <Route
          path={`${match.url}/dashboard`}
          render={props => <Dashboard {...props} />}
        />
        <Route
          path={`${match.url}/organisations/:id`}
          render={props => <SingleOrganisation {...props} />}
        />
        <Route
          path={`${match.url}/organisations`}
          render={props => <Organisation {...props} />}
        />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;

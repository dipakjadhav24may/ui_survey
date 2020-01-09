import React from "react";
import { Route, Switch } from "react-router-dom";

import Dashboard from "../pages/indexPage";
import NotFound from "../pages/notFound";

const App = ({ match, history }) => {
  return (
    <div>
      <Switch>
        <Route
          path={`${match.url}/dashboard`}
          render={props => <Dashboard {...props} />}
        />

        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;

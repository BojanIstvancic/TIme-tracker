import {
  Redirect,
  Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";

import SettingsPage from "./containers/SettingsPage";
import SignInPage from "./containers/SignInPage";
import SignUpPage from "./containers/SignUpPage";
import TrackerPage from "./containers/TrackerPage";

const PublicRoutes = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/tracker" />} />
          <Route exact path="/tracker/sign-in" component={SignInPage} />
          <Route exact path="/tracker/sign-up" component={SignUpPage} />
          <Route exact path="/tracker/settings" component={SettingsPage} />
          <Route exact path="/tracker" component={TrackerPage} />
        </Switch>
      </Router>
    </>
  );
};

export default PublicRoutes;

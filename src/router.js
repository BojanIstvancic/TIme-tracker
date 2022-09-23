import {
  Redirect,
  Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import error404 from "./components/errors/404";

import SignInPage from "./containers/SignInPage";
import SignUpPage from "./containers/SignUpPage";
import Tracker from "./containers/Tracker/Tracker";

const PublicRoutes = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/tracker" />} />
          <Route exact path="/tracker/sign-in" component={SignInPage} />
          <Route exact path="/tracker/sign-up" component={SignUpPage} />
          <Route exact path="/tracker(|/settings)" component={Tracker} />
          <Route component={error404} />
        </Switch>
      </Router>
    </>
  );
};

export default PublicRoutes;

import { useSelector } from "react-redux";
import {
  Redirect,
  Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import error404 from "./components/errors/404";
import SignIn from "./components/signIn/SignIn";
import SignUp from "./components/signUp/SignUp";

import Tracker from "./containers/Tracker";
import links from "./helpers/links";

const ProtectedRoute = ({
  component: Component,
  isLogedIn = false,
  ...rest
}) => {
  if (isLogedIn) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  } else {
    return (
      <Route {...rest} render={() => <Redirect to={links.signIn.pattern} />} />
    );
  }
};

const AuthRoute = ({ component: Component, isLogedIn = false, ...rest }) => {
  if (!isLogedIn) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  } else {
    return (
      <Route {...rest} render={() => <Redirect to={links.tracker.pattern} />} />
    );
  }
};

const PublicRoutes = () => {
  const { isLogedIn } = useSelector((state) => state.authentication);
  return (
    <>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Redirect to={links.signIn.pattern} />}
          />
          <AuthRoute
            exact
            path={links.signIn.pattern}
            component={SignIn}
            isLogedIn={isLogedIn}
          />
          <AuthRoute
            exact
            path={links.signUp.pattern}
            component={SignUp}
            isLogedIn={isLogedIn}
          />
          <ProtectedRoute
            exact
            path="/tracker(|/settings)"
            component={Tracker}
            isLogedIn={isLogedIn}
          />
          <Route component={error404} />
        </Switch>
      </Router>
    </>
  );
};

export default PublicRoutes;

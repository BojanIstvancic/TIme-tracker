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

import Tracker from "./containers/Tracker/Tracker";

const ProtectedRoute = ({
  component: Component,
  isLogedIn = false,
  ...rest
}) => {
  if (isLogedIn) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  } else {
    return <Route {...rest} render={() => <Redirect to="/sign-in" />} />;
  }
};

const AuthRoute = ({ component: Component, isLogedIn = false, ...rest }) => {
  if (!isLogedIn) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  } else {
    return <Route {...rest} render={() => <Redirect to="/tracker" />} />;
  }
};

const PublicRoutes = () => {
  const { isLogedIn } = useSelector((state) => state.authentication);
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/sign-in" />} />
          <AuthRoute
            exact
            path="/sign-in"
            component={SignIn}
            isLogedIn={isLogedIn}
          />
          <AuthRoute
            exact
            path="/sign-up"
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

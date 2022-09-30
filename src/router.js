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

const PublicRoutes = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/sign-in" />} />
          <Route exact path="/sign-in" component={SignIn} />
          <Route exact path="/sign-up" component={SignUp} />
          <ProtectedRoute
            exact
            path="/tracker(|/settings)"
            component={Tracker}
          />
          <Route component={error404} />
        </Switch>
      </Router>
    </>
  );
};

export default PublicRoutes;

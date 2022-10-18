import { withRouter, Switch, Route } from "react-router-dom";
import SettingsPage from "../SettingsPage";
import TrackerPage from "../TrackerPage";

export interface TrackerRouterProps {}

const TrackerRouter: React.FC<TrackerRouterProps> = () => {
  return (
    <Switch>
      <Route exact path="/tracker" component={TrackerPage} />
      <Route exact path="/tracker/settings" component={SettingsPage} />
    </Switch>
  );
};

export default withRouter(TrackerRouter);

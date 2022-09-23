import { withRouter, Switch, Route } from "react-router-dom";
import SettingsPage from "../SettingsPage";
import TrackerPage from "../TrackerPage";

export interface TrackerProps {}

const Tracker: React.FC<TrackerProps> = () => {
  return (
    <Switch>
      <Route exact path="/tracker" component={TrackerPage} />
      <Route exact path="/tracker/settings" component={SettingsPage} />
    </Switch>
  );
};

export default withRouter(Tracker);

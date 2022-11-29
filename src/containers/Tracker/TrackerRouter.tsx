import { Switch, Route } from "react-router-dom";
import SettingsPage from "../SettingsPage";
import TrackerPage from "../TrackerPage";

const TrackerRouter: React.FC<{}> = () => {
  return (
    <Switch>
      <Route exact path="/tracker" component={TrackerPage} />
      <Route exact path="/tracker/settings" component={SettingsPage} />
    </Switch>
  );
};

export default TrackerRouter;

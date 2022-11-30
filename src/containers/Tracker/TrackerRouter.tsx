import { Switch, Route } from "react-router-dom";
import TrackerPage from "../TrackerPage";
import SettingsPage from "../SettingsPage";

const TrackerRouter: React.FC<{}> = () => {
  return (
    <Switch>
      <Route exact path="/tracker" component={TrackerPage} />
      <Route exact path="/tracker/settings" component={SettingsPage} />
    </Switch>
  );
};

export default TrackerRouter;

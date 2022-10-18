import { Drawer, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import AccessTimeFilledSharpIcon from "@mui/icons-material/AccessTimeFilledSharp";
import { withRouter } from "react-router";
import links from "../../helpers/links";
import { RouteComponentProps } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";

interface SideBarProps extends RouteComponentProps {}

const SideBar: React.FunctionComponent<SideBarProps> = ({ history }) => {
  const currentRoute = history.location.pathname;
  return (
    <Drawer variant="permanent" anchor="left" sx={{ width: "200px" }}>
      <ListItem
        onClick={() => {
          history.push(links.tracker.pattern);
        }}
        button
        selected={currentRoute === links.tracker.pattern}
        sx={{ width: "200px" }}
      >
        <ListItemIcon>
          <AccessTimeFilledSharpIcon />
        </ListItemIcon>
        <ListItemText>Timer</ListItemText>
      </ListItem>
      <ListItem
        onClick={() => {
          history.push(links.settings.pattern);
        }}
        button
        selected={currentRoute === links.settings.pattern}
        sx={{ width: "200px" }}
      >
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText>Settings</ListItemText>
      </ListItem>
    </Drawer>
  );
};

export default withRouter(SideBar);

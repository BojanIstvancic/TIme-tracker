import {
  Box,
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AccessTimeFilledSharpIcon from "@mui/icons-material/AccessTimeFilledSharp";
import { withRouter } from "react-router";
import links from "../../helpers/links";
import { RouteComponentProps } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppSharpIcon from "@mui/icons-material/ExitToAppSharp";
import logo from "../../assets/images/logo.png";
import { signOut } from "../../redux/authenticationSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

interface SideBarProps extends RouteComponentProps {}

const SideBar: React.FunctionComponent<SideBarProps> = ({ history }) => {
  const dispatch = useDispatch<AppDispatch>();
  const currentRoute = history.location.pathname;

  const handleSignOut = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    dispatch(signOut());
  };

  return (
    <Drawer variant="permanent" anchor="left" sx={{ width: "200px" }}>
      <ListItem sx={{ padding: "0" }}>
        <img src={logo} alt="logo" style={{ width: "100%" }} />
      </ListItem>
      <Box sx={{ height: "100%" }}>
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
      </Box>
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
      <ListItem onClick={handleSignOut} button sx={{ width: "200px" }}>
        <ListItemIcon>
          <ExitToAppSharpIcon />
        </ListItemIcon>
        <ListItemText>Sign Out</ListItemText>
      </ListItem>
    </Drawer>
  );
};

export default withRouter(SideBar);

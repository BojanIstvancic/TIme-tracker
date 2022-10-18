import { Drawer } from "@mui/material";
import { Box } from "@mui/system";
import TrackerRouter from "./TrackerRouter";

export interface TrackerProps {}

const Tracker: React.FC<TrackerProps> = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Drawer variant="permanent" anchor="left">
        <li>list item</li>
        <li>list item2</li>
      </Drawer>
      <Box>
        <TrackerRouter />
      </Box>
    </Box>
  );
};

export default Tracker;

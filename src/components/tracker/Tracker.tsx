import { Box } from "@mui/system";
import { IconButton, TextField, Typography } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import { useEffect, useState } from "react";
import StopWatch from "../stopWatch/StopWatch";

export interface TrackerProps {}

const Tracker: React.FC<TrackerProps> = () => {
  return (
    <>
      <StopWatch />
    </>
  );
};

export default Tracker;

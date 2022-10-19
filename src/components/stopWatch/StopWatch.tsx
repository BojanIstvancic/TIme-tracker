import { Box } from "@mui/system";
import { IconButton, TextField, Typography } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import { useEffect, useState } from "react";

export interface StopWatchProps {}

export interface Item {
  id: number;
  title: string;
  userId: number;
  totalTime: string | null;
}

const StopWatch: React.FC<StopWatchProps> = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [item, setItem] = useState<Item>({
    id: 1,
    title: "Add title here",
    userId: 1,
    totalTime: null,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItem({ ...item, [event.target.name]: event.target.value });
  };
  useEffect(() => {
    let interval: any;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  return (
    <Box
      sx={{
        display: "flex",
        pt: 4.6,
        pl: 4.6,
        pr: 4.6,
        borderBottom: "1px solid #e0e0e0",
        alignItems: "center",
      }}
    >
      <TextField
        id="standard-basic"
        label={
          item.title === ""
            ? "This field is required"
            : "What are you working on?"
        }
        name="title"
        variant="standard"
        fullWidth
        InputProps={{
          disableUnderline: true,
        }}
        value={item.title}
        error={item.title === ""}
        onChange={handleChange}
      />
      <Box sx={{ mr: 3, ml: 3 }}>
        <Typography variant="body1" component={"span"}>
          {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
        </Typography>
        <Typography variant="body1" component={"span"}>
          {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
        </Typography>
      </Box>
      {running ? (
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => setRunning(false)}
        >
          <StopCircleIcon fontSize="large" />
        </IconButton>
      ) : (
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => setRunning(true)}
        >
          <PlayCircleIcon fontSize="large" />
        </IconButton>
      )}
    </Box>
  );
};

export default StopWatch;

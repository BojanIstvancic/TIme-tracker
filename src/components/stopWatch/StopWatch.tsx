import { Box } from "@mui/system";
import { IconButton, TextField, Typography } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { addTrackedDataItem } from "../../redux/trackedDataSlice";

export interface StopWatchProps {}

export interface Item {
  title: string;
  userId: string;
}

const StopWatch: React.FC<StopWatchProps> = () => {
  const { user } = useSelector((state: RootState) => state.authentication);
  const dispatch = useDispatch<AppDispatch>();
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [item, setItem] = useState<Item>({
    title: "Add title here",
    userId: user.id,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItem({ ...item, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  const saveData = () => {
    dispatch(
      addTrackedDataItem({
        title: item.title,
        userId: item.userId,
        time,
      })
    );
    setTime(0);
  };
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
          onClick={() => {
            setRunning(false);
            saveData();
          }}
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

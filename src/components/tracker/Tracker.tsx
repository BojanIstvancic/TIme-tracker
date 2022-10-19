import { Box } from "@mui/system";
import { IconButton, TextField } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import { useState } from "react";

export interface TrackerProps {}

export interface Item {
  id: number;
  title: string;
  userId: number;
  totalTime: string | null;
}

const Tracker: React.FC<TrackerProps> = () => {
  const [item, setItem] = useState<Item>({
    id: 1,
    title: "Add title here",
    userId: 1,
    totalTime: null,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItem({ ...item, [event.target.name]: event.target.value });
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          pt: 4.6,
          pl: 4.6,
          pr: 4.6,
          borderBottom: "1px solid #e0e0e0",
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
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          // onClick={deleteItem}
        >
          <PlayCircleIcon fontSize="large" />
        </IconButton>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          // onClick={deleteItem}
        >
          <StopCircleIcon fontSize="large" />
        </IconButton>
      </Box>
    </>
  );
};

export default Tracker;

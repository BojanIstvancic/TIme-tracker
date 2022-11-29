import { Box, Typography, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import Button from "@mui/material/Button";
import {
  getUserFromDatabase,
  updateProfileInDatabase,
} from "../../redux/userSlice";
import { useEffect } from "react";

interface ProfileData {
  id: string;
  name: string;
  surname: string;
}

const Settings: React.FC<{}> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const [profileData, setProfileData] = useState<ProfileData>({
    id: user.id,
    name: user.name,
    surname: user.surname,
  });

  useEffect(() => {
    if (user.id) {
      dispatch(getUserFromDatabase({ id: user.id }));
    }
  }, [user.id, dispatch]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({ ...profileData, [event.target.name]: event.target.value });
  };

  const handleUpdateProfile = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(updateProfileInDatabase(profileData));
  };

  return (
    <>
      <Box
        sx={{
          height: "97px",
          display: "flex",
          alignItems: "center",
          pl: 4.6,
          pr: 4.6,
          borderBottom: "3px solid var(--light-gray)",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{ color: "var(--darker-blue)" }}
        >
          Settings
        </Typography>
      </Box>
      <Box
        sx={{
          p: 4.6,
        }}
      >
        <TextField
          id="outlined-multiline-flexible-1"
          label="First Name"
          name="name"
          fullWidth
          value={profileData.name}
          onChange={handleChange}
          sx={{ mb: 5 }}
        />
        <TextField
          id="outlined-multiline-flexible-1"
          label="Last Name"
          name="surname"
          fullWidth
          value={profileData.surname}
          onChange={handleChange}
          sx={{ mb: 5 }}
        />

        <Button variant="contained" onClick={handleUpdateProfile}>
          Update Profile
        </Button>
      </Box>
    </>
  );
};

export default Settings;

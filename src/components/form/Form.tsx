import { Container, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { History } from "history";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export interface FormProps {
  history: History;
}

export interface User {
  email: string;
  password: string;
}

const Form: React.FC<FormProps> = ({ history }) => {
  const [user, setUser] = useState<User>({
    email: "Add email address",
    password: "Add password",
  });

  const auth = useContext(AuthContext);
  const { signUp, signIn } = auth;

  const handleSignUp = (e: any) => {
    e.preventDefault();
    signUp(user.email, user.password);
  };

  const handleSignIn = (e: any) => {
    e.preventDefault();
    signIn(user.email, user.password);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const { pathname } = history.location;
  return (
    <Container>
      <Box
        sx={{ width: 1, maxWidth: "500px", margin: "0 auto" }}
        component="form"
      >
        <Box sx={{ mb: 5 }}>
          <TextField
            id="outlined-multiline-flexible"
            label="Email"
            name="email"
            fullWidth
            value={user.email}
            error={user.email === ""}
            helperText={
              user.email === ""
                ? "This field is required"
                : "Please enter a email"
            }
            onChange={handleChange}
          />
        </Box>
        <Box sx={{ mb: 5 }}>
          <TextField
            id="outlined-multiline-flexible"
            label="Password"
            name="password"
            type={"password"}
            fullWidth
            value={user.password}
            error={user.password === ""}
            helperText={
              user.password === ""
                ? "This field is required"
                : "Please enter a password"
            }
            onChange={handleChange}
          />
        </Box>
        {pathname === "/sign-up" ? (
          <Button
            variant="contained"
            onClick={handleSignUp}
            disabled={user.email === "" || user.password === ""}
            fullWidth
          >
            Sign Up
          </Button>
        ) : (
          <Box>
            <Button
              variant="contained"
              onClick={handleSignIn}
              disabled={user.email === "" || user.password === ""}
              fullWidth
              sx={{ mb: 2 }}
            >
              Sign In
            </Button>
            <Typography variant="body1" component="span" sx={{ mr: 1 }}>
              Need an account?
            </Typography>
            <Link to="/sign-up">Sign Up</Link>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Form;

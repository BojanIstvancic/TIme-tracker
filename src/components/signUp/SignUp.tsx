import { RouteComponentProps } from "react-router";
import { SignUpStyledWrapper } from "./signup.style";
import Form from "../form/Form";
import { blue } from "@mui/material/colors";
import { Typography } from "@mui/material";

const SignUp: React.FC<RouteComponentProps> = ({ history }) => {
  return (
    <SignUpStyledWrapper>
      <Typography
        variant="h4"
        component="div"
        sx={{ mt: 5, mb: 5, color: blue[900] }}
      >
        Sign Up
      </Typography>
      <Form history={history} />
    </SignUpStyledWrapper>
  );
};

export default SignUp;

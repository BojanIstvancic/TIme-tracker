import { blue } from "@mui/material/colors";
import { RouteComponentProps } from "react-router-dom";
import Form from "../form/Form";
import { SignInStyledWrapper } from "./signIn.style";
import { Typography } from "@mui/material";

const SignIn: React.FC<RouteComponentProps> = ({ history }) => {
  return (
    <SignInStyledWrapper>
      <Typography
        variant="h4"
        component="div"
        sx={{ mt: 5, mb: 5, color: blue[900] }}
      >
        Sign In
      </Typography>
      <Form history={history} />
    </SignInStyledWrapper>
  );
};

export default SignIn;

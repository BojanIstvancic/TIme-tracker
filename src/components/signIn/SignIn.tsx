import { useContext, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { SignInStyledWrapper } from "./signIn.style";

const SignIn: React.FC<RouteComponentProps> = () => {
  const [email, setEmail] = useState("emai@email.com");
  const [password, setPassword] = useState("123");

  const auth = useContext(AuthContext);
  const { signIn } = auth;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    signIn(email, password);
  };

  return (
    <SignInStyledWrapper>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <p>Email:</p>
          <input
            type="email"
            name="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <p>Password:</p>
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <input type="submit" value="Sign In" className="submit" />
        </div>
        <div>
          <p>Need an account?</p> <Link to="/sign-up">Sign Up</Link>
        </div>
      </form>
    </SignInStyledWrapper>
  );
};

export default SignIn;

import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { SignUpStyledWrapper } from "./signup.style";

export interface SignUpProps {}

const SignUp: React.FC<SignUpProps> = () => {
  const [email, setEmail] = useState("emai@email.com");
  const [password, setPassword] = useState("123");

  const auth = useContext(AuthContext);
  const { signUp } = auth;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    signUp(email, password);
  };

  return (
    <SignUpStyledWrapper>
      <h1>Sign Up</h1>
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
          <input type="submit" value="Sign Up" className="submit" />
        </div>
      </form>
    </SignUpStyledWrapper>
  );
};

export default SignUp;

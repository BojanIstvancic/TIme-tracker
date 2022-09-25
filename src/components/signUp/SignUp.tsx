import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

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
    <>
      <form onSubmit={handleSubmit}>
        <br />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input type="submit" value="Sign Up" />
      </form>
    </>
  );
};

export default SignUp;

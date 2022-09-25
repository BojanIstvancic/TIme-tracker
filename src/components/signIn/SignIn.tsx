import { useState } from "react";

export interface SignInProps {}

const SignIn: React.FC<SignInProps> = () => {
  const [email, setEmail] = useState("emai@email.com");
  const [password, setPassword] = useState("123");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
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

export default SignIn;

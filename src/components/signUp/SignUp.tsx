import { useState } from "react";

export interface SignUpProps {}

const SignUp: React.FC<SignUpProps> = () => {
  const [firstName, setFirstName] = useState("First Name");
  const [lastName, setLastName] = useState("Last Name");
  const [email, setEmail] = useState("emai@email.com");
  const [password, setPassword] = useState("123");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(firstName);
    console.log(lastName);
    console.log(email);
    console.log(password);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>First name:</label>
        <input
          type="text"
          name="firstName"
          value={firstName}
          required
          onChange={(e) => setFirstName(e.target.value)}
        />
        <br />
        <label>Last name:</label>
        <input
          type="text"
          name="lastName"
          value={lastName}
          required
          onChange={(e) => setLastName(e.target.value)}
        />
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

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("user@gmail.com");
  const [password, setPassword] = useState("1234");
  const { user, login, isAthenticated } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) login(email, password);
  };
  console.log(user);
  useEffect(() => {
    if (isAthenticated) navigate("/hotels", { replace: true });
  }, [isAthenticated, navigate]);
  return (
    <div className="loginContainer">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="formControl">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            value={email}
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="formControl">
          <label htmlFor="password">password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            id="password"
            type="text"
          />
        </div>
        <div className="buttons">
          <button className="btn btn--primary"> Login </button>
        </div>
      </form>
    </div>
  );
}

export default Login;

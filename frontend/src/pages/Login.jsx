import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post("/auth/login", form);

    console.log("FULL RESPONSE:", res);
    console.log("RESPONSE DATA:", res.data);

    localStorage.setItem("token", res.data.token); // TEMP direct read

    alert("Login Successful");
    navigate("/dashboard");

  } catch (err) {
    console.log("ERROR OBJECT:", err);
    console.log("ERROR RESPONSE:", err.response?.data);
    alert("Login failed");
  }
};

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
}

export default Login;
// components/LoginForm.jsx
import { useState } from "react";
import { usersApi } from "../api/users.js";

export default function RegisterForm() {
  const [username, setUsername] = useState("gregorybastianelli");
  const [email, setEmail] = useState("admin@idle.fm");
  const [password, setPassword] = useState("password");
  const [confirmPassword, setConfirmPassword] = useState("password");

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const user = await usersApi.create({ username, email, password });
      alert("Registration successful!");
      // Optionally redirect or update state here
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
        />
      </div>
      <div>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
      </div>
      <div>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="confirm password"
        />
      </div>

      <button>Login</button>
    </form>
  );
}

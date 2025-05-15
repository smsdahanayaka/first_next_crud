"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { loginUser } from "../../lib/api";

function Page() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUser(form);
    if (res.access_token) {
      localStorage.setItem("token", res.access_token);
      alert("Logged in!");
    } else {
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        placeholder="User name"
        type="text"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        name="password"
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default page;

"use client";
import { useState } from "react";
import { registerUser } from "../../lib/api";

function Page() {
  const [form, setForm] = useState({
    username: "",
    fname: "",
    lname: "",
    email: "",
    password: "",
    mobile: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    dateOfBirth: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(form);
      console.log(res);
      if (res && res.message === "success") {
        alert("Registration successful!");
      } else {
        alert(res.message || "Registration failed.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        maxWidth: 400,
        margin: "auto",
        padding: "2rem",
      }}
    >
      {Object.entries(form).map(([key, value]) => (
        <input
          key={key}
          name={key}
          type={
            key === "password"
              ? "password"
              : key === "dateOfBirth"
              ? "date"
              : "text"
          }
          placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
          value={form[key]}
          onChange={handleChange}
          required
        />
      ))}
      <button type="submit">Register</button>
    </form>
  );
}

export default Page;

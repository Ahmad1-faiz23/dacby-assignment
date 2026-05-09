import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      alert("Registration Success");

      navigate("/login");
    } catch (error) {
      alert("Registration Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="form-container">
        <h1>Register</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={handleChange}
          />

          <button type="submit">
            Register
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;
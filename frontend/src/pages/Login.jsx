import { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return setMsg("Please fill in both fields");
    }

    try {
      const res = await axiosClient.post("/users/signin", form);
      localStorage.setItem("token", res.data.token);
      setMsg("Signin successful ✅");
      navigate("/orders");
    } catch (error) {
      console.error("Error while sign in:", error);
      setMsg(error.response?.data?.error || "Error while signing in ❌");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🔐 Sign In</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "250px" }}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button
          className="bg-red-400 px-3 py-1 rounded hover:bg-red-600"
          type="submit"
        >
          Submit
        </button>
      </form>
      <p style={{ marginTop: "1rem", color: "red" }}>{msg}</p>
    </div>
  );
}

export default Login;

import { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [ form, setForm] = useState({ name: "", email: "", password: ""});
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const res = await axiosClient.post("/users/signup", form);
            localStorage.setItem("token", res.data.token);
            setMsg("Signup successfull");
            navigate("/orders")

        } catch(err) {
            setMsg(err.res?.data?.error || "Error signing up");

        }
    }
    
    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder="Name" onChange={(e) => setForm({...form, name:e.target.value})} />
                <input placeholder="Email" onChange={(e) => setForm({...form, email: e.target.value})} />
                <input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <button type="submit">Signup</button>
            </form>
            <p>{msg}</p>
        </div>
    )
}

export default Signup;
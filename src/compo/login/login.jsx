import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../confi/config";
import { useNavigate } from "react-router-dom";
import "./login.css";
const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [pswd, setPswd] = useState("");
    const [role, setRole] = useState("");
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, pswd)
            alert(`${role} sucessfuly loggedin`)
            const Role=role
            if (Role === "buyer" || Role === "seller") {
                localStorage.setItem("loggedInUser", JSON.stringify({ email: email, role: role }))
            }
            navigate(`/${Role}Dashboard`)
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div id="form">
            <form action="" onSubmit={handleLoginSubmit}>
                <label htmlFor="">Enter email:</label>
                <input
                    type="email"
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="">Enter your password:</label>
                <input
                    type="password"
                    placeholder="epswd"
                    onChange={(e) => setPswd(e.target.value)}
                    required
                />
                <label htmlFor="">Enter your role:</label>
                <select
                    name=""
                    id="role"
                    onChange={(e) => setRole(e.target.value)}
                    required
                >
                    <option value="">choose yr role</option>
                    <option value="buyer">Buyer</option>
                    <option value="Seller">Seller</option>
                </select>
                <button type="submit">login</button>
                you don't account please signup:<a href="signup">Signup</a>
            </form>
        </div>
    );
};

export default Login;

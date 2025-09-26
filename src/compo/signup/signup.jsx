import React, { useState } from "react";
import "./signup.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../confi/config";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../confi/config";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const Nav = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")

    const SignUpAndSubmit = async (e) => {
        e.preventDefault();
        const nam = role === "Buyer" ? "Buyers" : "Sellers";
        const cred = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        console.log(cred, "cred")
        const docref = doc(db, `${role}`, name);
        await setDoc(docref, {
            name: name,
            email: email,
            role: role,
            // uid: cred.user.uid
        });
        alert("user signup done")
        Nav("/login")
    }

    return (
        <div>
            <div id="form">
                <form action="" onSubmit={SignUpAndSubmit}>
                    <label htmlFor="">Enter Your Name</label>
                    <input type="text" placeholder="Name" required onChange={(e) => setName(e.target.value)} />
                    <label htmlFor="">Enetr Your Email:</label>
                    <input type="email" placeholder="email" required onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="">Enter Your Password:</label>
                    <input type="password" placeholder="password" required onChange={(e) => setPassword(e.target.value)} />
                    <label htmlFor="">Role:</label>
                    <select name="" id="role" onChange={(e) => setRole(e.target.value)}>
                        <option value="">Chose Your Role</option>
                        <option value="Seller">Seller</option>
                        <option value="Buyer">Buyer</option>
                    </select>
                    <button type="submit">SignUp</button>

                    you have account in this page pleaase:<a href="login">login</a>
                </form>
            </div>
        </div>
    )
}
export default SignUp;

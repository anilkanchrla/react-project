import React from 'react'
import momImage from "../../assets/mom.png"
import { Link, useNavigate } from "react-router-dom"
const Navbarr = () => {
    const navigate = useNavigate()
    const loggedinUser = JSON.parse(localStorage.getItem("loggedInUser"))
    // const name=loggedinUser.email.split("@")
    console.log(name, "name split")

    console.log(loggedinUser)
    const handleLogout = () => {
        let c = confirm("are you sure to logout ???")
        if (c) {
            localStorage.removeItem("loggedInUser")
            navigate("/login")
        } else {
            navigate(`/${loggedinUser.role}DashBoard`)
        }
    }
    return (
        <div style={{ display: "flex", justifyContent: "space-around", backgroundColor: "orange", alignItems: "center" }}>
            <img src={momImage} alt="mom" style={{width:"60",height:"60px"}} />
            <h1>MOM'S FOOD</h1>
            {loggedinUser ? <>
                <p>{name[0]}</p>
                <button onClick={handleLogout}>logout</button></>
                : <div style={{ display: "flex", gap: 20, }}>
                   <Link to="/login" style={{textDecoration: "none", padding:"5px",backgroundColor:"whitesmoke",borderRadius:"2px",boxShadow:"1px 1px 2px black"}}>Login</Link>
                    <Link to="/signup" style={{textDecoration: "none",padding:"5px",backgroundColor:"whitesmoke",borderRadius:"2px",boxShadow:"1px 1px 2px black"}}>Signup</Link>
                </div>}
        </div>
    
    );
}

export default Navbarr;
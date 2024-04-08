import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const host = "http://localhost:5000"
    // Initialize state with an empty email and password
    const [creds, setCreds] = useState({ email: "", password: "" })
    // Use the useNavigate hook to navigate between pages
    let history = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Make a POST request to the /api/auth/login endpoint
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: creds.email, password: creds.password }), // body data type must match "Content-Type" header
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect to home page
            localStorage.setItem('token', json.authtoken);
            history("/")
        }
        else {
            alert("Invalid credentials");
        }
    }
    const onChange = (e) => {
        // Update the state with the new value
        setCreds({ ...creds, [e.target.name]: e.target.value })
    }
    return (
        // Render a form that accepts email and password inputs
        <form onSubmit={handleSubmit}>
            <div className="mt-2 d-flex mt-2 justify-content-center item-center">
                <h1>Login in iNoteBook</h1>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" name="email" value={creds.email} onChange={onChange} aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" value={creds.password} name="password" id="password" onChange={onChange} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}
export default Login

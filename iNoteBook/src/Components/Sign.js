import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Sign = () => {
    let history = useNavigate();
    const host = "http://localhost:5000"
    const [creds, setCreds] = useState({ name: "", email: "", password: "" })
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: creds.name, email: creds.email, password: creds.password }), // body data type must match "Content-Type" header
        });
        history('/');
        const json = response.json();
        console.log(json)
    }
    const onChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value })
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="d-flex mt-2 justify-content-center item-center">
                <h1>Welcome to iNoteBook</h1>
            </div>
            <div className="d-flex mt-2 justify-content-center item-center">
                <h2>Sign Up</h2>
            </div>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="name" className="form-control" id="name" name="name" value={creds.name} onChange={onChange} />
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

export default Sign

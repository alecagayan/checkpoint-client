import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import Toast from '../components/toast/Toast';
import { registerOrganization } from '../API';

export default function RegisterOrganization() {
    const [orgName, setOrgName] = useState();
    const [orgId, setOrgId] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        const result = await registerOrganization({
            orgName,
            orgId,
            name,
            email,
            username,
            password
        });
        if (result.result === "1") {
            console.log("hi");
        }
        else {
            console.log("bye");
        }
        navigate("/");
    }

    return (
        <div id="form">
            <h2 id="headerTitle">Register an Organization</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <div className="row">
                        <label>Organization Name</label>
                        <input type="text" placeholder="Enter an organization name" onChange={e => setOrgName(e.target.value)} />
                    </div>
                    <div className="row">
                        <label>Organization Identifier</label>
                        <input type="text" placeholder="Enter an organization identifier" onChange={e => setOrgId(e.target.value)} />
                    </div>
                    <div className="row">
                        <label>Owner Name</label>
                        <input type="text" placeholder="Enter your name" onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="row">
                        <label>Owner Email</label>
                        <input type="text" placeholder="Enter your email" onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="row">
                        <label>Owner Username</label>
                        <input type="text" placeholder="Enter your username" onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div className="row">
                        <label>Owner Password</label>
                        <input type="password" placeholder="Enter your password" onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div id="button" className="row">
                        <button>Register Organization</button>
                    </div>
                </div>
            </form>
        </div>
    );




}
import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom"
import Toast from '../components/toast/Toast';
import { registerOrganization } from '../API';
import ReCAPTCHA from "react-google-recaptcha";

export default function RegisterOrganization() {
    const [orgName, setOrgName] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [username, setUsername] = useState();

    const navigate = useNavigate();
    const recaptchaRef = useRef(null)



    const handleSubmit = async e => {
        e.preventDefault();
        const captchaToken = await recaptchaRef.current.executeAsync();
        recaptchaRef.current.reset();
        console.log(captchaToken)

        const result = await registerOrganization({
            orgName,
            name,
            email,
            username,
            captchaToken
        });
        if (result.result === "1") {
            console.log("hi");
            navigate("/");

        }
        else {
            console.log("bye");
        }
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
                    <div id="button" className="row">
                        <button>Register Organization</button>
                    </div>
                </div>
            </form>
            <ReCAPTCHA
            sitekey={"6Ld2g9QjAAAAACNCVpeRLYAVVe5RcvFNwbOua7sr"}
            // size="invisible"
            ref={recaptchaRef}
            size="invisible"
            />
        </div>
    );




}
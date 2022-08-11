import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"


async function registerUser(credentials) {
    return fetch(process.env.REACT_APP_API_URL + '/rbapi/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }
   

export default function SignupForm () {
    const [id, setID] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [registrationcode, setRegistrationCode] = useState();
    const [registrationStatus, setRegistrationStatus] = useState();

    const navigate = useNavigate();
    
    const handleSubmit = async e => {
        e.preventDefault();
        const result = await registerUser({
          id,
          name,
          email,
          registrationcode
        });
        if (result.result === "1") {
            setRegistrationStatus("Success!");
        }
        else {
           setRegistrationStatus("Invalid registration code or you are already registered!");
        }
    }

    return(
    <div id="form">
        <h2 id="headerTitle">Register</h2>
        <form onSubmit={handleSubmit}>
        <div>
             <div className="row">
                 <label>School ID</label>
                <input type="text" placeholder="Enter your school ID" onChange={e => setID(e.target.value)} />
            </div> 
            <div className="row">
                 <label>Name</label>
                <input type="text" placeholder="Enter your name" onChange={e => setName(e.target.value)} />
            </div>
            <div className="row">
                 <label>Email</label>
                <input type="text" placeholder="Enter your email" onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="row">
                 <label>Signup Code</label>
                <input type="text" placeholder="Enter your registration code" onChange={e => setRegistrationCode(e.target.value)} />
            </div>
            <div id="button" className="row">
                <button>Register</button>
            </div> 
            <div>
                <p><center>{registrationStatus}</center></p>
            </div>            
        </div>
        </form>
    </div>
    )
}
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import PropTypes from 'prop-types';


async function loginUser(credentials) {
    return fetch(process.env.REACT_APP_API_URL + '/rbapi/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }
   

export default function LoginForm ({setToken}) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    
    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
          username,
          password
        });
        if (token.token) {
            setToken(token);
            navigate("/");
        }
    }

    return(
    <div id="form">
        <h2 id="headerTitle">Admin Login</h2>
        <form onSubmit={handleSubmit}>
        <div>
             <div className="row">
                 <label>Username</label>
                <input type="text" placeholder="Enter your username" onChange={e => setUserName(e.target.value)} />
            </div> 
            <div className="row">
                 <label>Password</label>
                <input type="password" placeholder="Enter your password" onChange={e => setPassword(e.target.value)} />
            </div>
            <div id="button" className="row">
                <button>Log In</button>
            </div> 
            <a href="/signup" className='signupbutton' >Don't have an account? Register</a>
        </div>
        </form>
    </div>
    )
}
  

LoginForm.propTypes = {
    setToken: PropTypes.func.isRequired
};
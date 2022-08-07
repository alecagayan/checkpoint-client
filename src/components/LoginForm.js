import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import PropTypes from 'prop-types';


async function loginUser(credentials) {
    return fetch('http://localhost:8080/rbapi/login', {
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
        console.log('we received token: ', token);
        console.log('we received token.token: ', token.token);
        if (token.token) {
            setToken(token);
            navigate("/");
        }
    }

    return(
    <div id="loginform">
        <h2 id="headerTitle">Login</h2>
        <form onSubmit={handleSubmit}>
        <div>
             <div class="row">
                 <label>Username</label>
                <input type="text" placeholder="Enter your username" onChange={e => setUserName(e.target.value)} />
            </div> 
            <div class="row">
                 <label>Password</label>
                <input type="password" placeholder="Enter your password" onChange={e => setPassword(e.target.value)} />
            </div>
            <div id="button" class="row">
                <button>Log In</button>
            </div> 
        </div>
        <div id="alternativeLogin">
            <label>Or sign in with:</label>
            <div id="iconGroup">
            </div>
        </div>
        </form>
    </div>
    )
}
  

LoginForm.propTypes = {
    setToken: PropTypes.func.isRequired
};
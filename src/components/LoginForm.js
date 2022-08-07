import React, { useState } from 'react';
import PropTypes from 'prop-types';


async function loginUser(credentials) {
    return fetch('http://localhost:8080/login', {
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
    
    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
          username,
          password
        });
        setToken(token);
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
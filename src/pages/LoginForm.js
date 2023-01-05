import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import PropTypes from 'prop-types';
import { loginUser } from '../API';   
import Toast from '../components/toast/Toast';


export default function LoginForm ({setToken, setRole}) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const [toastList, setToastList] = useState([]);
    let toastProperties = null;
    
    const handleSubmit = async e => {
        e.preventDefault();
        const result = await loginUser({
          username,
          password
        });
        if (result.token) {
          setToken({ token: result.token });
          setRole({ role: result.role });
          navigate("/");

        } else {
            showToast('error');
        }
    }

    const showToast = type => {
        switch(type) {
          case 'error':
            toastProperties = {
              id: toastList.length+1,
              title: 'Error',
              description: 'Invalid username or password.',
              backgroundColor: '#d9534f'
            }
            break;
          default:
            toastProperties = [];
        }
        setToastList([...toastList, toastProperties]);
      };

    return(
    <div id="form">
        <h2 id="headerTitle">Login</h2>
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
            <a href="/view" className='signupbutton' >Not an admin? View your attendance</a>
            <a href="/forgot" className='adminbutton' >Forgot Password</a>

        </div>
        </form>
        <Toast toastlist={toastList} position="top-right" setList={setToastList} />
    </div>
    )
}
  

LoginForm.propTypes = {
    setToken: PropTypes.func.isRequired

};
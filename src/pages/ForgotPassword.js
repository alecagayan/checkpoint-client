import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import PropTypes from 'prop-types';
import { passwordReset } from '../API';   
import Toast from '../components/toast/Toast';


export default function ForgotPassword ({setToken}) {
    const [email, setEmail] = useState();
    const navigate = useNavigate();

    const [toastList, setToastList] = useState([]);
    let toastProperties = null;
    
    const handleSubmit = async e => {
        e.preventDefault();
        const result = await passwordReset({
          email
        });
        if (result.result === "1") {
            showToast('succcess', 'Password reset email sent to ' + email + '.');
        } else {
            showToast('error', 'Failed to send password reset email to ' + email + '.');
        }
    }

    const showToast = (type, msg) => {
        switch(type) {
          case 'success':
            toastProperties = {
              id: toastList.length+1,
              title: 'Success',
              description: msg,
              backgroundColor: '#0066ff'
            }
            break;
          case 'error':
            toastProperties = {
              id: toastList.length+1,
              title: 'Error',
              description: msg,
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
        <h2 id="headerTitle">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
        <div>
             <div className="row">
                 <label>Email Address</label>
                <input type="text" placeholder="Enter your email address" onChange={e => setEmail(e.target.value)} />
            </div> 
            <div id="button" className="row">
                <button>Send Reset Link</button>
            </div> 
            <a href="/login" className='signupbutton' >Back to Login</a>

        </div>
        </form>
        <Toast toastlist={toastList} position="top-right" setList={setToastList} />
    </div>
    )
}
import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom"
import { resetPassword } from '../API';
import Toast from '../components/toast/Toast';


export default function ResetPasswordForm () {

    const queryParameters = new URLSearchParams(window.location.search)
    let passwordResetToken = queryParameters.get('token');

    const [password, setPassword] = useState();
    const [repeatPassword, setRepeatPassword] = useState();

    const [toastList, setToastList] = useState([]);
    let toastProperties = null;

    const navigate = useNavigate();
    
    const handleSubmit = async e => {
        e.preventDefault();
        const result = await resetPassword({
          password,
          repeatPassword,
          token: passwordResetToken
        });
        if (result.result === "1") {
            showToast('success');
            navigate(`/login`);
        }
        else {
           showToast('error');
        }
        setPassword("");
        setRepeatPassword("");
    }

    const showToast = type => {
        switch(type) {
          case 'success':
            toastProperties = {
              id: toastList.length+1,
              title: 'Success',
              description: 'Password changed successfully.',
              backgroundColor: '#0066ff'
            }
            break;
          case 'error':
            toastProperties = {
              id: toastList.length+1,
              title: 'Error',
              description: 'Failed to change password.',
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
        <h2 id="headerTitle">Password Reset</h2>
        <form onSubmit={handleSubmit}>
        <div>
            <div className="row">
                 <label>New Password</label>
                <input type="password" placeholder="Enter a new password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div className="row">
                 <label>Repeat New Password</label>
                <input type="password" placeholder="Confirm your new password" value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} />
            </div>
            <div id="button" className="row">
                <button>Set New Password</button>
            </div>        
        </div>
        </form>
        <Toast toastlist={toastList} position="top-right" setList={setToastList} />

    </div>
    )
}
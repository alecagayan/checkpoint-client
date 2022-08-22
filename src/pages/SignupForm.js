import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import Toast from '../components/toast/Toast';

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

    const [toastList, setToastList] = useState([]);
    let toastProperties = null;

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
            showToast('success');
        }
        else {
           showToast('error');
        }
        setID("");
        setName("");
        setEmail("");
        setRegistrationCode("");

    }

    const showToast = type => {
        switch(type) {
          case 'success':
            toastProperties = {
              id: toastList.length+1,
              title: 'Success',
              description: 'User ' + id + ' registered successfully.',
              backgroundColor: '#0066ff'
            }
            break;
          case 'error':
            toastProperties = {
              id: toastList.length+1,
              title: 'Error',
              description: 'Failed to register user ' + id + '.',
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
        <h2 id="headerTitle">Register</h2>
        <form onSubmit={handleSubmit}>
        <div>
             <div className="row">
                 <label>School ID</label>
                <input type="text" placeholder="Enter your school ID" value={id} onChange={e => setID(e.target.value)} />
            </div> 
            <div className="row">
                 <label>Name</label>
                <input type="text" placeholder="Enter your name" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="row">
                 <label>Email</label>
                <input type="text" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="row">
                 <label>Signup Code</label>
                <input type="text" placeholder="Enter your registration code" value={registrationcode} onChange={e => setRegistrationCode(e.target.value)} />
            </div>
            <div id="button" className="row">
                <button>Register</button>
            </div>        
        </div>
        </form>
        <Toast toastlist={toastList} position="top-right" setList={setToastList} />

    </div>
    )
}
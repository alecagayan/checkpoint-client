import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import Toast from '../components/toast/Toast';
import { registerUser } from '../API';
import { getToken } from '../App';


export default function SignupForm () {
    const [id, setID] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();

    const [toastList, setToastList] = useState([]);
    let toastProperties = null;

    const storedToken = getToken();

    const navigate = useNavigate();
    
    const handleSubmit = async e => {
        e.preventDefault();
        const result = await registerUser({
          id,
          name,
          email,
          token: storedToken
        });
        if (result.result === "1") {
            showToast('success');
            navigate(`/checkin/${id}`);
        }
        else {
           showToast('error');
        }
        setID("");
        setName("");
        setEmail("");

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
                 <label>User ID</label>
                <input type="text" placeholder="Enter your ID" value={id} onChange={e => setID(e.target.value)} />
            </div> 
            <div className="row">
                 <label>Name</label>
                <input type="text" placeholder="Enter your name" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="row">
                 <label>Email</label>
                <input type="text" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
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
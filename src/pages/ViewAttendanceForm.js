import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import PropTypes from 'prop-types';
import { loginUser } from '../API';   
import Toast from '../components/toast/Toast';

export default function ViewAttendanceForm ({setToken}) {
    const [username, setUserName] = useState();
    const navigate = useNavigate();

    const [toastList, setToastList] = useState([]);
    let toastProperties = null;
    
    const handleSubmit = async e => {
        e.preventDefault();
            navigate(`/userview/${username}`);
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
        <h2 id="headerTitle">User Login</h2>
        <form onSubmit={handleSubmit}>
        <div>
             <div className="row">
                 <label>Username</label>
                <input type="text" placeholder="Enter your username" onChange={e => setUserName(e.target.value)} />
            </div> 

            <div id="button" className="row">
                <button>View</button>
            </div> 

        </div>
        </form>
        <Toast toastlist={toastList} position="top-right" setList={setToastList} />
    </div>
    )
}
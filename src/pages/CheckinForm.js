import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Toast from '../components/toast/Toast';
import PropTypes from 'prop-types';
import { getToken } from '../App';


async function checkinUser(credentials) {
    return fetch(process.env.REACT_APP_API_URL + '/rbapi/checkin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}


export default function CheckinForm({ setToken }) {
    let { meetingId } = useParams();
    const [studentId, setStudentId] = useState("");

    const [toastList, setToastList] = useState([]);
    let toastProperties = null;

    const storedToken = getToken();
    
    const handleSubmit = async e => {
        e.preventDefault();

        if (studentId.length === 0) {
            toastProperties = {
                id: toastList.length+1,
                title: 'Error',
                description: "Please enter a student ID.",
                type: "error",
                backgroundColor: '#d9534f'                
            };
            setToastList([...toastList, toastProperties]);
            return;
        } 

        const result = await checkinUser({
            login: studentId,
            token: storedToken,
            meetingId
        });

        setStudentId("");
        if (result.result === "1") {    
            showToast('success');
        }
        else {
            showToast('error');
        }
    }

    const showToast = type => {
        switch(type) {
          case 'success':
            toastProperties = {
              id: toastList.length+1,
              title: 'Success',
              description: 'User ' + studentId + ' checked in successfully.',
              backgroundColor: '#0066ff'
            }
            break;
          case 'error':
            toastProperties = {
              id: toastList.length+1,
              title: 'Error',
              description: 'Failed to check in user ' + studentId + '.',
              backgroundColor: '#d9534f'
            }
            break;
          default:
            toastProperties = [];
        }
        setToastList([...toastList, toastProperties]);
      };

    return (
        <div id="form">
            <h2 id="headerTitle">Check In</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <div className="row">
                        <label>ID</label>
                        <input type="text" placeholder="Enter your student ID" value={studentId} onChange={e => setStudentId(e.target.value)} />
                    </div>
                    <div id="button" className="row">
                        <button>Check In</button>
                    </div>
                </div>
            </form>
            <Toast toastlist={toastList} position="top-right" setList={setToastList} />
        </div>
    )
}

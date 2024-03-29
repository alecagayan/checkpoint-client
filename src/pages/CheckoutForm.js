import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Toast from '../components/toast/Toast';
import PropTypes from 'prop-types';
import { getToken } from '../App';
import { checkoutUser } from '../API';

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

        const result = await checkoutUser({
            login: studentId,
            token: storedToken,
            meetingId
        });

        setStudentId("");
        if (result.result === "1") {    
            showToast('success', 'User ' + studentId + ' checked out successfully.');
        }
        else {
            showToast('error', 'Failed to check out user ' + studentId + '.');
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

    return (
        <div id="form">
            <h2 id="headerTitle">Check Out</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <div className="row">
                        <label>ID</label>
                        <input type="text" placeholder="Enter your student ID" value={studentId} onChange={e => setStudentId(e.target.value)} />
                    </div>
                    <div id="button" className="row">
                        <button className="check-out">Check Out</button>
                    </div>
                    <a href={"/checkin/" + meetingId} className='signupbutton' >Need to check in?</a>
                    <a href={"/"} className='adminbutton' >Admin Login</a>
                </div>
            </form>
            <Toast toastlist={toastList} position="top-right" setList={setToastList} />
        </div>
    )
}
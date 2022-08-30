import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Toast from '../components/toast/Toast';
import PropTypes from 'prop-types';
import { getToken } from '../App';
import { checkinUser } from '../API';

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
                    <div className="row large">
                        <label>ID</label>
                        <input type="text" placeholder="Enter your student ID" value={studentId} onChange={e => setStudentId(e.target.value)} />
                    </div>
                    <div id="button" className="row large">
                        <button className="check-in">Check In</button>
                    </div>
                    <a href={"/checkout/" + meetingId} className='signupbutton large' >Need to check out?</a>
                    <a href="/signup" className='signupbutton large' >Create an account</a>

                    <a href={"/"} className='adminbutton large' >Admin Login</a>
                </div>
            </form>
            <Toast toastlist={toastList} position="top-right" setList={setToastList} />
        </div>
    )
}

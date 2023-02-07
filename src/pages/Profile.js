import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import QRCode from "react-qr-code";

import AttendanceTable from '../components/AttendanceTable';
import { getUser, getAttendance, updateUser, getUserByToken } from '../API';
import { getToken } from '../App';
import Toast from '../components/toast/Toast';


export default function Profile() {
  const [userData, setUserData] = useState({});
  const [attendanceData, setAttendanceData] = useState([]);

  const [toastList, setToastList] = useState([]);
  let toastProperties = null;

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserByToken();
      console.log("data", data);
      setUserData(data);
    };
    fetchUserData();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    const result = await updateUser({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      username: userData.username,
      login: userData.login,
      role: userData.role,
      status: userData.status,
      token: getToken()
    });

    if (result.user) {
      // show success toast
      showToast('success', 'User updated successfully.');
    } else {
      // show error toast
      showToast('error', 'Failed to update user.');
    }
  }

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const showToast = (type, msg) => {
    switch (type) {
      case 'success':
        toastProperties = {
          id: toastList.length + 1,
          title: 'Success',
          description: msg,
          backgroundColor: '#0066ff'
        }
        break;
      case 'error':
        toastProperties = {
          id: toastList.length + 1,
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
    <div className="main">
      <h2>Your Details</h2>
      <div className="panel">
        <p>User ID: {userData.id}</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="entry-field">
              <label className="form-label">Name:</label>
              <input className="form-input" type="text" name="name" value={userData.name} onChange={handleChange} />
            </div>
            <div className="entry-field">
              <label className="form-label">Email:</label>
              <input className="form-input" type="text" name="email" value={userData.email} onChange={handleChange} />
            </div>
            <div className="entry-field">
              <label className="form-label">Login:</label>
              <input className="form-input" type="text" name="login" value={userData.login} onChange={handleChange} />
            </div>
            <div className="entry-field">
              <label className="form-label">Role:</label>
              <select className="form-select" name="role" value={userData.role} disabled="true" onChange={handleChange}>
                <option value="0">Member</option>
                <option value="1">Admin</option>
              </select>
            </div>
            <div className="entry-field">
              <label className="form-label">Status:</label>
              <select className="form-select" name="status" value={userData.status} disabled="true" onChange={handleChange}>
                <option value="1">Active</option>
                <option value="0">Disabled</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <br />
            <button className='normalbutton'>Update</button>

          </div>

        </form>

      </div>
      <div style={{ height: "auto", margin: "0 auto", maxWidth: 256, width: "100%" }}>
      {userData.login && (
          <QRCode
            value={getToken()}
            size={256}
            
          />
        )}
    </div>
      <Toast toastlist={toastList} position="top-right" setList={setToastList} />
    </div>
  );
}
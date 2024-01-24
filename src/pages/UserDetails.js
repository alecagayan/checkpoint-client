import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import AttendanceTable from '../components/AttendanceTable';
import { getUser, getAttendance, updateUser, forgotPassword } from '../API';
import { getToken } from '../App';
import Toast from '../components/toast/Toast';


export default function UserDetails() {
  let { userId } = useParams();

  const [userData, setUserData] = useState({});
  const [attendanceData, setAttendanceData] = useState([]);

  const [toastList, setToastList] = useState([]);
  let toastProperties = null;


  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUser(userId);
      console.log("data", data);
      setUserData(data);
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      const data = await getAttendance(userId);
      console.log("data", data);
      setAttendanceData(data);
    }
    fetchAttendanceData();
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

  const handleForgotPassword = async e => {
    const result = await forgotPassword({
      email: userData.email
    });
    if (result.result === "1") {
        showToast('success', 'Password reset email sent to ' + userData.email + '.');
    } else {
        showToast('error', 'Failed to send password reset email to ' + userData.email + '.');
    }

}

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
      <h2>User Details</h2>
      <div className="panel">
        <p>User ID: {userId}</p>

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
              <select className="form-select" name="role" value={userData.role} onChange={handleChange}>
                <option value="0">Member</option>
                <option value="1">Admin</option>
              </select>
            </div>
            <div className="entry-field">
              <label className="form-label">Status:</label>
              <select className="form-select" name="status" value={userData.status} onChange={handleChange}>
                <option value="1">Active</option>
                <option value="0">Disabled</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <button className='normalbutton'>Update User</button>

            <button className="normalbutton" type='button' onClick={() => {handleForgotPassword();}}>Reset Password</button>
          </div>

        </form>

      </div>
      <div className="panel">
        <AttendanceTable data={attendanceData} />
      </div>
      <Toast toastlist={toastList} position="top-right" setList={setToastList} />
    </div>  
  );
}
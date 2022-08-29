import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import AttendanceTable from '../components/AttendanceTable';
import { getUser, getAttendance, updateUser } from '../API';
import { getToken } from '../App';

export default function UserDetails() {
  let { userId } = useParams();

  const [userData, setUserData] = useState({});
  const [attendanceData, setAttendanceData] = useState([]);


  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUser(userId);
      setUserData(data);
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      const data = await getAttendance(userId);
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

  }

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
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
          <input type="text" name="name" value={userData.name} onChange={handleChange} />
        </div>
        <div className="entry-field">
          <label className="form-label">Email:</label>
          <input type="text" name="email" value={userData.email} onChange={handleChange} />
        </div>
        <div className="entry-field">
          <label className="form-label">Login:</label>
          <input type="text" name="login" value={userData.login} onChange={handleChange} />
        </div>
        </div>
        <div className="form-group">
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
          <br/>
        <button className='normalbutton'>Update User</button>
        </div>

      </form>
      </div>
      <div className="panel">
        <AttendanceTable data={attendanceData} />
        </div>
      </div>



  );
}

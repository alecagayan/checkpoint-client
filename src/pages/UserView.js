import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import AttendanceTable from '../components/AttendanceTable';
import { getUser, getAttendanceBetweenDates, updateUser, getPercentages, getUserByLogin } from '../API';
import { getToken } from '../App';
import Toast from '../components/toast/Toast';
import DatePicker from "react-datepicker";


export default function UserView() {
    let { login } = useParams();

    const [userData, setUserData] = useState({});
    const [attendanceData, setAttendanceData] = useState([]);
    const [percentageData, setPercentageData] = useState([]);

    const [toastList, setToastList] = useState([]);
    let toastProperties = null;

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());    

    useEffect(() => {
        const fetchUserData = async () => {
            const data = await getUserByLogin(login);
            setUserData(data);
        };
        fetchUserData();
    }, []);

    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);

        if (start && end) {
            getAttendanceBetweenDates(userData.id, start, end)
                .then(
                    (result) => {
                        setAttendanceData(result);
                    },
                    (error) => {
                        toastProperties = {
                            title: "Error",
                            description: "Error getting attendance data",
                            backgroundColor: "#dc3545",
                            icon: "danger"
                        };
                        setToastList([...toastList, toastProperties]);
                    }
                )
            getPercentages(userData.id, start, end)
                .then(
                    (result) => {
                        setPercentageData(result);
                    },
                    (error) => {
                        toastProperties = {
                            title: "Error",
                            description: "Error getting percentage data",
                            backgroundColor: "#dc3545",
                            icon: "danger"
                        };
                        setToastList([...toastList, toastProperties]);
                    }
                )
        }
      };

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
            <h2>User Details</h2>
            <div className="panel">
                <p>User ID: {userData.id}</p>
                <form>
                    <div className="form-group">
                        {/* <div className="entry-field">
                            <label className="form-label">Name:</label>
                            <input className="form-input" type="text" name="name" value={userData.name} disabled="disabled" />
                        </div> */}
                        {/* <div className="entry-field">
                            <label className="form-label">Email:</label>
                            <input className="form-input" type="text" name="email" value={userData.email} disabled="disabled" />
                        </div> */}
                        <div className="entry-field">
                            <label className="form-label">Login:</label>
                            <input className="form-input" type="text" name="login" value={userData.login} disabled="disabled" />
                        </div>
                    </div>
                </form>
            </div>
                <div className="panel">
            <form>
            <div>
            Select a date range:
            <DatePicker
                selected={startDate}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
            />
            </div>
            <div className="entry-field">
                <label className="">Adjusted percentage:</label>
                {/* text is yellow if below 80 and red if below 60 */}
                <input className="form-input" type="text" name="percentage" value={percentageData} disabled="disabled" style={{color: percentageData < 60 ? '#EF476F' : percentageData < 80 ? '#FF914D' : 'green'}} />
            </div>
            </form>
                <AttendanceTable data={attendanceData} />
            </div>
            <Toast toastlist={toastList} position="top-right" setList={setToastList} />
        </div>
    );
}

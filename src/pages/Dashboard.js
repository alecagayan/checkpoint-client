import React from 'react';
import { Navigate, useNavigate } from "react-router-dom"
import { getToken } from '../App';

function LogoutButton(props) {
    const navigate = useNavigate();
    return (
        <button onClick={() => { 
            sessionStorage.removeItem('token');
            navigate('/login');
        }
    }>Logout</button>
    );
}

export default function Dashboard(props) {

    const token = getToken();

    if (!token) {
        return <Navigate replace to="/login" />
    }

    return(
        <React.Fragment>
            <h2>Dashboard</h2>
            <p>Welcome to the Checkpoint Dashboard!</p>
            <LogoutButton />
        </React.Fragment>
    );
}
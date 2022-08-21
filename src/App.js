import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import CheckinForm from './components/CheckinForm';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Home2 from './components/Home2';
import MeetingReport from './components/MeetingReport';
import Report from './components/Report';
import Users from './components/Users';
import Meetings from './components/Meetings';
import Navbar from './components/navbar/Navbar';


function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

export function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}


function RequireAuth({ children }) {
  const token = getToken();
  return (token) ? children : <Navigate to="/login" replace />;
}

export default function App() {
  useEffect(() => {
    document.title = "Checkpoint"
  }, [])

  return (
    <BrowserRouter>
        <Routes>
          <Route index element = { 
            <RequireAuth>
              <Navbar />
              <Home/>
            </RequireAuth>
          } />
          <Route path="/login" element = {
            <LoginForm setToken={setToken} />
            } />
          <Route path="/signup" element = {
            <SignupForm />
            } />
          <Route path="/checkin/:meetingId" element = {
            <RequireAuth>
              <CheckinForm />
            </RequireAuth>
          } />
          <Route path="/meetingreport/:meetingId" element = {
            <RequireAuth>
              <Navbar />
              <MeetingReport />
            </RequireAuth>
          } />
          <Route path="/report" element={
            <RequireAuth>
              <Navbar />
              <Report />
            </RequireAuth>
          } />
          <Route path="/dashboard" element={
            <RequireAuth>
              <Navbar />
              <Dashboard />
            </RequireAuth>
          } />
          <Route path="/users" element={
            <RequireAuth>
              <Navbar />
              <Users />
            </RequireAuth>
          } />
          <Route path="/meetings" element={
            <RequireAuth>
              <Navbar />
              <Meetings />
            </RequireAuth>
          } />
        </Routes>
    </BrowserRouter>
  );
}

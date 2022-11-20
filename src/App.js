import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import LoginForm from './pages/LoginForm';
import SignupForm from './pages/SignupForm';
import CheckinForm from './pages/CheckinForm';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import MeetingDetails from './pages/MeetingDetails';
import Report from './pages/Report';
import Users from './pages/Users';
import Meetings from './pages/Meetings';
import Navbar from './components/navbar/Navbar';
import CheckoutForm from './pages/CheckoutForm';
import UserDetails from './pages/UserDetails';
import ForgotPassword from './pages/ForgotPassword';
import UserView from './pages/UserView';
import ViewAttendanceForm from './pages/ViewAttendanceForm';
import RegisterOrganization from './pages/RegisterOrganization';
import ResetPassword from './pages/ResetPassword';
import MeetingTypes from './pages/MeetingTypes';
import MeetingTypeDetails from './pages/MeetingTypeDetails';

function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
  sessionStorage.removeItem('kiosk');
}

export function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}

export function isKiosk() {
  const kioskString = sessionStorage.getItem('kiosk');
  if (kioskString === 'true') {
    return true;
  }
}

function RequireAuth({ children }) {
  const token = getToken();
  return (token) ? children : <Navigate to="/login" replace />;
}

function RequireAdmin({ children }) {
  const token = getToken();
  return (token && !isKiosk()) ? children : <Navigate to="/login" replace />;
}


export default function App() {
  useEffect(() => {
    document.title = "Checkpoint"
  }, [])

  return (
    <BrowserRouter>
        <Routes>
          <Route index element = { 
            <RequireAdmin>
              <Navbar />
              <Home/>
            </RequireAdmin>
          } />
          <Route path="/login" element = {
            <LoginForm setToken={setToken} />
            } />
          <Route path="/signup" element = {
            <SignupForm />
            } />
          <Route path="/forgot" element = {
            <ForgotPassword />
            } />
          <Route path="/userview/:login" element = {
              <UserView />
          } />
          <Route path="/view" element = {
              <ViewAttendanceForm />
          } />
          <Route path="/neworg" element = {
              <RegisterOrganization />
          } />
          <Route path="/resetpassword/:passwordResetToken" element = {
              <ResetPassword />
          } />
          <Route path="/checkin/:meetingId" element = {
            <RequireAuth>
              <CheckinForm />
            </RequireAuth>
          } />
          <Route path="/checkout/:meetingId" element = {
            <RequireAuth>
              <CheckoutForm />
            </RequireAuth>
          } />
          <Route path="/meeting/:meetingId" element = {
            <RequireAdmin>
              <Navbar />
              <MeetingDetails />
            </RequireAdmin>
          } />
          <Route path="/meetingtype/:meetingTypeId" element = {
            <RequireAdmin>
              <Navbar />
              <MeetingTypeDetails />
            </RequireAdmin>
          } />
          <Route path="/user/:userId" element = {
            <RequireAdmin>
              <Navbar />
              <UserDetails />
            </RequireAdmin>
          } />
          <Route path="/report" element={
            <RequireAdmin>
              <Navbar />
              <Report />
            </RequireAdmin>
          } />
          <Route path="/dashboard" element={
            <RequireAuth>
              <Navbar />
              <Dashboard />
            </RequireAuth>
          } />
          <Route path="/users" element={
            <RequireAdmin>
              <Navbar />
              <Users />
            </RequireAdmin>
          } />
          <Route path="/meetings" element={
            <RequireAdmin>
              <Navbar />
              <Meetings />
            </RequireAdmin>
          } />
          <Route path="/meetingtypes" element={
            <RequireAdmin>
              <Navbar />
              <MeetingTypes />
            </RequireAdmin>
          } />
        </Routes>
    </BrowserRouter>
  );
}


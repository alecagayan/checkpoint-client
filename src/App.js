import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import Home from './components/Home';

function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

export function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}

function App() {
//  const token = getToken();
//  if (!token) {
//    return <LoginForm setToken={setToken} />
//  }

  return (
    <div>
    <BrowserRouter>
        <Routes>
          <Route index element = {<Home />} />
          <Route path="/login" element = {<LoginForm setToken={setToken} />} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

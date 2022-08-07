import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import Report from './components/Report';

function App() {
  const [token, setToken] = useState();

  if (!token) {
    return <LoginForm setToken={setToken} />
  }

  return (
    <div>
    <BrowserRouter>
        <Routes>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/reports">
            <Report />
          </Route>
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

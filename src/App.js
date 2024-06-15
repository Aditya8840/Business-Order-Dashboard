// src/App.js
import React from 'react';
import { useSelector } from 'react-redux';
import Login from './components/Login';
import Profile from './components/Profile';

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <h1>React Google Login</h1>
      {user ? <Profile /> : <Login />}
    </div>
  );
}

export default App;
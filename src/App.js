// src/App.js
import React from 'react';
import { useSelector } from 'react-redux';
import Login from './components/Login';
import Profile from './components/Profile';
import Orders from './components/Order';

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      {user ? <Orders /> : <Login />}
    </div>
  );
}

export default App;
import React from 'react';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/auth/slice';
import axios from 'axios';

function Login() {
    const dispatch = useDispatch();
  
    const handleLoginSuccess = (response) => {
      console.log('Login Success: ', response);
      dispatch(setUser(response));
    };
  
    const handleLoginError = (error) => {
      console.log('Login Failed:', error);
    };

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => handleLoginSuccess(codeResponse),
        onError: (error) => handleLoginError('Login Failed:', error),
    });
  
    return (
      <button
        onClick={() => login()}
      >Google SignIn</button>
    );
}
  
export default Login;
import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/auth/slice';

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
      <div>
        <h1>Google Auth</h1>
        <button
        onClick={() => login()}
      >Google SignIn</button>
      </div>
    );
}
  
export default Login;
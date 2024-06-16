import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/auth/slice';
import { Button, Typography, Container, Box } from '@mui/material';
import { blue } from '@mui/material/colors';

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
      <Container maxWidth="sm">
      <Box sx={{ textAlign: 'center', marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Google Auth
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ backgroundColor: blue[500], '&:hover': { backgroundColor: blue[700] } }}
          onClick={() => login()}
        >
          Sign In with Google
        </Button>
      </Box>
    </Container>
    );
}
  
export default Login;
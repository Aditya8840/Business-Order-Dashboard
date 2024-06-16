import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProfile, logout } from '../store/auth/slice';
import axios from 'axios';
import {
  Typography,
  Button,
  Avatar,
  Paper,
  Container,
  Box,
  CircularProgress,
} from '@mui/material';
import { green } from '@mui/material/colors';

function Profile() {
  const dispatch = useDispatch();
  const { user, profile } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json',
          },
        })
        .then((res) => {
          dispatch(setProfile(res.data));
        })
        .catch((err) => {
          console.error('Error fetching user info: ', err);
          if (err.response && err.response.status === 401) {
            console.error('Unauthorized - Token may be invalid or expired');
            dispatch(logout());
          }
        });
    }
  }, [user, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!profile) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 2, marginTop: 4 }}>
        <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
          <Avatar
            alt="User"
            src={profile.picture}
            sx={{ width: 100, height: 100, marginBottom: 2, backgroundColor: green[500] }}
          />
          <Typography variant="h5" gutterBottom>
            {profile.name}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            {profile.email}
          </Typography>
        </Box>
        <Button variant="contained" color="primary" onClick={handleLogout} fullWidth>
          Logout
        </Button>
      </Paper>
    </Container>
  );
}

export default Profile;

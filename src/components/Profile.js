import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProfile, logout } from '../store/auth/slice';
import axios from 'axios';

function Profile() {
    const dispatch = useDispatch();
    const { user, profile } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) {
        console.log('User token: ', user.access_token);
        axios
            .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                Accept: 'application/json',
            },
            })
            .then((res) => {
            console.log('User info response: ', res.data);
            dispatch(setProfile(res.data));
            })
            .catch((err) => {
            console.error('Error fetching user info: ', err);
            if (err.response && err.response.status === 401) {
                console.error('Unauthorized - Token may be invalid or expired');
            }
            });
        }
    }, [user, dispatch]);

    const handleLogout = () => {
        dispatch(logout());
    };

    if (!profile) {
        return null;
    }

    return (
        <div>
        <img src={profile.picture} alt="User" />
        <h3>{profile.name}</h3>
        <p>{profile.email}</p>
        <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Profile;
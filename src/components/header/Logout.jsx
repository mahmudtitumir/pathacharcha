import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/authSlice';
import authService from '../../appwrite/auth.services';

function Logout() {
    const dispatch = useDispatch();
    const handleLogout = () => {
        authService.logout().then(() => dispatch(logout()));
    };
    return <div onClick={handleLogout}>Logout</div>;
}

export default Logout;

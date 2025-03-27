import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/authSlice';
import authService from '../../appwrite/auth.services';

function Logout() {
    const dispatch = useDispatch();
    const handleLogout = async () => {
        await authService.logout().then(() => dispatch(logout()));
    };
    return (
        <button
            className="inline-bock px-6 py-2 rounded-full duration-200 hover:bg-blue-100 hover:text-black cursor-pointer"
            onClick={handleLogout}
        >
            Logout
        </button>
    );
}

export default Logout;

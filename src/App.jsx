import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import authService from './appwrite/auth.services';
import { login, logout } from './features/authSlice';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';

function App() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        authService
            .getCurrentUser()
            .then(userData => {
                if (userData) {
                    dispatch(login({ userData }));
                } else {
                    dispatch(logout());
                }
            })
            .catch(error => {
                console.error('Failed to get current user:', error);

                dispatch(logout());
            })
            .finally(() => setLoading(false));
    }, [dispatch]);

    return !loading ? (
        <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
            <div className="w-full block">
                <Header />
                <main>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    ) : null;
}

export default App;

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
            .finally(() => setLoading(false));
    }, []);
    if (loading) return <div>Loading....</div>;

    return (
        <div className="min-h-screen bg-stone-500 text-white text-2xl text-center flex flex-wrap">
            <div className="w-full block">
                <Header />
                <main>{/* <Outlet /> */}</main>
                <Footer />
            </div>
        </div>
    );
}

export default App;

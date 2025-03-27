import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { Container, Logout, Logo } from '..';

function Header() {
    const authStatus = useSelector(state => state.auth.status);
    const navigate = useNavigate();
    const navItems = [
        {
            name: 'Home',
            slug: '/',
            status: true,
        },
        {
            name: 'Login',
            slug: '/login',
            status: !authStatus,
        },
        {
            name: 'Signup',
            slug: '/signup',
            status: !authStatus,
        },
        {
            name: 'All Posts',
            slug: '/all-posts',
            status: authStatus,
        },
        {
            name: 'Add Post',
            slug: '/add-post',
            status: authStatus,
        },
    ];
    return (
        <header className="py-3 shadow bg-gray-500">
            <Container>
                <nav className="flex items-center">
                    <div className="mr-4">
                        <Link to="/">
                            <Logo width="70px" />
                        </Link>
                    </div>
                    <ul className="flex ml-auto">
                        {navItems
                            .filter(item => item.status)
                            .map(item =>
                                item.status ? (
                                    <li key={item.name}>
                                        <button
                                            onClick={() => navigate(item.slug)}
                                            className="inline-bock px-6 py-2 rounded-full duration-200 hover:bg-blue-100 hover:text-black cursor-pointer"
                                        >
                                            {item.name}
                                        </button>
                                    </li>
                                ) : null
                            )}
                        {authStatus && (
                            <li>
                                <Logout />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    );
}

export default Header;

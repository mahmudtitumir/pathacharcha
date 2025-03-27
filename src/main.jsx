import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.css';
import App from './App.jsx';
import store from './store/store.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
    AddPost,
    EditPost,
    GetPosts,
    Home,
    Login,
    Post,
    Signup,
} from './pages/index.js';
import { Protected } from './components';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/login',
                element: (
                    <Protected authentication={false}>
                        <Login />
                    </Protected>
                ),
            },
            {
                path: '/signup',
                element: (
                    <Protected authentication={false}>
                        <Signup />
                    </Protected>
                ),
            },
            {
                path: '/all-posts',
                element: (
                    <Protected authentication>
                        <GetPosts />
                    </Protected>
                ),
            },
            {
                path: '/add-post',
                element: (
                    <Protected authentication>
                        {' '}
                        <AddPost />
                    </Protected>
                ),
            },
            {
                path: '/edit-post/:slug',
                element: (
                    <Protected authentication>
                        {' '}
                        <EditPost />
                    </Protected>
                ),
            },
            {
                path: '/post/:slug',
                element: <Post />,
            },
        ],
    },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>
);

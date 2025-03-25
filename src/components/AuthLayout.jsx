import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Protected = ({ children, authentication = true }) => {
    const navigate = useNavigate();
    const authStatus = useSelector(state => state.auth.status);
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        if (authentication && authentication !== authStatus) {
            navigate('/login');
        } else if (!authentication && authStatus !== authentication) {
            navigate('/');
        }
        setLoader(false);
    }, [authStatus, authentication, navigate]);

    return loader ? <h2>Loading ...</h2> : { children };
};

export default Protected;

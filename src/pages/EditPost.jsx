import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import databaseService from '../appwrite/db.services';
import { Container, PostForm } from '../components';

const EditPost = () => {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if (slug) {
            databaseService.getPost().then(data => {
                if (data) setPost(data);
            });
        } else {
            navigate('/');
        }
    }, [slug, navigate]);
    return post ? (
        <div className="py-8">
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null;
};

export default EditPost;

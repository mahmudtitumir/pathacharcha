import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import databaseService from '../appwrite/db.services';
import { Container, PostCard } from '../components';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const status = useSelector(state => state.auth.status);
    useEffect(() => {
        databaseService.getPosts().then(data => {
            if (data) setPosts(data.documents);
        });
    }, []);
    if (posts.length === 0)
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold">
                                {status
                                    ? 'No posts found. Create your post now!'
                                    : 'Loging to see posts!'}
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map(post => (
                        <div className="p2 w-1/4" key={post.$id}>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default Home;

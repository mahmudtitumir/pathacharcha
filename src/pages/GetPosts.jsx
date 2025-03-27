import React, { useEffect, useState } from 'react';

import databaseService from '../appwrite/db.services';
import { Container, PostCard } from '../components';

const GetPosts = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        databaseService.getPosts().then(data => {
            if (data) setPosts(data.documents);
            console.log(data);
        });
    }, []);
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

export default GetPosts;

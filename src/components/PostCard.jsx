import React from 'react';
import { Link } from 'react-router-dom';

import storageService from '../appwrite/storage.services';

function PostCard({ $id, title, featureIMG }) {
    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-gray-100 rounded-xl p-4">
                <div className="w-full justify-center mb-4">
                    <img
                        className="rounded-xl"
                        alt={title}
                        src={storageService.getFilePreview(featureIMG)}
                    />
                </div>
                <h2 className="text-xl font-bold">{title}</h2>
            </div>
        </Link>
    );
}

export default PostCard;

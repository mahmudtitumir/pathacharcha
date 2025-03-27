import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import RTE from '../RTE';
import { Input, Select, Button } from '../';
import storageService from '../../appwrite/storage.services';
import databaseService from '../../appwrite/db.services';

const PostForm = ({ post }) => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const userData = useSelector(state => state.auth.userData);
    const { register, handleSubmit, watch, setValue, getValues, control } =
        useForm({
            defaultValues: {
                title: post?.title || '',
                slug: post?.slug || '',
                content: post?.content || '',
                status: post?.status || 'Active',
            },
        });

    const submit = async data => {
        setIsSubmitting(true);
        try {
            if (post) {
                // If updating an existing post
                const file = data.image?.[0]
                    ? await storageService.uploadFile(data.image[0])
                    : null;

                if (file) {
                    // Delete the old image if a new one is uploaded
                    await storageService.deleteFile(post.featureIMG);
                }

                // Update the post in the database
                const dbPostCreate = await databaseService.updatePost(
                    post.$id,
                    {
                        ...data,
                        featureIMG: file ? file.$id : undefined,
                    }
                );

                if (dbPostCreate) {
                    navigate(`/post/${dbPostCreate.$id}`);
                }
            } else {
                // If creating a new post
                const file = await storageService.uploadFile(data.image[0]);

                if (file) {
                    const fileId = file.$id;
                    data.featureIMG = fileId; // Assign the uploaded file's ID to featureIMG
                }

                // Log debug information (optional)
                console.log('PostForm :: submit :: file', file);
                console.log('PostForm :: submit :: data', data);
                console.log('PostForm :: submit :: userData', userData);

                // Create the post in the database
                const createPost = await databaseService.createPost({
                    ...data,
                    userId: userData.$id,
                });

                if (createPost) {
                    navigate(`/post/${createPost.$id}`);
                }
            }
        } catch (error) {
            console.error('PostForm :: submit :: error', error);
            // Optionally, show an error message to the user
        } finally {
            setIsSubmitting(false);
        }
    };

    const slugTransform = useCallback(value => {
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
                .replace(/\s+/g, '-') // Replace spaces with -
                .replace(/-+/g, '-'); // Replace multiple - with single -
        }
        return '';
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title')
                setValue('slug', slugTransform(value.title), {
                    shouldValidate: true,
                });
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register('title', { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register('slug', { required: true })}
                    onInput={e => {
                        setValue('slug', slugTransform(e.currentTarget.value), {
                            shouldValidate: true,
                        });
                    }}
                />
                <RTE
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues('content')}
                />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register('image')}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={storageService.getFilePreview(
                                post.featuredIMG
                            )}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    label="Status:"
                    options={['Active', 'Inactive']}
                    className="mb-4"
                    {...register('status', { required: true })}
                />
                <Button
                    type="submit"
                    bgColor={post ? 'bg-green-500' : undefined}
                    className="w-full hover:bg-blue-700 active:bg-blue-800 active:border-2 active:border-green-900"
                >
                    {isSubmitting
                        ? 'Processing...'
                        : post
                        ? 'Update'
                        : 'Submit'}
                </Button>
            </div>
        </form>
    );
};

export default PostForm;

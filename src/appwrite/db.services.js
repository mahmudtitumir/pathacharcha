import { Client, Databases, Query } from 'appwrite';

import config from '../config/config';

class DatabaseService {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(config.appwriteEndpoint)
            .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
    }

    async createPost({ userId, slug, title, content, featuredIMG, status }) {
        try {
            return await this.databases.createDocument(
                config.appwriteDBId,
                config.appwriteCollectionId,
                slug,
                { userId, title, content, featuredIMG, status }
            );
        } catch (error) {
            console.log('DatabaseService :: createPost :: error', error);
            throw error;
        }
    }

    async updatePost(slug, { title, content, featuredIMG, status }) {
        try {
            return this.databases.updateDocument(
                config.appwriteDBId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredIMG,
                    status,
                }
            );
        } catch (error) {
            console.error('DatabaseService :: updatePost :: error', error);
            throw error;
        }
    }

    async deletePost(slug) {
        try {
            this.databases.deleteDocument(
                config.appwriteDBId,
                config.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.error('DatabaseService :: deletePost :: error', error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return this.databases.getDocument(
                config.appwriteDBId,
                config.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.error('DatabaseService :: getPost :: error', error);
            return null;
        }
    }

    async getPosts(queries = [Query.equal('status', 'Active')]) {
        try {
            return this.databases.listDocuments(
                config.appwriteDBId,
                config.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.error('DatabaseService :: getPosts :: error', error);
            return false;
        }
    }
}

const databaseService = new DatabaseService();

export default databaseService;

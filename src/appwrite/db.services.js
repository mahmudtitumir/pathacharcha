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
            console.log(error);
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
            console.log(error);
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
            console.log(error);
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
            console.log(error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal('status', 'true')]) {
        try {
            return this.databases.listDocuments(
                config.appwriteDBId,
                config.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

const databaseService = new DatabaseService();

export default databaseService;

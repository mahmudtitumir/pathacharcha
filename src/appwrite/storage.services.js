import { Client, ID, Storage } from 'appwrite';

import config from '../config/config';

class StorageService {
    client = new Client();
    storages;

    constructor() {
        this.client
            .setEndpoint(config.appwriteEndpoint)
            .setProject(config.appwriteProjectId);
        this.storages = new Storage(this.client);
    }

    async uploadFile(file) {
        try {
            return this.storages.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            this.storages.deleteFile(config.appwriteBucketId, fileId);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.storages.getFilePreview(config.appwriteBucketId, fileId);
    }
}

const storageService = new StorageService();
export default storageService;

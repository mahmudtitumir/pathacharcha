import { Account, Client, ID } from 'appwrite';

import config from '../config/config';
console.log(config);
export class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client
            .setEndpoint(config.appwriteEndpoint)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const user = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );
            if (user) {
                this.login({ email, password });
            } else {
                return user;
            }
        } catch (error) {
            console.log('AuthService :: createAccount :: error', error);
        }
    }
    async login({ email, password }) {
        try {
            await this.account.createEmailPasswordSession(email, password);
            return await this.getCurrentUser();
        } catch (error) {
            console.log('AuthService :: login :: error', error);
        }
    }
    async logout() {
        try {
            await this.account.deleteSession('current');
        } catch (error) {
            console.log('AuthService :: logout :: error', error);
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log('AuthService :: getCurrentUser :: error', error);
            return null;
        }
    }
}

const authService = new AuthService();
export default authService;

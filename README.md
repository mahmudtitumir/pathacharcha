# PathaCharcha

PathaCharcha is a React-based blogging platform built with Vite, Redux Toolkit, and Appwrite. It allows users to create, edit, and manage posts with a rich text editor and image uploads. The platform includes authentication, protected routes, and a responsive UI styled with TailwindCSS.

## Features

-   **Authentication**: User signup, login, and logout functionality using Appwrite.
-   **Post Management**: Create, edit, and delete posts with support for rich text content and featured images.
-   **Protected Routes**: Access control for authenticated and unauthenticated users.
-   **Responsive Design**: Fully responsive UI built with TailwindCSS.
-   **State Management**: Centralized state management using Redux Toolkit.
-   **File Storage**: Image uploads and previews using Appwrite's storage service.
-   **Database Integration**: Post data stored and managed using Appwrite's database service.

## Tech Stack

-   **Frontend**: React, React Router, Redux Toolkit
-   **Backend Services**: Appwrite (Authentication, Database, Storage)
-   **Styling**: TailwindCSS
-   **Build Tool**: Vite

## Getting Started

1. Clone the repository:

    ```sh
    git clone <repository-url>
    cd pathacharcha
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Configure environment variables:

    - Create a .env file in the root directory.
    - Add the following variables:
        ```
        VITE_APPWRITE_ENDPOINT=<your-appwrite-endpoint>
        VITE_APPWRITE_PROJECT_ID=<your-appwrite-project-id>
        VITE_APPWRITE_DB_ID=<your-database-id>
        VITE_APPWRITE_COLLECTION_ID=<your-collection-id>
        VITE_APPWRITE_BUCKET_ID=<your-bucket-id>
        VITE_TINYMCE_API_KEY=<your-tinymce-api-key>
        ```

4. Start the development server:

    ```sh
    npm run dev
    ```

5. Open the app in your browser at `http://localhost:5173`.

## Scripts

-   `npm run dev`: Start the development server.
-   `npm run build`: Build the project for production.
-   `npm run preview`: Preview the production build.
-   `npm run lint`: Run ESLint to check for code quality issues.

## Folder Structure

-   **`src/components`**: Reusable React components (e.g., Header, Footer, PostForm).
-   **`src/pages`**: Page components for routing (e.g., Home, Login, Signup).
-   **`src/appwrite`**: Appwrite service integrations for authentication, database, and storage.
-   **`src/features`**: Redux slices for state management.
-   **`src/store`**: Redux store configuration.
-   **`src/config`**: Configuration files for environment variables.

## License

This project is licensed under the MIT License.

---

Feel free to modify this description to better suit your needs! 5. Open the app in your browser at `http://localhost:5173`.

## Scripts

-   `npm run dev`: Start the development server.
-   `npm run build`: Build the project for production.
-   `npm run preview`: Preview the production build.
-   `npm run lint`: Run ESLint to check for code quality issues.

## Folder Structure

-   **`src/components`**: Reusable React components (e.g., Header, Footer, PostForm).
-   **`src/pages`**: Page components for routing (e.g., Home, Login, Signup).
-   **`src/appwrite`**: Appwrite service integrations for authentication, database, and storage.
-   **`src/features`**: Redux slices for state management.
-   **`src/store`**: Redux store configuration.
-   **`src/config`**: Configuration files for environment variables.

## License

This project is licensed under the MIT License.

---

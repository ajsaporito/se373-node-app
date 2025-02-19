# NodeJS, Express, MongoDB, & Handlebars Application

## Overview

A simple NodeJS application for my Advanced Open Source Web Development class at NEIT. Once logged in, users can perform CRUD operations on a collection of employees.

## Setup

1. **Clone the Repository:**

    ```sh
    git clone https://github.com/ajsaporito/se373-node-app.git
    ```

2. **Set Up Your Web Server:**

    - Install an up to date version of NodeJS on your machine and install the dependencies:

    ```sh
    npm install
    ```

3. **Configure the Database:**

    - Create a `.env` file at the root of the directory and add the connection string and secret:

   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/<database-name>?retryWrites=true&w=majority
   SESSION_SECRET=<your-secret-here>
   ```

4. **Run the Application:**

    - Start your web server and navigate to `http://localhost:3000` in your web browser.

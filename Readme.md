
# QuizApi

A robust Express API with TypeScript, MongoDB, and MySQL support.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/erickchavez/quizApi.git
    cd quizApi
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Set up environment variables:
    Create a  file in the root directory and add the necessary environment variables. Refer to the Environment Variables section for more details.

## Usage

### Development

To start the development server with hot-reloading:

```sh
npm run dev
````

Production
To build and start the production server:

```sh
npm run build
npm run start:prod
```

## Scripts

`npm run start`: Starts the development server with hot-reloading.
`npm run build`: Compiles TypeScript to JavaScript.
`npm run clean`: Removes the dist directory.
`npm run dev`: Starts the development server with hot-reloading using ts-node.
`npm run deploy`: Builds the project and starts the production server.
`npm run lint`: Runs ESLint to check for linting errors.
`npm run format`: Runs Prettier to format the code.
`npm run start:prod`: Starts the production server using the compiled JavaScript files.

## Environment Variables

The following environment variables are required:

`PORT`: The port on which the server will run.
`MONGO_URI`: The connection string for MongoDB.  
`MYSQL_HOST`: The host for MySQL.  
`MYSQL_USER`: The user for MySQL.
`MYSQL_PASSWORD`: The password for MySQL.
`MYSQL_DATABASE`: The database name for MySQL.
`JWT_SECRET`: The secret key for JWT authentication.

## Example .env file:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/quizApi
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=password
MYSQL_DATABASE=quizApi
JWT_SECRET=your_jwt_secret
```

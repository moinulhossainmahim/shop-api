# Features

### 1. Role-Based Access Management

- **Customer Privileges**: Shoppers with basic access to browse and make purchases.
- **Admin Role**: Administrators have full control over the platform.

### 2. User Identity and Authentication Flow

- **User Registration**: Enable customers to create accounts.
- **User Authentication**: Implement JWT-based authentication mechanisms to secure user sessions.
- **User Profiles**: Enable users to view and update their profiles.

### 3. Order Management

- **Order Workflow Management**: Handle the entire order lifecycle, from creation to status updates and maintaining order history.
- **Payment Gateway Integration**: Integrate with stripe payment gateway for seamless transactions.

### 4. Product Management

- **Products**: Create, update, and delete products.
- **Categories and Sub Categories**: Organize products into categories and sub categories for easy finding.
- **Inventory Control**: Keep track of product availability and stock levels.

### 5. Shopping Cart and Seamless Checkout

- **Shopping Cart**: Allow users to effortlessly add, remove, and update products in their carts.
- **Checkout**: Optimize the checkout process, ensuring swift and secure transactions.

### 6. Security

- **JWT Tokenization**: Implement robust JSON Web Token mechanisms to fortify authentication.


## Architecture
  <p align="center">
    <img width="40%" height="25%" src="https://github.com/moinulhossainmahim/shop-api/blob/main/screenshots/nest-architecture.png" />
  </p>
  <p align="center">
  <b>NestJS Architecture</b>
  </p>

  <p align="center">
    <img width="40%" height="25%" src="https://github.com/moinulhossainmahim/shop-api/blob/main/screenshots/initial-er.png" />
  </p>
  <p align="center">
  <b>ER Diagram</b>
  </p>

## Built With 🛠
- [NestJS](https://docs.nestjs.com) - A progressive Node.js framework for building scalable and efficient server-side applications.
- [TypeScript](https://www.typescriptlang.org/docs) - A superset of JavaScript that brings static typing to the language, enhancing code maintainability and developer productivity.
- [TypeORM (Object-Relational Mapping)](https://typeorm.io) - A powerful and flexible ORM that simplifies database interactions in TypeScript applications.
- [MySQL](https://www.mysql.com) - A popular relational database management system used for efficient and structured data storage.
- [Passport.js](https://www.passportjs.org) - A flexible authentication middleware for Node.js applications, facilitating user authentication strategies.
- [JWT](https://jwt.io/) - A secure and compact method for token-based authentication, enhancing the security of user sessions.
- [Bcrypt](https://bcrypt.online/) - A library for hashing passwords, enhancing security by securely storing user credentials.
- [Swagger](https://swagger.io) - A tool for documenting and testing APIs, providing a user-friendly interface for developers to explore endpoints.
- [Stripe](https://stripe.com) - A widely-used platform for handling online payments securely and efficiently.

## Development Tools
- **NestJS CLI**: Command-line tools for scaffolding and managing NestJS projects.
- **ESLint (Code Linter):**: A linting tool for identifying and fixing common programming errors and stylistic issues.
- **Prettier**: A code formatting tool to maintain consistent and readable code across the project.

## Requirements

- [Node](https://nodejs.org/en) (Version 18.18.0 or higher)
- [NPM](https://www.npmjs.com/) (The Node.js package manager. Installed with Node.js)
- [Mysql](https://www.mysql.com): (latest)

# How to run the project

  ### Clone the repository
  - Clone this repository and cd into the project directory:
    ```bash
    git clone https://github.com/moinulhossainmahim/shop-api.git
    cd shop-api
    ```
  ### Update Environment Variables
  - Replace `env.example` file to `.env`
  - Create Account in stripe and save stripe keys.
  - Update env environment variables
    ```bash
      MYSQL_ROOT_PASSWORD = "YOUR MYSQL DATABASE ROOT PASSWORD" 
      MYSQL_DATABASE = "YOUR MYSQL DATABASE" 
      DB_HOST = "YOUR MYSQL DATABASE HOST" 
      DB_PORT = "YOUR MYSQL DATABASE PORT" 
      DB_USERNAME = "YOUR MYSQL DATABASE USER NAME" 
      DB_PASSWORD = "YOUR MYSQL DATABASE PASSWORD"
      DB_NAME = "YOUR MYSQL DATABASE NAME"
      JWT_SECRET = "YOUR JWT SECRET"
      NODE_ENV = "development" 
      STRIPE_SECRET_KEY = "YOUR STRIPE SECRET KEY" 
      STRIPE_CURRENCY = "THE CURRENCY OF STRIPE PAYMENT"
    ```
  
  ## Manually

  ### Install Dependencies
  - Run `npm install` inside the main project folder to install all dependencies from NPM.

  ### Create a MySql Database
  - Create A Mysql Database and replace database connection variables in `.env` file.

  ### Start the application
  - 
    ```bash
      npm run start:dev
    ```
  ### For running database migrations
  -
    ```bash
      npm run migration:generate ./src/migration/[MIGRATION_TITLE]
      npm run migration:run
    ```
  ## Using Docker
  - **Install Docker First**

  - Check the official [Docker](https://docs.docker.com/engine/install) documentation for information how to install Docker on your operating system. And then install Docker and supporting tools.

  - Build the docker images
    ```bash
    docker-compose build
    ```
  - Start the containers
    ```bash
    docker-compose up
    ```
  - **If everyting setup correctly and your containers are running then you will get the application running in [localhost:3000](http://localhost:3000)**

  - **Update port mappings in `docker-compose.yml` file if you want to run in different port**

# API Documentation

### Authentication
<details>
  
<summary> <code>GET </code> <code>/auth/signin</code></summary>

### Curl

    curl -X 'GET' \ 'http://localhost:3000/auth/signin \ 
    -H 'accept: application/json'
    -H 'Content-Type: application/json' \
    -d '{
      "email": "moinulhossain@gmail.com",
      "password": "Moinulpassword123",
    }'
### Request URL

    http://localhost:3000/auth/signin

### Response
```
{
  "success": true,
  "content": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTW9pbnVsIEhvc3NhaW4iLCJ1c2VySWQiOiJiNWM3OGQ0Zi1hMWQzLTQ5MDktOWEzYi03ZjM1NDk2YTU1M2YiLCJpYXQiOjE3MDQ3MTUzMTYsImV4cCI6MTcwNDcxODkxNn0.aEOVyViMFnlp0MZVjBMFiV9BiBN9yBj_-1JLmeh3bKk"
  },
  "message": "sign in successfully"
}
```   
</details>

<details>

<summary> <code>POST</code> <code>/auth/signup</code></summary>

### Curl

```
  curl -X 'POST' \
  'http://localhost:3000/auth/signup' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
     "fullName": "Moinul Hossain",
    "password": "Mahim123@",
    "email": "moinulhossainmahim@gmail.com",
    "contact": "01732748262"
  }'
``` 

### Request URL

    http://localhost:3000/auth/signup


### Response
```
{
  "success": true,
  "content": [],
  "message": "sign up successfully"
}

```   
</details>

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

  ## For running database migrations
  -
    ```bash
      npm run migration:generate ./src/migration/[MIGRATION_TITLE]
      npm run migration:run
    ```

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

<details>

<summary> <code>POST</code> <code>/auth/google/signin</code></summary>

### Curl

```
  curl -X 'POST' \
  'http://localhost:3000/auth/google/signin' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
     "code": "code from google auth"
  }'
``` 

### Request URL

    http://localhost:3000/auth/google/signin


### Response
```
{
  "success": true,
  "content": [],
  "message": "sign in successfully"
}

```   
</details>

### User
<details>
  
<summary> <code>GET </code> <code>/users</code></summary>

### Curl

    curl -X 'GET' \ 'http://localhost:3000/users \ 
    -H 'accept: application/json'
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTW9pbnVsIEhvc3NhaW4iLCJ1c2VySWQiOiJiNWM3OGQ0Zi1hMWQzLTQ5MDktOWEzYi03ZjM1NDk2YTU1M2YiLCJpYXQiOjE3MDQ3MTUzMTYsImV4cCI6MTcwNDcxODkxNn0.aEOVyViMFnlp0MZVjBMFiV9BiBN9yBj_-1JLmeh3bKk'

### Request URL

    http://localhost:3000/users

### Response
```
{
  "success": true,
    "content": [
        {
            "id": "b5c78d4f-a1d3-4909-9a3b-7f35496a553f",
            "fullName": "Moinul Hossain",
            "avatar": "",
            "email": "moinulhossainmahim@gmail.com",
            "userType": "admin",
            "status": "active",
            "address": []
        }
    ],
    "meta": {},
    "message": "Fetched users successfully"
}
```
**User need to be admin to access this endpoint**
</details>

<details>
  
<summary> <code>GET </code> <code>/users/profile</code></summary>

### Curl

    curl -X 'GET' \ 'http://localhost:3000/users/profile \ 
    -H 'accept: application/json'
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTW9pbnVsIEhvc3NhaW4iLCJ1c2VySWQiOiJiNWM3OGQ0Zi1hMWQzLTQ5MDktOWEzYi03ZjM1NDk2YTU1M2YiLCJpYXQiOjE3MDQ3MTUzMTYsImV4cCI6MTcwNDcxODkxNn0.aEOVyViMFnlp0MZVjBMFiV9BiBN9yBj_-1JLmeh3bKk'

### Request URL

    http://localhost:3000/users/profile

### Response
```
{
  "success": true,
  "content": {
      "id": "b5c78d4f-a1d3-4909-9a3b-7f35496a553f",
      "fullName": "Moinul Hossain",
      "avatar": "",
      "email": "moinulhossainmahim@gmail.com",
      "contact": "01732748262",
      "userType": "admin",
      "status": "active",
      "address": []
  },
  "message": "Fetched user successfully"
}
```
</details>

<details>
  
<summary> <code>PATCH </code> <code>/users/{userId}/update-password</code></summary>

### Curl

    curl -X 'GET' \ 'http://localhost:3000/users/b5c78d4f-a1d3-4909-9a3b-7f35496a553f/update-password \ 
    -H 'accept: application/json'
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTW9pbnVsIEhvc3NhaW4iLCJ1c2VySWQiOiJiNWM3OGQ0Zi1hMWQzLTQ5MDktOWEzYi03ZjM1NDk2YTU1M2YiLCJpYXQiOjE3MDQ3MTUzMTYsImV4cCI6MTcwNDcxODkxNn0.aEOVyViMFnlp0MZVjBMFiV9BiBN9yBj_-1JLmeh3bKk'
    -d '{
      "oldPassword": "Hellomahim123@",
      "newPassword": "Hellomahim12@"
    }'

### Request URL

    http://localhost:3000/users/{userId}/update-password

### Response
```
{
  "data": [],
  "message": "Password updated successfully",
  "success": true
}
```
</details>

<details>
  
<summary> <code>PATCH </code> <code>/users/{userId}</code></summary>

### Curl

    curl -X 'GET' \ 'http://localhost:3000/users/b5c78d4f-a1d3-4909-9a3b-7f35496a553f \ 
    -H 'accept: application/json'
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTW9pbnVsIEhvc3NhaW4iLCJ1c2VySWQiOiJiNWM3OGQ0Zi1hMWQzLTQ5MDktOWEzYi03ZjM1NDk2YTU1M2YiLCJpYXQiOjE3MDQ3MTUzMTYsImV4cCI6MTcwNDcxODkxNn0.aEOVyViMFnlp0MZVjBMFiV9BiBN9yBj_-1JLmeh3bKk'
    -d '{
      "avatar": Image,
      "contact": "019827373661",
      "email": "test@gmail.com",
      "fullName": "Test name"
    }'

### Request URL

    http://localhost:3000/users/{userId}

### Response
```
{
 "success": true,
  "content": {
      "id": "b5c78d4f-a1d3-4909-9a3b-7f35496a553f",
      "fullName": "Moinul Hossain",
      "avatar": "",
      "email": "moinulhossainmahim@gmail.com",
      "contact": "01732748262",
      "userType": "admin",
      "status": "active",
      "address": []
  },
  "message": "Updated user successfully"
}
```
</details>

### Category

<details>
  
<summary> <code>POST </code> <code>/categories</code></summary>

### Curl

    curl -X 'POST' \ 'http://localhost:3000/categories \ 
    -H 'accept: application/json'
    -H 'Content-Type: application/json'
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTW9pbnVsIEhvc3NhaW4iLCJ1c2VySWQiOiJiNWM3OGQ0Zi1hMWQzLTQ5MDktOWEzYi03ZjM1NDk2YTU1M2YiLCJpYXQiOjE3MDQ3MTUzMTYsImV4cCI6MTcwNDcxODkxNn0.aEOVyViMFnlp0MZVjBMFiV9BiBN9yBj_-1JLmeh3bKk'
    -d '{
      "file": Img,
      "name": "Fruits and Vegetables",
      "description": "Category for fruits and vegetables items",
      "slug": "fruits-and-vegetables"
    }'

### Request URL

    http://localhost:3000/categories

### Response
```
{
   "success": true,
  "content": {
      "name": "Fruits and Vegetables",
      "slug": "fruits-and-vegetables",
      "description": "This category is for fruits and vegetables",
      "icon": "http://localhost:3000/categories/pictures/apple_1704722889181.png",
      "id": "365079f8-ae27-40da-9669-b0a5b956cc4d"
  },
  "message": "Category created successfully"
}
```
</details>

<details>
  
<summary> <code>GET </code> <code>/categories</code></summary>

### Curl

    curl -X 'GET' \ 'http://localhost:3000/categories \ 
    -H 'accept: application/json'

### Request URL

    http://localhost:3000/categories

### Response
```
{
  "success": true,
  "content": [
      {
          "id": "365079f8-ae27-40da-9669-b0a5b956cc4d",
          "name": "Fruits and Vegetables",
          "slug": "fruits-and-vegetables",
          "description": "This category is for fruits and vegetables",
          "icon": "http://localhost:3000/categories/pictures/apple_1704722889181.png",
          "subCategories": []
      }
  ],
  "meta": {},
  "message": "Fetched categories successfully"
}
```
</details>

<details>
  
<summary> <code>GET </code> <code>/categories/{categoryId}</code></summary>

### Curl

    curl -X 'GET' \ 'http://localhost:3000/categories/42fc242a-b020-45d0-82e7-c5e37f3a759d \ 
    -H 'accept: application/json'

### Request URL

    http://localhost:3000/categories/42fc242a-b020-45d0-82e7-c5e37f3a759d

### Response
```
{
  "success": true,
  "content": {
      "id": "365079f8-ae27-40da-9669-b0a5b956cc4d",
      "name": "Fruits and Vegetables",
      "slug": "fruits-and-vegetables",
      "description": "This category is for fruits and vegetables",
      "icon": "http://localhost:3000/categories/pictures/apple_1704722889181.png"
  },
  "message": "Fetched category successfully"
}
```
</details>

<details>
  
<summary> <code>PATCH </code> <code>/categories/{categoryId}</code></summary>

### Curl

    curl -X 'PATCH' \ 'http://localhost:3000/categories/42fc242a-b020-45d0-82e7-c5e37f3a759d \ 
    -H 'accept: application/json'
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTW9pbnVsIEhvc3NhaW4iLCJ1c2VySWQiOiJiNWM3OGQ0Zi1hMWQzLTQ5MDktOWEzYi03ZjM1NDk2YTU1M2YiLCJpYXQiOjE3MDQ3MTUzMTYsImV4cCI6MTcwNDcxODkxNn0.aEOVyViMFnlp0MZVjBMFiV9BiBN9yBj_-1JLmeh3bKk'
    -d '{
      "name": "Fruits and vegetables",
      "slug": "fruits-and-vegetables",
      "description": "This category is for fruits and vegetables item.",
      "icon": Image,
    }'

### Request URL

    http://localhost:3000/categories/42fc242a-b020-45d0-82e7-c5e37f3a759d

### Response
```
{
 "success": true,
  "content": {
      "id": "365079f8-ae27-40da-9669-b0a5b956cc4d",
      "name": "Fruits and Vegetables",
      "slug": "fruits-and-vegetables",
      "description": "This category is for fruits and vegetables",
      "icon": "http://localhost:3000/categories/pictures/apple_1704722889181.png"
  },
  "message": "Category updated successfully"
}
```
</details>

<details>
  
<summary> <code>DELETE </code> <code>/categories/{categoryId}</code></summary>

### Curl

    curl -X 'DELETE' \ 'http://localhost:3000/categories/42fc242a-b020-45d0-82e7-c5e37f3a759d \ 
    -H 'accept: application/json'
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTW9pbnVsIEhvc3NhaW4iLCJ1c2VySWQiOiJiNWM3OGQ0Zi1hMWQzLTQ5MDktOWEzYi03ZjM1NDk2YTU1M2YiLCJpYXQiOjE3MDQ3MTUzMTYsImV4cCI6MTcwNDcxODkxNn0.aEOVyViMFnlp0MZVjBMFiV9BiBN9yBj_-1JLmeh3bKk'

### Request URL

    http://localhost:3000/categories/42fc242a-b020-45d0-82e7-c5e37f3a759d

### Response
```
{
  "success": true,
  "content": [],
  "message": "Delete category successfully"
}
```
</details>

### Sub Category

<details>
  
<summary> <code>POST </code> <code>/sub-categories</code></summary>

### Curl

    curl -X 'POST' \ 'http://localhost:3000/sub-categories \ 
    -H 'accept: application/json'
    -H 'Content-Type: application/json'
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTW9pbnVsIEhvc3NhaW4iLCJ1c2VySWQiOiJiNWM3OGQ0Zi1hMWQzLTQ5MDktOWEzYi03ZjM1NDk2YTU1M2YiLCJpYXQiOjE3MDQ3MTUzMTYsImV4cCI6MTcwNDcxODkxNn0.aEOVyViMFnlp0MZVjBMFiV9BiBN9yBj_-1JLmeh3bKk'
    -d '{
      "name": "Fruits",
      "description": "This is for fruits sub category",
      "slug": "fruits",
      "categoryId": "365079f8-ae27-40da-9669-b0a5b956cc4d"
    }'

### Request URL

    http://localhost:3000/sub-categories

### Response
```
{
  "success": true,
  "content": [
      {
          "name": "Fruits",
          "description": "This is for fruits sub category",
          "slug": "fruits",
          "id": "f2e547e6-86cc-407e-8b68-482767c75f49"
      }
  ],
  "message": "Sub category created successfully"
}
```
</details>

<details>
  
<summary> <code>GET </code> <code>/sub-categories</code></summary>

### Curl

    curl -X 'GET' \ 'http://localhost:3000/sub-categories \ 
    -H 'accept: application/json'

### Request URL

    http://localhost:3000/sub-categories

### Response
```
{
  "success": true,
  "content": [
      {
          "id": "f2e547e6-86cc-407e-8b68-482767c75f49",
          "name": "Fruits",
          "description": "This is for fruits sub category",
          "slug": "fruits",
          "category": {
              "id": "365079f8-ae27-40da-9669-b0a5b956cc4d",
              "name": "Fruits and Vegetables",
              "slug": "fruits-and-vegetables",
              "description": "This category is for fruits and vegetables item.",
              "icon": "http://localhost:3000/categories/pictures/apple_1704722889181.png"
          }
      }
  ],
  "meta": {},
  "message": "Fetched sub categories successfully"
}
```
</details>

<details>
  
<summary> <code>PATCH </code> <code>/sub-categories/{subCategoryId}</code></summary>

### Curl

    curl -X 'PATCH' \ 'http://localhost:3000/sub-categories/42fc242a-b020-45d0-82e7-c5e37f3a759d \ 
    -H 'accept: application/json'
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTW9pbnVsIEhvc3NhaW4iLCJ1c2VySWQiOiJiNWM3OGQ0Zi1hMWQzLTQ5MDktOWEzYi03ZjM1NDk2YTU1M2YiLCJpYXQiOjE3MDQ3MTUzMTYsImV4cCI6MTcwNDcxODkxNn0.aEOVyViMFnlp0MZVjBMFiV9BiBN9yBj_-1JLmeh3bKk'
    -d '{
      "name": "Update sub category",
      "description": "Fruits sub cat",
      "slug": "fruits-sub-cat",
      "categoryId": "365079f8-ae27-40da-9669-b0a5b956cc4d"
    }'

### Request URL

    http://localhost:3000/sub-categories/42fc242a-b020-45d0-82e7-c5e37f3a759d

### Response
```
{
  "success": true,
  "content": {
      "name": "Update sub category",
      "description": "Fruits sub cat",
      "slug": "fruits-sub-cat",
      "categoryId": "365079f8-ae27-40da-9669-b0a5b956cc4d"
  },
  "message": "sub category updated successfully"
}
```
</details>

<details>
  
<summary> <code>DELETE </code> <code>/sub-categories/{categoryId}</code></summary>

### Curl

    curl -X 'DELETE' \ 'http://localhost:3000/sub-categories/42fc242a-b020-45d0-82e7-c5e37f3a759d \ 
    -H 'accept: application/json'
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTW9pbnVsIEhvc3NhaW4iLCJ1c2VySWQiOiJiNWM3OGQ0Zi1hMWQzLTQ5MDktOWEzYi03ZjM1NDk2YTU1M2YiLCJpYXQiOjE3MDQ3MTUzMTYsImV4cCI6MTcwNDcxODkxNn0.aEOVyViMFnlp0MZVjBMFiV9BiBN9yBj_-1JLmeh3bKk'

### Request URL

    http://localhost:3000/sub-categories/42fc242a-b020-45d0-82e7-c5e37f3a759d

### Response
```
{
  "success": true,
  "content": [],
  "message": "Delete sub category successfully"
}
```
</details>

### Wishlist

<details>
  
<summary> <code>POST </code> <code>/wishlists/{productId}</code></summary>

### Curl

    curl -X 'POST' \ 'http://localhost:3000/wishlists/365079f8-ae27-40da-9669-b0a5b956cc4d \ 
    -H 'accept: application/json'
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTW9pbnVsIEhvc3NhaW4iLCJ1c2VySWQiOiJiNWM3OGQ0Zi1hMWQzLTQ5MDktOWEzYi03ZjM1NDk2YTU1M2YiLCJpYXQiOjE3MDQ3MTUzMTYsImV4cCI6MTcwNDcxODkxNn0.aEOVyViMFnlp0MZVjBMFiV9BiBN9yBj_-1JLmeh3bKk'

### Request URL

    http://localhost:3000/wishlists/365079f8-ae27-40da-9669-b0a5b956cc4d

### Response
```
{
  "success": true,
  "content": [],
  "message": "Added to wishlist successfully"
}
```
</details>

<details>
  
<summary> <code>GET </code> <code>/wishlists</code></summary>

### Curl

    curl -X 'GET' \ 'http://localhost:3000/wishlists \ 
    -H 'accept: application/json'
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTW9pbnVsIEhvc3NhaW4iLCJ1c2VySWQiOiJiNWM3OGQ0Zi1hMWQzLTQ5MDktOWEzYi03ZjM1NDk2YTU1M2YiLCJpYXQiOjE3MDQ3MTUzMTYsImV4cCI6MTcwNDcxODkxNn0.aEOVyViMFnlp0MZVjBMFiV9BiBN9yBj_-1JLmeh3bKk'

### Request URL

    http://localhost:3000/wishlists

### Response
```
{
  "success": true,
  "content": [
    {
      "id": "365079f8-ae27-40da-9669-b0a5b956cc4d",
      "product": {
        "id": "365079f8-ae27-40da-9669-b0a5b956cc4d",
      }
    }
  ],
  "meta": {
      "page": 1,
      "take": 10,
      "itemCount": 1,
      "pageCount": 1,
      "hasPreviousPage": false,
      "hasNextPage": false
  },
  "message": "Fetched wishlists successfully"
}
```
</details>

<details>
  
<summary> <code>DELETE </code> <code>/wishlists/{wishlistId}</code></summary>

### Curl

    curl -X 'DELETE' \ 'http://localhost:3000/wishlists/42fc242a-b020-45d0-82e7-c5e37f3a759d \ 
    -H 'accept: application/json'
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTW9pbnVsIEhvc3NhaW4iLCJ1c2VySWQiOiJiNWM3OGQ0Zi1hMWQzLTQ5MDktOWEzYi03ZjM1NDk2YTU1M2YiLCJpYXQiOjE3MDQ3MTUzMTYsImV4cCI6MTcwNDcxODkxNn0.aEOVyViMFnlp0MZVjBMFiV9BiBN9yBj_-1JLmeh3bKk'

### Request URL

    http://localhost:3000/wishlists/42fc242a-b020-45d0-82e7-c5e37f3a759d

### Response
```
{
  "success": true,
  "content": [],
  "message": "Wishlist removed successfully"
}
```
</details>

### Address

<details>
  
<summary> <code>POST </code> <code>/address</code></summary>

### Curl

    curl -X 'POST' \ 'http://localhost:3000/address \ 
    -H 'accept: application/json'
    -H 'Content-Type: application/json'
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTW9pbnVsIEhvc3NhaW4iLCJ1c2VySWQiOiJiNWM3OGQ0Zi1hMWQzLTQ5MDktOWEzYi03ZjM1NDk2YTU1M2YiLCJpYXQiOjE3MDQ3MTUzMTYsImV4cCI6MTcwNDcxODkxNn0.aEOVyViMFnlp0MZVjBMFiV9BiBN9yBj_-1JLmeh3bKk'
    -d '{
      "title": "test",
      "country": "test country",
      "city": "test city",
      "zip": "test zip",
      "state": "test state",
      "streetAddress": "test streetAdress",
      "addressType": "shipping"
    }'

### Request URL

    http://localhost:3000/address

### Response
```
{
  "success": true,
  "content": {
      "title": "test",
      "country": "test country",
      "city": "test city",
      "state": "test state",
      "zip": "test zip",
      "streetAddress": "test streetAdress",
      "addressType": "shipping",
      "id": "40c1b9bf-e248-40b9-8a81-53971285b449",
      "isActive": true
    },
    "message": "Address added successfully"
}
```
</details>

<details>
  
<summary> <code>GET </code> <code>/address</code></summary>

### Curl

    curl -X 'GET' \ 'http://localhost:3000/address \ 
    -H 'accept: application/json'
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTW9pbnVsIEhvc3NhaW4iLCJ1c2VySWQiOiJiNWM3OGQ0Zi1hMWQzLTQ5MDktOWEzYi03ZjM1NDk2YTU1M2YiLCJpYXQiOjE3MDQ3MTUzMTYsImV4cCI6MTcwNDcxODkxNn0.aEOVyViMFnlp0MZVjBMFiV9BiBN9yBj_-1JLmeh3bKk'

### Request URL

    http://localhost:3000/address

### Response
```
{
 "success": true,
  "content": [
    {
        "id": "40c1b9bf-e248-40b9-8a81-53971285b449",
        "title": "test",
        "country": "test country",
        "city": "test city",
        "state": "test state",
        "zip": "test zip",
        "streetAddress": "test streetAdress",
        "addressType": "shipping",
        "isActive": true
    }
  ],
  "meta": {},
  "message": "Fetched addresses successfully"
}
```
</details>

<details>
  
<summary> <code>PATCH </code> <code>/address/{addressId}</code></summary>

### Curl

    curl -X 'PATCH' \ 'http://localhost:3000/address/42fc242a-b020-45d0-82e7-c5e37f3a759d \ 
    -H 'accept: application/json'
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTW9pbnVsIEhvc3NhaW4iLCJ1c2VySWQiOiJiNWM3OGQ0Zi1hMWQzLTQ5MDktOWEzYi03ZjM1NDk2YTU1M2YiLCJpYXQiOjE3MDQ3MTUzMTYsImV4cCI6MTcwNDcxODkxNn0.aEOVyViMFnlp0MZVjBMFiV9BiBN9yBj_-1JLmeh3bKk'
    -d '{
       "addressType": "billing"
    }'

### Request URL

    http://localhost:3000/address/42fc242a-b020-45d0-82e7-c5e37f3a759d

### Response
```
{
  "success": true,
  "content": {
    "id": "40c1b9bf-e248-40b9-8a81-53971285b449",
    "title": "test",
    "country": "test country",
    "city": "test city",
    "state": "test state",
    "zip": "test zip",
    "streetAddress": "test streetAdress",
    "addressType": "billing",
    "isActive": true
  },
  "message": "Address updated successfully"
}
```
</details>

<details>
  
<summary> <code>DELETE </code> <code>/address/{addressId}</code></summary>

### Curl

    curl -X 'DELETE' \ 'http://localhost:3000/address/42fc242a-b020-45d0-82e7-c5e37f3a759d \
    -H 'accept: application/json' \
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTW9pbnVsIEhvc3NhaW4iLCJ1c2VySWQiOiJiNWM3OGQ0Zi1hMWQzLTQ5MDktOWEzYi03ZjM1NDk2YTU1M2YiLCJpYXQiOjE3MDQ3MTUzMTYsImV4cCI6MTcwNDcxODkxNn0.aEOVyViMFnlp0MZVjBMFiV9BiBN9yBj_-1JLmeh3bKk'

### Request URL

    http://localhost:3000/address/42fc242a-b020-45d0-82e7-c5e37f3a759d

### Response
```
{
  "success": true,
  "content": [],
  "message": "Address Deleted successfully"
}
```
</details>

### Products

<details>
  
<summary> <code>POST </code> <code>/products</code></summary>

### Curl

    curl -X 'POST' \ 'http://localhost:3000/products \ 
    -H 'accept: application/json'
    -H 'Content-Type: application/json'
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTW9pbnVsIEhvc3NhaW4iLCJ1c2VySWQiOiJiNWM3OGQ0Zi1hMWQzLTQ5MDktOWEzYi03ZjM1NDk2YTU1M2YiLCJpYXQiOjE3MDQ3MTUzMTYsImV4cCI6MTcwNDcxODkxNn0.aEOVyViMFnlp0MZVjBMFiV9BiBN9yBj_-1JLmeh3bKk'
    -d '{
      "name": "Apples",
        "desc": "An apple is a sweet, edible fruit produced by an apple tree (Malus domestica). Apple trees are ... The skin of ripe apples is generally red, yellow, green, pink, or russetted, though many bi- or tri-colored cultivars may be found.",
        "status": "PUBLISHED",
        "unit": "kg",
        "price": 2,
        "salePrice": 1.6,
        "quantity": 300,
        "sku": "20240108-P01",
        "slug": "apples",
        "images": Image[],
        "categoryId": "365079f8-ae27-40da-9669-b0a5b956cc4d",
        "subCategoryId": "365079f8-ae27-40da-9669-b0a5b956cc4d"
    }'

### Request URL

    http://localhost:3000/products

### Response
```
{
   "success": true,
  "content": {
    "name": "Apples",
    "desc": "An apple is a sweet, edible fruit produced by an apple tree (Malus domestica). Apple trees are ... The skin of ripe apples is generally red, yellow, green, pink, or russetted, though many bi- or tri-colored cultivars may be found.",
    "status": "PUBLISHED",
    "unit": "kg",
    "price": 2,
    "salePrice": 1.6,
    "quantity": 300,
    "sku": "20240108-P01",
    "slug": "apples",
    "featuredImg": "http://localhost:3000/products/pictures/apple-1_1704734677462.webp",
    "galleryImg": [
        "http://localhost:3000/products/pictures/apple-2_1704734677463.webp",
        "http://localhost:3000/products/pictures/apple_1704734677463.webp"
    ],
    "id": "64eb19a5-9379-4c20-b18f-dcf1f193c230",
    "createdAt": "2024-01-08T17:24:37.485Z"
  },
  "message": "Product created successfully"
}
```
</details>

<details>
  
<summary> <code>GET </code> <code>/products</code></summary>

### Curl

    curl -X 'GET' \ 'http://localhost:3000/products \ 
    -H 'accept: application/json'

### Request URL

    http://localhost:3000/products

### Response
```
{
    "success": true,
    "content": [
        {
            "id": "64eb19a5-9379-4c20-b18f-dcf1f193c230",
            "createdAt": "2024-01-08T17:24:37.485Z",
            "name": "Apples",
            "desc": "An apple is a sweet, edible fruit produced by an apple tree (Malus domestica). Apple trees are ... The skin of ripe apples is generally red, yellow, green, pink, or russetted, though many bi- or tri-colored cultivars may be found.",
            "status": "PUBLISHED",
            "featuredImg": "http://localhost:3000/products/pictures/apple-1_1704734677462.webp",
            "galleryImg": [
                "http://localhost:3000/products/pictures/apple-2_1704734677463.webp",
                "http://localhost:3000/products/pictures/apple_1704734677463.webp"
            ],
            "unit": "kg",
            "price": "2.00",
            "salePrice": "1.60",
            "quantity": 300,
            "sku": "20240108-P01",
            "slug": "apples",
            "categories": [
                {
                    "id": "365079f8-ae27-40da-9669-b0a5b956cc4d",
                    "name": "Fruits and Vegetables",
                    "slug": "fruits-and-vegetables",
                    "description": "This category is for fruits and vegetables item.",
                    "icon": "http://localhost:3000/categories/pictures/apple_1704722889181.png"
                }
            ],
            "subcategories": [
                {
                    "id": "f2e547e6-86cc-407e-8b68-482767c75f49",
                    "name": "Fruits",
                    "description": "This is for fruits sub category",
                    "slug": "fruits"
                }
            ]
        }
    ],
    "meta": {
        "page": 1,
        "take": 10,
        "itemCount": 1,
        "pageCount": 1,
        "hasPreviousPage": false,
        "hasNextPage": false
    },
    "message": "Fetch products successfully"
}
```
</details>

<details>
  
<summary> <code>GET </code> <code>/products/{productId}</code></summary>

### Curl

    curl -X 'GET' \ 'http://localhost:3000/products/64eb19a5-9379-4c20-b18f-dcf1f193c230 \ 
    -H 'accept: application/json'

### Request URL

    http://localhost:3000/products/64eb19a5-9379-4c20-b18f-dcf1f193c230

### Response
```
{
  "success": true,
  "content": {
      "id": "64eb19a5-9379-4c20-b18f-dcf1f193c230",
      "createdAt": "2024-01-08T17:24:37.485Z",
      "name": "Apples",
      "desc": "An apple is a sweet, edible fruit produced by an apple tree (Malus domestica). Apple trees are ... The skin of ripe apples is generally red, yellow, green, pink, or russetted, though many bi- or tri-colored cultivars may be found.",
      "status": "PUBLISHED",
      "featuredImg": "http://localhost:3000/products/pictures/apple-1_1704734677462.webp",
      "galleryImg": [
          "http://localhost:3000/products/pictures/apple-2_1704734677463.webp",
          "http://localhost:3000/products/pictures/apple_1704734677463.webp"
      ],
      "unit": "kg",
      "price": "2.00",
      "salePrice": "1.60",
      "quantity": 300,
      "sku": "20240108-P01",
      "slug": "apples"
  },
  "message": "Get product successfully"
}
```
</details>

<details>
  
<summary> <code>PATCH </code> <code>/products/{productId}</code></summary>

### Curl

    curl -X 'PATCH' \ 'http://localhost:3000/products/64eb19a5-9379-4c20-b18f-dcf1f193c230 \ 
    -H 'accept: application/json'
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTW9pbnVsIEhvc3NhaW4iLCJ1c2VySWQiOiJiNWM3OGQ0Zi1hMWQzLTQ5MDktOWEzYi03ZjM1NDk2YTU1M2YiLCJpYXQiOjE3MDQ3MTUzMTYsImV4cCI6MTcwNDcxODkxNn0.aEOVyViMFnlp0MZVjBMFiV9BiBN9yBj_-1JLmeh3bKk'
    -d '{
      "desc": "An apple is a sweet. The skin of ripe apples is generally red, yellow, green, pink, or russetted, though many bi- or tri-colored cultivars may be found.",
    }'

### Request URL

    http://localhost:3000/products/64eb19a5-9379-4c20-b18f-dcf1f193c230

### Response
```
{
 "success": true,
  "content": {
      "id": "64eb19a5-9379-4c20-b18f-dcf1f193c230",
      "createdAt": "2024-01-08T17:24:37.485Z",
      "name": "Apples",
      "desc": "desc": "An apple is a sweet. The skin of ripe apples is generally red, yellow, green, pink, or russetted, though many bi- or tri-colored cultivars may be found.",
      "status": "PUBLISHED",
      "featuredImg": "http://localhost:3000/products/pictures/apple-1_1704734677462.webp",
      "galleryImg": [
          "http://localhost:3000/products/pictures/apple-2_1704734677463.webp",
          "http://localhost:3000/products/pictures/apple_1704734677463.webp"
      ],
      "unit": "kg",
      "price": "2.00",
      "salePrice": "1.60",
      "quantity": 300,
      "sku": "20240108-P01",
      "slug": "apples"
  },
  "message": "product updated successfully"
}
```
</details>

<details>
  
<summary> <code>DELETE </code> <code>/products/{productId}</code></summary>

### Curl

    curl -X 'DELETE' \ 'http://localhost:3000/products/64eb19a5-9379-4c20-b18f-dcf1f193c230 \ 
    -H 'accept: application/json'
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTW9pbnVsIEhvc3NhaW4iLCJ1c2VySWQiOiJiNWM3OGQ0Zi1hMWQzLTQ5MDktOWEzYi03ZjM1NDk2YTU1M2YiLCJpYXQiOjE3MDQ3MTUzMTYsImV4cCI6MTcwNDcxODkxNn0.aEOVyViMFnlp0MZVjBMFiV9BiBN9yBj_-1JLmeh3bKk'

### Request URL

    http://localhost:3000/products/64eb19a5-9379-4c20-b18f-dcf1f193c230

### Response
```
{
  "success": true,
  "content": [],
  "message": "product deleted successfully"
}
```
</details>

### Orders

<details>
  
<summary> <code>POST </code> <code>/orders</code></summary>

### Curl

    curl -X 'POST' \ 'http://localhost:3000/orders \ 
    -H 'accept: application/json'
    -H 'Content-Type: application/json'
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTW9pbnVsIEhvc3NhaW4iLCJ1c2VySWQiOiJiNWM3OGQ0Zi1hMWQzLTQ5MDktOWEzYi03ZjM1NDk2YTU1M2YiLCJpYXQiOjE3MDQ3MTUzMTYsImV4cCI6MTcwNDcxODkxNn0.aEOVyViMFnlp0MZVjBMFiV9BiBN9yBj_-1JLmeh3bKk'
    -d '{
        "order_status": "pending",
        "delivery_fee": 20,
        "amount": 13,
        "total": 33,
        "payment_status": "pending",
        "payment_method": "cashon",
        "billingAddress":         {
            "id": "40c1b9bf-e248-40b9-8a81-53971285b449",
            "title": "test",
            "country": "test country",
            "city": "test city",
            "state": "test state",
            "zip": "test zip",
            "streetAddress": "test streetAdress",
            "addressType": "billing",
            "isActive": true
        },
        "shippingAddress": {
            "id": "ff30fb95-06a9-4924-a09e-b4cce2c93795",
            "title": "test",
            "country": "test country",
            "city": "test city",
            "state": "test state",
            "zip": "test zip",
            "streetAddress": "test streetAdress",
            "addressType": "billing",
            "isActive": true
        },
        "orderItems": [
            {
                "productId": "64eb19a5-9379-4c20-b18f-dcf1f193c230",
                "subtotal": 13,
                "quantity": 1,
                "unit_price": 1.60
            }
        ]
    }'

### Request URL

    http://localhost:3000/orders

### Response
```
{
   "success": true,
   "content": {
      "order_status": "pending",
      "delivery_fee": 20,
      "total": 33,
      "amount": 13,
      "payment_status": "pending",
      "payment_method": "cashon",
      "shippingAddress": {
          "id": "ff30fb95-06a9-4924-a09e-b4cce2c93795",
          "title": "test",
          "country": "test country",
          "city": "test city",
          "state": "test state",
          "zip": "test zip",
          "streetAddress": "test streetAdress",
          "addressType": "billing",
          "isActive": true
      },
      "billingAddress": {
          "id": "40c1b9bf-e248-40b9-8a81-53971285b449",
          "title": "test",
          "country": "test country",
          "city": "test city",
          "state": "test state",
          "zip": "test zip",
          "streetAddress": "test streetAdress",
          "addressType": "billing",
          "isActive": true
      },
      "orderItems": [
          {
              "id": "75813f1d-43e6-4270-a54b-f0e9c6471535",
              "quantity": 1,
              "unit_price": "1.60",
              "subtotal": "13.00",
              "product": {
                  "id": "64eb19a5-9379-4c20-b18f-dcf1f193c230",
                  "createdAt": "2024-01-08T17:24:37.485Z",
                  "name": "Apples",
                  "desc": "An apple is a sweet, edible fruit produced by an apple tree (Malus domestica). Apple trees are ... The skin of ripe apples is generally red, yellow, green, pink, or russetted, though many bi- or tri-colored cultivars may be found.",
                  "status": "PUBLISHED",
                  "featuredImg": "http://localhost:3000/products/pictures/apple-1_1704734677462.webp",
                  "galleryImg": [
                      "http://localhost:3000/products/pictures/apple-2_1704734677463.webp",
                      "http://localhost:3000/products/pictures/apple_1704734677463.webp"
                  ],
                  "unit": "kg",
                  "price": "2.00",
                  "salePrice": "1.60",
                  "quantity": 300,
                  "sku": "20240108-P01",
                  "slug": "apples"
              }
          }
      ],
      "id": "51851872-0ff0-44f0-bb0e-529d9bcbbb11",
      "tracking_no": "20240105122035886-8317",
      "order_date": "2024-01-08T18:43:18.000Z"
  },
  "message": "Order placed successfully"
}
```
</details>

<details>
  
<summary> <code>GET </code> <code>/orders</code></summary>

### Curl

    curl -X 'GET' \ 'http://localhost:3000/orders \ 
    -H 'accept: application/json'
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTW9pbnVsIEhvc3NhaW4iLCJ1c2VySWQiOiJiNWM3OGQ0Zi1hMWQzLTQ5MDktOWEzYi03ZjM1NDk2YTU1M2YiLCJpYXQiOjE3MDQ3MTUzMTYsImV4cCI6MTcwNDcxODkxNn0.aEOVyViMFnlp0MZVjBMFiV9BiBN9yBj_-1JLmeh3bKk'

### Request URL

    http://localhost:3000/orders

### Response
```
{
    "success": true,
    "content": [
        {
            "id": "51851872-0ff0-44f0-bb0e-529d9bcbbb11",
            "tracking_no": "20240105122035886-8317",
            "order_date": "2024-01-08T18:43:18.000Z",
            "order_status": "pending",
            "delivery_fee": "20.00",
            "total": "33.00",
            "amount": "13.00",
            "payment_status": "pending",
            "payment_method": "cashon",
            "orderItems": [
                {
                    "id": "75813f1d-43e6-4270-a54b-f0e9c6471535",
                    "quantity": 1,
                    "unit_price": "1.60",
                    "subtotal": "13.00",
                    "product": {
                        "id": "64eb19a5-9379-4c20-b18f-dcf1f193c230",
                        "createdAt": "2024-01-08T17:24:37.485Z",
                        "name": "Apples",
                        "desc": "An apple is a sweet, edible fruit produced by an apple tree (Malus domestica). Apple trees are ... The skin of ripe apples is generally red, yellow, green, pink, or russetted, though many bi- or tri-colored cultivars may be found.",
                        "status": "PUBLISHED",
                        "featuredImg": "http://localhost:3000/products/pictures/apple-1_1704734677462.webp",
                        "galleryImg": [
                            "http://localhost:3000/products/pictures/apple-2_1704734677463.webp",
                            "http://localhost:3000/products/pictures/apple_1704734677463.webp"
                        ],
                        "unit": "kg",
                        "price": "2.00",
                        "salePrice": "1.60",
                        "quantity": 300,
                        "sku": "20240108-P01",
                        "slug": "apples"
                    }
                }
            ],
            "shippingAddress": {
                "id": "ff30fb95-06a9-4924-a09e-b4cce2c93795",
                "title": "test",
                "country": "test country",
                "city": "test city",
                "state": "test state",
                "zip": "test zip",
                "streetAddress": "test streetAdress",
                "addressType": "billing",
                "isActive": true
            },
            "billingAddress": {
                "id": "40c1b9bf-e248-40b9-8a81-53971285b449",
                "title": "test",
                "country": "test country",
                "city": "test city",
                "state": "test state",
                "zip": "test zip",
                "streetAddress": "test streetAdress",
                "addressType": "billing",
                "isActive": true
            }
        }
    ],
    "meta": {
        "page": 1,
        "take": 10,
        "itemCount": 1,
        "pageCount": 1,
        "hasPreviousPage": false,
        "hasNextPage": false
    },
    "message": "Orders fetched successfully"
}
```
</details>

<details>
  
<summary> <code>GET </code> <code>/orders/{orderId}</code></summary>

### Curl

    curl -X 'GET' \ 'http://localhost:3000/orders/51851872-0ff0-44f0-bb0e-529d9bcbbb11 \ 
    -H 'accept: application/json'
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTW9pbnVsIEhvc3NhaW4iLCJ1c2VySWQiOiJiNWM3OGQ0Zi1hMWQzLTQ5MDktOWEzYi03ZjM1NDk2YTU1M2YiLCJpYXQiOjE3MDQ3MTUzMTYsImV4cCI6MTcwNDcxODkxNn0.aEOVyViMFnlp0MZVjBMFiV9BiBN9yBj_-1JLmeh3bKk'

### Request URL

    http://localhost:3000/orders/51851872-0ff0-44f0-bb0e-529d9bcbbb11

### Response
```
{
    "success": true,
    "content": {
        "id": "51851872-0ff0-44f0-bb0e-529d9bcbbb11",
        "tracking_no": "20240105122035886-8317",
        "order_date": "2024-01-08T18:43:18.000Z",
        "order_status": "pending",
        "delivery_fee": "20.00",
        "total": "33.00",
        "amount": "13.00",
        "payment_status": "pending",
        "payment_method": "cashon",
        "orderItems": [
            {
                "id": "75813f1d-43e6-4270-a54b-f0e9c6471535",
                "quantity": 1,
                "unit_price": "1.60",
                "subtotal": "13.00",
                "product": {
                    "id": "64eb19a5-9379-4c20-b18f-dcf1f193c230",
                    "createdAt": "2024-01-08T17:24:37.485Z",
                    "name": "Apples",
                    "desc": "An apple is a sweet, edible fruit produced by an apple tree (Malus domestica). Apple trees are ... The skin of ripe apples is generally red, yellow, green, pink, or russetted, though many bi- or tri-colored cultivars may be found.",
                    "status": "PUBLISHED",
                    "featuredImg": "http://localhost:3000/products/pictures/apple-1_1704734677462.webp",
                    "galleryImg": [
                        "http://localhost:3000/products/pictures/apple-2_1704734677463.webp",
                        "http://localhost:3000/products/pictures/apple_1704734677463.webp"
                    ],
                    "unit": "kg",
                    "price": "2.00",
                    "salePrice": "1.60",
                    "quantity": 300,
                    "sku": "20240108-P01",
                    "slug": "apples"
                }
            }
        ],
        "shippingAddress": {
            "id": "ff30fb95-06a9-4924-a09e-b4cce2c93795",
            "title": "test",
            "country": "test country",
            "city": "test city",
            "state": "test state",
            "zip": "test zip",
            "streetAddress": "test streetAdress",
            "addressType": "billing",
            "isActive": true
        },
        "billingAddress": {
            "id": "40c1b9bf-e248-40b9-8a81-53971285b449",
            "title": "test",
            "country": "test country",
            "city": "test city",
            "state": "test state",
            "zip": "test zip",
            "streetAddress": "test streetAdress",
            "addressType": "billing",
            "isActive": true
        }
    },
    "message": "Fetched order successfully"
}
```
</details>

<details>
  
<summary> <code>PATCH </code> <code>/orders/{orderId}</code></summary>

### Curl

    curl -X 'PATCH' \ 'http://localhost:3000/orders/51851872-0ff0-44f0-bb0e-529d9bcbbb11 \ 
    -H 'accept: application/json'
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTW9pbnVsIEhvc3NhaW4iLCJ1c2VySWQiOiJiNWM3OGQ0Zi1hMWQzLTQ5MDktOWEzYi03ZjM1NDk2YTU1M2YiLCJpYXQiOjE3MDQ3MTUzMTYsImV4cCI6MTcwNDcxODkxNn0.aEOVyViMFnlp0MZVjBMFiV9BiBN9yBj_-1JLmeh3bKk'
    -d '{
      "order_status": "outForDelivery"
    }'

### Request URL

    http://localhost:3000/orders/51851872-0ff0-44f0-bb0e-529d9bcbbb11

### Response
```
{
    "success": true,
    "content": {
        "id": "51851872-0ff0-44f0-bb0e-529d9bcbbb11",
        "tracking_no": "20240105122035886-8317",
        "order_date": "2024-01-08T18:43:18.000Z",
        "order_status": "outForDelivery",
        "delivery_fee": "20.00",
        "total": "33.00",
        "amount": "13.00",
        "payment_status": "pending",
        "payment_method": "cashon",
        "orderItems": [
            {
                "id": "75813f1d-43e6-4270-a54b-f0e9c6471535",
                "quantity": 1,
                "unit_price": "1.60",
                "subtotal": "13.00",
                "product": {
                    "id": "64eb19a5-9379-4c20-b18f-dcf1f193c230",
                    "createdAt": "2024-01-08T17:24:37.485Z",
                    "name": "Apples",
                    "desc": "An apple is a sweet, edible fruit produced by an apple tree (Malus domestica). Apple trees are ... The skin of ripe apples is generally red, yellow, green, pink, or russetted, though many bi- or tri-colored cultivars may be found.",
                    "status": "PUBLISHED",
                    "featuredImg": "http://localhost:3000/products/pictures/apple-1_1704734677462.webp",
                    "galleryImg": [
                        "http://localhost:3000/products/pictures/apple-2_1704734677463.webp",
                        "http://localhost:3000/products/pictures/apple_1704734677463.webp"
                    ],
                    "unit": "kg",
                    "price": "2.00",
                    "salePrice": "1.60",
                    "quantity": 300,
                    "sku": "20240108-P01",
                    "slug": "apples"
                }
            }
        ],
        "shippingAddress": {
            "id": "ff30fb95-06a9-4924-a09e-b4cce2c93795",
            "title": "test",
            "country": "test country",
            "city": "test city",
            "state": "test state",
            "zip": "test zip",
            "streetAddress": "test streetAdress",
            "addressType": "billing",
            "isActive": true
        },
        "billingAddress": {
            "id": "40c1b9bf-e248-40b9-8a81-53971285b449",
            "title": "test",
            "country": "test country",
            "city": "test city",
            "state": "test state",
            "zip": "test zip",
            "streetAddress": "test streetAdress",
            "addressType": "billing",
            "isActive": true
        }
    },
    "message": "Order updated successfully"
}
```
</details>

<details>
  
<summary> <code>DELETE </code> <code>/orders/{orderId}</code></summary>

### Curl

    curl -X 'DELETE' \ 'http://localhost:3000/orders/f67e8b81-90b4-45c0-96c6-44e54ced3124 \ 
    -H 'accept: application/json'
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTW9pbnVsIEhvc3NhaW4iLCJ1c2VySWQiOiJiNWM3OGQ0Zi1hMWQzLTQ5MDktOWEzYi03ZjM1NDk2YTU1M2YiLCJpYXQiOjE3MDQ3MTUzMTYsImV4cCI6MTcwNDcxODkxNn0.aEOVyViMFnlp0MZVjBMFiV9BiBN9yBj_-1JLmeh3bKk'

### Request URL

    http://localhost:3000/orders/f67e8b81-90b4-45c0-96c6-44e54ced3124

### Response
```
{
  "success": true,
  "content": [],
  "message": "Order deleted successfully"
}
```
</details>

<details>
  
<summary> <code>POST </code> <code>/orders/check-availability</code></summary>

### Curl

    curl -X 'POST' \ 'http://localhost:3000/products \ 
    -H 'accept: application/json'
    -H 'Content-Type: application/json'
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTW9pbnVsIEhvc3NhaW4iLCJ1c2VySWQiOiJiNWM3OGQ0Zi1hMWQzLTQ5MDktOWEzYi03ZjM1NDk2YTU1M2YiLCJpYXQiOjE3MDQ3MTUzMTYsImV4cCI6MTcwNDcxODkxNn0.aEOVyViMFnlp0MZVjBMFiV9BiBN9yBj_-1JLmeh3bKk'
    -d '{
      "items": [
          {
              "productId": "64eb19a5-9379-4c20-b18f-dcf1f193c230",
              "quantity": 21
          }
      ]
    }'

### Request URL

    http://localhost:3000/orders/check-availability

### Response
```
{
  "success": true,
  "content": [],
  "message": "Customer can continue the process"
}
```
</details>

### CART

<details>
  
<summary> <code>POST</code> <code>/cart </code></summary>

### Curl

```
curl -X 'POST' \
  'http://localhost:3000/cart' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTW9pbnVsIEhvc3NhaW4iLCJ1c2VySWQiOiJiNWM3OGQ0Zi1hMWQzLTQ5MDktOWEzYi03ZjM1NDk2YTU1M2YiLCJpYXQiOjE3MDQ3MTUzMTYsImV4cCI6MTcwNDcxODkxNn0.aEOVyViMFnlp0MZVjBMFiV9BiBN9yBj_-1JLmeh3bKk'
  -d '
    {
      "productId": "64eb19a5-9379-4c20-b18f-dcf1f193c230",
      "quantity": 10
    }
  '
``` 

### Request URL

```
http://localhost:3000/cart
``` 


### Response
```
{
    "success": true,
    "content": {
      "total": 16,
      "quantity": 10,
      "product": {
          "id": "64eb19a5-9379-4c20-b18f-dcf1f193c230",
          "createdAt": "2024-01-08T17:24:37.485Z",
          "name": "Apples",
          "desc": "An apple is a sweet, edible fruit produced by an apple tree (Malus domestica). Apple trees are ... The skin of ripe apples is generally red, yellow, green, pink, or russetted, though many bi- or tri-colored cultivars may be found.",
          "status": "PUBLISHED",
          "featuredImg": "http://localhost:3000/products/pictures/apple-1_1704734677462.webp",
          "galleryImg": [
              "http://localhost:3000/products/pictures/apple-2_1704734677463.webp",
              "http://localhost:3000/products/pictures/apple_1704734677463.webp"
          ],
          "unit": "kg",
          "price": "2.00",
          "salePrice": "1.60",
          "quantity": 300,
          "sku": "20240108-P01",
          "slug": "apples"
      },
      "productId": "64eb19a5-9379-4c20-b18f-dcf1f193c230",
      "id": "95be3d0a-7719-499d-8178-37d416bfc2b7"
    },
    "message": "Add product to cart successfully"
}
```   
</details>

<details>
  
<summary> <code>GET </code> <code>/cart </code></summary>

### Curl

```
curl -X 'GET' \
  'http://localhost:3000/cart' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTW9pbnVsIEhvc3NhaW4iLCJ1c2VySWQiOiJiNWM3OGQ0Zi1hMWQzLTQ5MDktOWEzYi03ZjM1NDk2YTU1M2YiLCJpYXQiOjE3MDQ3MTUzMTYsImV4cCI6MTcwNDcxODkxNn0.aEOVyViMFnlp0MZVjBMFiV9BiBN9yBj_-1JLmeh3bKk'
```

### Request URL

```
http://localhost:3000/cart
``` 


### Response
```
{
    "success": true,
    "content": [
        {
            "id": "95be3d0a-7719-499d-8178-37d416bfc2b7",
            "total": 16,
            "quantity": 10,
            "productId": "64eb19a5-9379-4c20-b18f-dcf1f193c230",
            "product": {
                "id": "64eb19a5-9379-4c20-b18f-dcf1f193c230",
                "createdAt": "2024-01-08T17:24:37.485Z",
                "name": "Apples",
                "desc": "An apple is a sweet, edible fruit produced by an apple tree (Malus domestica). Apple trees are ... The skin of ripe apples is generally red, yellow, green, pink, or russetted, though many bi- or tri-colored cultivars may be found.",
                "status": "PUBLISHED",
                "featuredImg": "http://localhost:3000/products/pictures/apple-1_1704734677462.webp",
                "galleryImg": [
                    "http://localhost:3000/products/pictures/apple-2_1704734677463.webp",
                    "http://localhost:3000/products/pictures/apple_1704734677463.webp"
                ],
                "unit": "kg",
                "price": "2.00",
                "salePrice": "1.60",
                "quantity": 300,
                "sku": "20240108-P01",
                "slug": "apples"
            }
        }
    ],
    "message": "Fetched cart successfully"
}
```   
</details>

<details>
  
<summary> <code>PUT </code> <code>/cart/{productId} </code></summary>

### Curl

```
curl -X 'PUT' \
  'http://localhost:3000/cart/64eb19a5-9379-4c20-b18f-dcf1f193c230?quantity=15' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTW9pbnVsIEhvc3NhaW4iLCJ1c2VySWQiOiJiNWM3OGQ0Zi1hMWQzLTQ5MDktOWEzYi03ZjM1NDk2YTU1M2YiLCJpYXQiOjE3MDQ3MTUzMTYsImV4cCI6MTcwNDcxODkxNn0.aEOVyViMFnlp0MZVjBMFiV9BiBN9yBj_-1JLmeh3bKk'
``` 

### Request URL

```
http://localhost:3000/cart/64eb19a5-9379-4c20-b18f-dcf1f193c230?quantity=15
``` 


### Response
```
{
    "success": true,
    "content": {
        "id": "95be3d0a-7719-499d-8178-37d416bfc2b7",
        "total": 24,
        "quantity": 15,
        "productId": "64eb19a5-9379-4c20-b18f-dcf1f193c230",
        "product": {
            "id": "64eb19a5-9379-4c20-b18f-dcf1f193c230",
            "createdAt": "2024-01-08T17:24:37.485Z",
            "name": "Apples",
            "desc": "An apple is a sweet, edible fruit produced by an apple tree (Malus domestica). Apple trees are ... The skin of ripe apples is generally red, yellow, green, pink, or russetted, though many bi- or tri-colored cultivars may be found.",
            "status": "PUBLISHED",
            "featuredImg": "http://localhost:3000/products/pictures/apple-1_1704734677462.webp",
            "galleryImg": [
                "http://localhost:3000/products/pictures/apple-2_1704734677463.webp",
                "http://localhost:3000/products/pictures/apple_1704734677463.webp"
            ],
            "unit": "kg",
            "price": "2.00",
            "salePrice": "1.60",
            "quantity": 300,
            "sku": "20240108-P01",
            "slug": "apples"
        }
    },
    "message": "Cart updated successfully"
}
```   
</details>

<details>
  
<summary> <code>DELETE </code> <code>/cart/{productId} </code></summary>

### Curl

```
curl -X 'DELETE' \
  'http://localhost:3000/cart/64eb19a5-9379-4c20-b18f-dcf1f193c230' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTW9pbnVsIEhvc3NhaW4iLCJ1c2VySWQiOiJiNWM3OGQ0Zi1hMWQzLTQ5MDktOWEzYi03ZjM1NDk2YTU1M2YiLCJpYXQiOjE3MDQ3MTUzMTYsImV4cCI6MTcwNDcxODkxNn0.aEOVyViMFnlp0MZVjBMFiV9BiBN9yBj_-1JLmeh3bKk'
``` 

### Request URL

```
http://localhost:3000/cart/64eb19a5-9379-4c20-b18f-dcf1f193c230
``` 

### Response
```
{
    "success": true,
    "content": [],
    "message": "Removed product from cart successfully"
}
```   
</details>

<details>
  
<summary> <code>DELETE </code> <code>/cart/all </code></summary>

### Curl

```
curl -X 'DELETE' \
  'http://localhost:3000/cart/all' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTW9pbnVsIEhvc3NhaW4iLCJ1c2VySWQiOiJiNWM3OGQ0Zi1hMWQzLTQ5MDktOWEzYi03ZjM1NDk2YTU1M2YiLCJpYXQiOjE3MDQ3MTUzMTYsImV4cCI6MTcwNDcxODkxNn0.aEOVyViMFnlp0MZVjBMFiV9BiBN9yBj_-1JLmeh3bKk'
``` 

### Request URL

```
http://localhost:3000/cart/all
``` 

### Response
```
{
    "success": true,
    "content": [],
    "message": "Cart removed successfully"
}
```   
</details>

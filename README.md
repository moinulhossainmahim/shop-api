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
  
<summary> <code>Delete </code> <code>/categories/{categoryId}</code></summary>

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
  
<summary> <code>Delete </code> <code>/sub-categories/{categoryId}</code></summary>

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
  
<summary> <code>Delete </code> <code>/wishlists/{wishlistId}</code></summary>

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
  
<summary> <code>Delete </code> <code>/address/{addressId}</code></summary>

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






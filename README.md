# Blog App

Welcome to the Blog App! This application allows users to create, read, and manage blog posts. It features a simple and intuitive interface, user authentication, and a rich text editor for creating content.

## Table of Contents
- [Features](#Login,SignUp,Logout,Search,View all the Post)
- [Technologies Used](#express,dotenv,node,mongoose,stripe,editor.js,tailwindcss,react)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#[api-endpoints](https://vercel.com/sameer-suryawanshis-projects/sameer-blog-app))
- [Contributing](#contributing)
- [License](#license)

## Features
- User authentication (login, registration)
- Create, read, update, and delete blog posts
- Rich text editor for formatting blog content
- Location tagging for each post
- Responsive design for mobile and desktop
- Location based blog feed

## Technologies Used
- *Frontend:* React, Next.js, Tailwind CSS, Draft.js
- *Backend:* Node.js, Express
- *Database:* MongoDB
- *Deployment:* Render, Vercel

## Installation

To get started with the Blog App, follow these steps:

1. *Clone the repository:*
   ```bash
   git clone https://github.com/SamSwnshi/blog-app.git
2.Navigate to the project directory:

bash
Copy code
cd blog-app
Install dependencies for both frontend and backend:

For the backend:
bash
Copy code
cd server
npm install
For the frontend:
bash
Copy code
cd client
npm install
Set up environment variables: Create a .env file in the server directory and define your MongoDB connection string and other necessary variables.

Run the application:

Start the backend server:
bash
Copy code
cd server
npm start
Start the frontend application:
bash
Copy code
cd client
npm run dev
Usage
Navigate to http://localhost:3000 in your browser to access the application.
Register a new account or log in with an existing account.
Start creating and managing your blog posts.
API Endpoints
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login an existing user
GET	/api/blogs	Get all blog posts
POST	/api/blogs	Create a new blog post
GET	/api/blogs/:id	Get a blog post by ID

Contributing
Contributions are welcome! If you have suggestions or improvements, feel free to fork the repository and submit a pull request.

Fork the project
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a pull request

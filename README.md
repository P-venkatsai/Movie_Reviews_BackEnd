# Movie Reviews BackEnd

This repository contains the backend code for the Movie Reviews Website. It provides the necessary APIs and functionality to handle user authentication, movie data, and reviews. 

The Movie Reviews Website allows users to give reviews of recently released movies. You can find the frontend code for the website [here](https://github.com/P-venkatsai/Movie_Reviews_Website).

## Features

- User authentication: The backend includes user authentication endpoints for user registration, login, and logout. It provides a secure way for users to create accounts and access the website's features.

- Movie data: The backend manages the movie data, including details such as title, release date, duration, genre, and director. It provides endpoints to retrieve movie information and update movie data as needed.

- Review management: The backend handles user reviews for movies. It allows users to submit reviews, retrieve reviews for specific movies, and manage review data.

## Technologies Used

The Movie Reviews BackEnd is built using the following technologies:

- **Node.js**: A JavaScript runtime environment used to run server-side code.
- **Express.js**: A web application framework for Node.js used to build APIs and handle HTTP requests.
- **MongoDB**: A NoSQL database used to store movie and user data.
- **Mongoose**: A MongoDB object modeling tool used to interact with the database.

## Getting Started

To set up the Movie Reviews BackEnd project locally, follow these steps:

1. Clone this repository to your local machine using the following command:
2. Navigate to the project directory
3. Install the dependencies using npm
4. Create a `.env` file in the root directory and provide the necessary environment variables. Refer to the `.env.example` file for the required variables.
5. Start the server:
6. The backend server will now be running on `http://localhost:3000`.

## API Endpoints

The Movie Reviews BackEnd provides the following API endpoints:

- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Log in an existing user.
- **POST /api/auth/logout**: Log out the current user.
- **GET /api/movies**: Get all movies.
- **GET /api/movies/:id**: Get a specific movie by ID.
- **POST /api/movies**: Add a new movie.
- **PUT /api/movies/:id**: Update a movie by ID.
- **DELETE /api/movies/:id**: Delete a movie by ID.
- **GET /api/reviews**: Get all reviews.
- **GET /api/reviews/:id**: Get reviews for a specific movie by ID.
- **POST /api/reviews**: Add a new review.
- **PUT /api/reviews/:id**: Update a review by ID.
- **DELETE /api/reviews/:id**: Delete a review by ID.

For more details about the request and response format for each endpoint, please refer to the documentation or the code itself.

## Contributing

Contributions to the Movie Reviews BackEnd project are welcome! If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your contribution.
3. Make your modifications or add new features.
4. Test your changes thoroughly.
5. Submit a pull request, explaining the purpose and details of your contribution.

## Issues

If you encounter any issues or have any suggestions for improvements, please [open an issue](https://github.com/P-venkatsai/Movie_Reviews_BackEnd/issues) on the GitHub repository.


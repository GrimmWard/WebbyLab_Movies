# Movies Management API

A web application for managing a movie collection with actors. This application provides a RESTful API for creating, reading, updating, and deleting movies and their associated actors, along with user authentication.

## Features

- User registration and authentication with JWT
- Movie management (CRUD operations)
- Actor management (automatically created and associated with movies)
- Search and filter movies by title or actor
- Sort movies by title or release year
- Import movies from text files
- Docker support for easy deployment

## Technologies Used

- Node.js
- Express.js
- Sequelize ORM
- SQLite database
- JSON Web Tokens (JWT) for authentication
- Docker for containerization

## Project Structure

- `/src` - Source code
  - `/config` - Database configuration
  - `/middleware` - Authentication middleware
  - `/models` - Database models (Movie, Actor, User)
  - `/movies` - Movie controller and routes
  - `/user` - User controller and authentication routes
  - `/utils` - Utility functions (file parsing)
- `/pages` - HTML pages for user interface
- `server.js` - Main application entry point
- `Dockerfile` - Docker configuration

## API Endpoints

### Authentication

- `POST /user/create` - Register a new user
- `POST /user/login` - Login and receive JWT token

### Movies (Protected Routes - Require Authentication)

- `GET /movies` - List all movies (with optional filtering and sorting)
- `GET /movies/:id` - Get a specific movie by ID
- `POST /movies/add` - Add a new movie with actors
- `PATCH /movies/:id` - Update a movie
- `DELETE /movies/:id` - Delete a movie
- `POST /movies/import` - Import movies from a text file

## Getting Started

### Prerequisites

- Node.js (v22.12.0 or later recommended)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   PORT=8000
   JWT_SECRET=your_jwt_secret
   DB_PATH=./dev.sqlite
   ```

### Running the Application

Development mode:
```
npm run dev
```

Production mode:
```
npm start
```

### Docker Deployment

Build and run the Docker container:
```
docker build -t movies-app .
docker run -p 8000:8000 movies-app
```

Or use Docker Compose:
```
docker-compose up
```
Or you can pull this project from Docker hub by this command
```
docker pull johnny491/movies:latest 
docker run -p 8000:8000 johnny491/movies:latest
```

## File Import Format

The application supports importing movies from text files with the following format:

```
Title: Movie Title
Release Year: 2023
Format: DVD
Stars: Actor 1, Actor 2, Actor 3

Title: Another Movie
Release Year: 2022
Format: Blu-ray
Stars: Actor 4, Actor 5
```

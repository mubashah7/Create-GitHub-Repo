# Backend for Movie Website

## 📦 Features
- Admin login with JWT
- Upload/Edit/Delete movies or series
- Video & poster upload support
- MongoDB integration

## 🛠️ Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the `backend/` folder:
   ```
   MONGO_URI=mongodb://localhost:27017/moviedb
   JWT_SECRET=your_jwt_secret_key
   ```

3. Run the server:
   ```
   node server.js
   ```

## 🚀 API Routes

- `POST /api/auth/login` – Login with username & password
- `GET /api/movies` – Get all movies
- `POST /api/movies` – Add new movie (multipart/form-data + token)
- `PUT /api/movies/:id` – Edit movie
- `DELETE /api/movies/:id` – Delete movie

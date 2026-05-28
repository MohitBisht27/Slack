# Slack (Knowledge Sharing Platform)

A full-stack doubt-sharing platform where users can ask technical questions, interact through comments/likes, and share media posts (images and reels).

## Table of Contents
- [Overview](#overview)
- [Core Features](#core-features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Run the Application](#run-the-application)
- [Available Scripts](#available-scripts)
- [Frontend Routes](#frontend-routes)
- [Backend API Reference](#backend-api-reference)
- [Development Notes](#development-notes)

## Overview
The project is split into:
- **Frontend**: React + Vite app for authentication, posting doubts, browsing feeds, and profile settings
- **Backend**: Express API with MongoDB persistence, JWT auth, media upload handling, and cookie-based session flow

## Core Features
- User registration, login, logout, and token refresh flow
- Protected client routes for authenticated users
- Article-based doubt posting and feed browsing
- Commenting system for article doubts
- Like functionality on comments and media comments
- Media doubt uploads (image/video), media feed, and reel feed
- User profile/account update flows (password, avatar, cover image, account info)

## Tech Stack

### Frontend
- React 19
- Vite 6
- React Router
- Redux Toolkit
- Tailwind CSS 4
- Axios

### Backend
- Node.js (ES Modules)
- Express 5
- MongoDB + Mongoose
- JWT authentication
- Multer (multipart upload)
- Cookie parser + CORS

## Architecture
1. User performs auth actions from React app.
2. Frontend sends API requests to `http://localhost:8000/api/v1/...` with credentials enabled.
3. Backend verifies JWT for protected routes using middleware.
4. Backend reads/writes MongoDB documents through Mongoose models.
5. Media endpoints accept multipart uploads and process files through configured upload utilities.

## Project Structure

```text
Slack/
├── Frontend/
│   ├── src/
│   │   ├── api/            # Axios API clients
│   │   ├── components/     # Reusable UI and feature components
│   │   ├── context/        # Auth context
│   │   ├── features/       # Redux feature slices
│   │   ├── pages/          # Top-level pages
│   │   └── App.jsx         # Router + auth bootstrap
│   └── package.json
├── Backend/
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── db/             # Database connection
│   │   ├── middlewares/    # Auth/upload middleware
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API route definitions
│   │   ├── utils/          # Shared helpers
│   │   ├── app.js          # Express app + route mounting
│   │   └── index.js        # App bootstrap + DB connect
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm
- MongoDB connection string
- Cloudinary credentials (for media upload)

### Install dependencies

```bash
cd /path/to/Slack
npm ci --prefix Frontend
npm ci --prefix Backend
```

## Environment Variables
Create `Backend/.env`:

```env
PORT=8000
MONGODB_URI=<your-mongodb-uri>
ACCESS_TOKEN_SECRET=<your-access-token-secret>
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=<your-refresh-token-secret>
REFRESH_TOKEN_EXPIRY=10d
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
```

## Run the Application
Open two terminals from repository root:

```bash
# Terminal 1 (Backend)
npm run dev --prefix Backend

# Terminal 2 (Frontend)
npm run dev --prefix Frontend
```

Default local URLs:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8000`

## Available Scripts

### Frontend (`/Frontend`)
- `npm run dev` - Start Vite development server
- `npm run build` - Create production build
- `npm run lint` - Run ESLint checks
- `npm run preview` - Preview production build locally

### Backend (`/Backend`)
- `npm run dev` - Start backend with nodemon
- `npm run start` - Start backend with node

## Frontend Routes
Defined in `Frontend/src/App.jsx`:

### Public
- `/` - Landing page
- `/SigninForm` - Sign in
- `/RegisterForm` - Sign up
- `/forgot-password` - Forgot/change password flow

### Protected
- `/ask-problem` - Create article doubt
- `/doubtFeed` - Article doubts feed
- `/profile` - User profile
- `/comment` - Comment section
- `/reel` - Reels feed
- `/imageFeed` - Image feed
- `/mediaForm` - Create media doubt
- `/setting` - Account settings update

## Backend API Reference
Base URL: `http://localhost:8000/api/v1`

### Users (`/users`)
- `POST /register`
- `POST /login`
- `POST /logout` *(auth required)*
- `POST /refresh-token`
- `POST /change-password` *(auth required)*
- `GET /current-user` *(auth required)*
- `PATCH /update-account` *(auth required)*
- `PATCH /avatar` *(auth required, multipart)*
- `PATCH /cover-image` *(auth required, multipart)*

### Articles (`/userArticle`)
- `POST /article` *(auth required)*
- `GET /getAllArticles`
- `GET /getMyArticles` *(auth required)*
- `GET /articles/user/:userId`
- `DELETE /:articleId` *(auth required)*

### Article Comments (`/comments`)
- `POST /:articleId` *(auth required)*
- `GET /:articleId`
- `PUT /:commentId` *(auth required)*
- `DELETE /:commentId` *(auth required)*
- `POST /:commentId/like` *(auth required)*

### Likes (`/userLike`)
- `POST /comments/:commentId/like` *(auth required)*

### Media (`/mediaRoute`)
- `POST /add` *(auth required, multipart image/video)*
- `GET /reels`
- `GET /image`
- `DELETE /delete/:mediaId` *(auth required)*
- `PATCH /toggle/like/:mediaId` *(auth required)*

### Media Comments (`/mediaComments`)
- `GET /m/:mediaId`
- `POST /m/:mediaId` *(auth required)*
- `PATCH /m/c/:commentId` *(auth required)*
- `DELETE /m/c/:commentId` *(auth required)*
- `POST /m/like/:commentId` *(auth required)*

## Development Notes
- CORS is currently configured for `http://localhost:5173` in backend app config.
- Frontend API clients are in `Frontend/src/api`.
- Authentication state is initialized in `Frontend/src/App.jsx` using `getCurrentUser`.

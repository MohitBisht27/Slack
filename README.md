# Slack (Knowledge Sharing Platform)

A full-stack platform where users can post technical doubts, discuss through comments, and share media-based content (images/reels) with authentication-protected actions.

## Tech Stack

### Frontend
- React (Vite)
- React Router
- Redux Toolkit
- Tailwind CSS
- Axios

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Multer (file uploads)

## Key Features
- User registration/login/logout with JWT + cookies
- Protected routes for authenticated users
- Create, view, and delete article-based doubts
- Article comments with like support
- Media doubt posts (images/reels) with like and comment support
- User profile and account settings updates

## Project Structure

```text
Slack/
├── Frontend/   # React + Vite client
└── Backend/    # Express + MongoDB API
```

## Getting Started

### Prerequisites
- Node.js (18+ recommended)
- npm
- MongoDB instance
- Cloudinary account (for media upload support)

### 1) Clone and install dependencies

```bash
git clone <your-repo-url>
cd Slack
npm ci --prefix Frontend
npm ci --prefix Backend
```

### 2) Configure environment variables

Create `Backend/.env` with:

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

### 3) Run the app

Open two terminals:

```bash
# Terminal 1: backend
npm run dev --prefix Backend

# Terminal 2: frontend
npm run dev --prefix Frontend
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:8000`

## Available Scripts

### Frontend (`/Frontend`)
- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `npm run lint` — run ESLint
- `npm run preview` — preview production build

### Backend (`/Backend`)
- `npm run dev` — start backend with nodemon
- `npm run start` — start backend with node

## API Route Groups
- `/api/v1/users` — auth and account endpoints
- `/api/v1/userArticle` — article/doubt endpoints
- `/api/v1/comments` — article comments
- `/api/v1/userLike` — like operations
- `/api/v1/mediaRoute` — media doubts (images/reels)
- `/api/v1/mediaComments` — media comments

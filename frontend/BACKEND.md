# Backend Implementation Plan - Portfolio Website

This document outlines the detailed structure and implementation steps for the portfolio backend.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **ODM**: Mongoose
- **Authentication**: JWT + bcryptjs
- **File Storage**: Cloudinary (Recommended)

---

## 🚀 Step-by-Step Implementation

### Phase 1: Database & Models (Refinement)
Implement the collections as specified:

#### 1. Profile Collection
- **Model**: `backend/models/Profile.js`
- **Fields**: `name`, `title`, `email`, `profilePhoto`, `location`, `resumeUrl`, `bio`

#### 2. Project Collection
- **Model**: `backend/models/Project.js`
- **Fields**: `title`, `description`, `problemSolved`, `technologies` (Array), `githubLink`, `images` (Array), `category`, `featured` (Boolean), `createdDate`

#### 3. Skill Collection
- **Model**: `backend/models/Skill.js`
- **Fields**: `name`, `category`, `proficiency`

#### 4. Education Collection
- **Model**: `backend/models/Education.js`
- **Fields**: `degree`, `specialization`, `institution`, `year`, `coursework` (Array)

#### 5. Contact Messages Collection
- **Model**: `backend/models/Message.js`
- **Fields**: `name`, `email`, `message`, `date`

---

### Phase 2: Authentication (JWT + bcrypt)
Secure the admin dashboard to manage portfolio content.
- Create an `Admin` model (or use `Profile` with sensitive fields).
- Implement `POST /api/auth/login` and `POST /api/auth/register`.
- Secure routes using an `authMiddleware`.

---

### Phase 3: API Endpoints (CRUD)
Expose the data via RESTful APIs.

| Resource | Endpoints | Protected? |
| :--- | :--- | :--- |
| **Profile** | GET (Public), PUT (Admin) | Yes (PUT) |
| **Projects** | GET (Public), POST/PUT/DELETE (Admin) | Yes (Write) |
| **Skills** | GET (Public), POST/PUT/DELETE (Admin) | Yes (Write) |
| **Education** | GET (Public), POST/PUT/DELETE (Admin) | Yes (Write) |
| **Messages** | POST (Public), GET/DELETE (Admin) | Yes (Read/Delete) |

---

### Phase 4: File Storage (Cloudinary)
**Why Cloudinary?** It's excellent for real-life portfolios because it optimizing images on the fly, reducing page load times significantly.
- Set up `cloudinary` account and get credentials.
- Integrate `multer-storage-cloudinary` for direct uploads to the cloud.

---

### Phase 5: Testing & Deployment
- Verify all endpoints with Postman/Thunder Client.
- Ensure the connection to MongoDB Atlas is stable.
- Prepare for deployment (Render, Vercel, or Railway).

---

## 🛠 Project Structure
```text
backend/
├── config/             # Database & Cloudinary config
├── controllers/        # Logic for each resource
├── middleware/         # Auth & Error handling
├── models/             # Mongoose schemas
├── routes/             # API entry points
├── .env                # Secret keys (URI, JWT_SECRET, CLOUDINARY_URL)
├── app.js              # Express setup
└── server.js           # Entry point
```

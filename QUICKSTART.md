# NexusConnect - Quick Start Guide

## Project Overview

**NexusConnect** is a fully functional Next.js + MySQL web application for professional networking and collaboration. The project includes:

✅ **7 MySQL Database Tables** - users, connections, projects, project_members, documents, messages, portfolio_items  
✅ **User Authentication** - Secure registration/login with bcryptjs hashing and JWT tokens  
✅ **Database Interaction** - Full CRUD operations on 5+ tables  
✅ **Validation & Error Handling** - Both frontend and backend validation with user-friendly error messages  
✅ **Media Upload** - Profile pictures and document sharing with file type/size validation  

## Project Built & Ready

The project has been successfully compiled and built with no TypeScript or build errors.

## Setup Instructions

### 1. Database Setup

```bash
# Create the MySQL database
mysql -u root -p -e "CREATE DATABASE nexusconnect;"

# Import the schema
mysql -u root -p nexusconnect < database.sql
```

### 2. Environment Configuration

Edit `.env.local`:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=nexusconnect
JWT_SECRET=change_this_to_random_string
NEXTAUTH_SECRET=change_this_to_random_string
NEXTAUTH_URL=http://localhost:3000
```

### 3. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## Key Features & Pages

### Public Pages
- **/** - Landing page with features overview
- **/auth/register** - User registration
- **/auth/login** - User login

### Protected Pages (Requires Login)
- **/dashboard** - Main dashboard with project listings
- **/profile/[userId]** - User profile view/edit
- **/projects/create** - Create new project
- **/projects/[projectId]** - Project detail with members & documents

## API Endpoints

### Authentication
```
POST /api/auth/register  - Register new user
POST /api/auth/login     - Login and get JWT token
```

### User Management
```
GET    /api/users/[userId]              - Get user profile
PUT    /api/users/[userId]              - Update profile
GET    /api/users/[userId]/connections  - List connections
POST   /api/users/[userId]/connections  - Add/manage connections
```

### Projects
```
GET    /api/projects                    - List all projects
POST   /api/projects                    - Create project
GET    /api/projects/[projectId]        - Get project details
PUT    /api/projects/[projectId]        - Update project
DELETE /api/projects/[projectId]        - Delete project
```

### Project Management
```
GET    /api/projects/[projectId]/members     - List team members
POST   /api/projects/[projectId]/members     - Add member
GET    /api/projects/[projectId]/documents   - List documents
POST   /api/projects/[projectId]/documents   - Upload document
```

### Media
```
POST /api/upload - Upload profile picture or files
```

## Authentication Flow

1. **Registration** → Create account with email/password
2. **Password Hashing** → bcryptjs with 10 salt rounds
3. **Login** → Verify credentials and generate JWT token
4. **Storage** → Token stored in localStorage
5. **API Calls** → Include token in Authorization header
6. **Token Expiry** → 7-day expiration

## Database Tables

### users
- id, email (unique), password (hashed), firstName, lastName, title, bio, profilePicture, location, skills, timestamps

### projects
- id, name, description, ownerId (FK), status, category, budget, deadline, timestamps

### project_members
- id, projectId (FK), userId (FK), role, joinedAt

### documents
- id, projectId (FK), uploadedBy (FK), fileName, filePath, fileSize, fileType, description, timestamps

### connections
- id, userId (FK), connectedUserId (FK), status (pending/connected/blocked), timestamps

### messages
- id, senderId (FK), recipientId (FK), content, isRead, timestamps

### portfolio_items
- id, userId (FK), title, description, imageUrl, link, timestamps

## Security Features

✅ Password Hashing - bcryptjs with 10 rounds  
✅ JWT Authentication - 7-day token expiry  
✅ File Validation - MIME type and size checks  
✅ Input Validation - Zod schemas on all endpoints  
✅ Authorization Checks - User-specific resource access  
✅ Error Handling - User-friendly error messages  

## Project Structure

```
nexsusconnect/
├── src/
│   ├── app/
│   │   ├── api/                    # API routes
│   │   ├── auth/                   # Auth pages
│   │   ├── dashboard/              # Dashboard page
│   │   ├── profile/                # Profile pages
│   │   ├── projects/               # Project pages
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   └── page.tsx               # Landing page
│   └── lib/
│       ├── auth.ts                # Auth utilities
│       ├── authMiddleware.ts       # Auth middleware
│       ├── db.ts                  # Database connection
│       └── validation.ts           # Zod schemas
├── public/                         # Static files
├── package.json
├── database.sql                    # Database schema
├── .env.local                      # Environment variables
└── README.md                       # Full documentation
```

## Testing the Application

### 1. Test Registration
- Visit `/auth/register`
- Enter test credentials
- Password must be 8+ characters
- Passwords must match

### 2. Test Login
- Visit `/auth/login`
- Use registered credentials
- JWT token saved to localStorage

### 3. Test Dashboard
- After login, view all projects at `/dashboard`
- Create new project from button

### 4. Test Project Creation
- Go to `/projects/create`
- Fill in project details
- Submit to create project

### 5. Test Document Upload
- Go to project detail page
- Click "Upload Document" tab
- Select file and upload

### 6. Test Profile
- Click profile link from dashboard
- View your profile at `/profile/[userId]`
- Edit profile information
- Upload profile picture

## Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Run production build
npm run lint      # Run ESLint
```

## Dependencies Installed

- **next** - React framework
- **react** - UI library
- **mysql2** - MySQL database driver
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **zod** - Input validation
- **tailwindcss** - CSS framework

## Troubleshooting

### Database Connection Error
- Check MySQL is running
- Verify `.env.local` has correct credentials
- Ensure database exists: `mysql -u root -p -e "SHOW DATABASES;"`

### File Upload Not Working
- Check `/public/uploads` directory exists
- Verify file size < 10MB
- Confirm file type is allowed (JPEG, PNG, GIF, PDF, DOCX)

### Port 3000 Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### TypeScript Errors
- Run `npm run build` to check
- Clear `.next` folder: `rm -rf .next`
- Rebuild: `npm run build`

## Next Steps

1. **Production Deployment**
   - Deploy to Vercel, Railway, or similar
   - Update environment variables
   - Use external MySQL database

2. **Add Features**
   - Real-time messaging with WebSockets
   - Email notifications
   - Advanced search
   - Portfolio gallery
   - Skills endorsement system

3. **Enhance Security**
   - Add rate limiting
   - Implement CSRF protection
   - Add two-factor authentication
   - Set up HTTPS

## Support

For issues or questions, refer to the main README.md file for full documentation.

---

**Project Status:** ✅ Build Successful | Ready for Development  
**Last Updated:** December 2025  
**Framework:** Next.js 16+ | TypeScript  
**Database:** MySQL 5.7+

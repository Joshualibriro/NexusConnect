# NexusConnect - Professional Networking & Collaboration Platform

## App Concept

**NexusConnect** is a professional networking and collaboration platform designed for remote teams and freelancers. It allows users to create profiles, connect with other professionals, form projects/teams, share documents, and collaborate in real-time. Users can discover collaborators, join projects, upload portfolios, and communicate through messaging. The app facilitates skill-based networking and project management in one unified platform.

## Technology Stack

- **Frontend:** Next.js 15+ with React
- **Backend:** Next.js API Routes
- **Database:** MySQL
- **Authentication:** JWT with bcryptjs
- **File Upload:** Multer with validation
- **Validation:** Zod
- **Styling:** Tailwind CSS

## Database Schema

The application uses 7 MySQL relational tables:

1. **users** - User profiles with authentication data
2. **connections** - Social network connections between users
3. **projects** - Project management (owned by users)
4. **project_members** - Team members in projects
5. **documents** - Files shared within projects
6. **messages** - Direct messaging between users
7. **portfolio_items** - User portfolio showcase items

## Features Implemented

### 1. User Authentication ✅
- **Registration** (`/auth/register`)
  - Email validation with Zod
  - Password hashing with bcryptjs (10 salt rounds)
  - Duplicate email prevention
  - Form validation

- **Login** (`/auth/login`)
  - Email/password verification
  - JWT token generation (7-day expiry)
  - Client-side token storage
  - User session management

### 2. Database Interaction (5+ Tables) ✅
Users can interact with:
- **Users Table** - View/update profiles, upload pictures
- **Projects Table** - Create, read, update projects
- **Project Members Table** - Add team members, manage roles
- **Documents Table** - Upload and share project files
- **Connections Table** - Connect with other professionals

### 3. Validation & Error Handling ✅
- **Frontend Validation:**
  - Zod schema validation
  - User-friendly error messages
  - Success feedback

- **Backend Validation:**
  - Input validation on all endpoints
  - Password strength (min 8 chars)
  - Email format validation
  - File validation (max 10MB)
  - Authorization checks

### 4. Media Upload ✅
- **Profile Picture Upload**
  - Image validation (JPEG, PNG, GIF)
  - File size limit (10MB)
  - Automatic database update

- **Document Upload**
  - Multiple file types (PDF, DOCX, images)
  - Project-based organization
  - Upload metadata tracking

## Getting Started

### Prerequisites
- Node.js 18+
- MySQL 5.7+
- npm or yarn

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Setup MySQL Database:**
```bash
# Create database
mysql -u root -p -e "CREATE DATABASE nexusconnect;"

# Import schema
mysql -u root -p nexusconnect < database.sql
```

3. **Configure environment variables (.env.local):**
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=nexusconnect
JWT_SECRET=your_super_secret_jwt_key
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

4. **Run development server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   ├── projects/
│   │   ├── users/
│   │   └── upload/
│   ├── auth/
│   ├── dashboard/
│   ├── profile/
│   ├── projects/
│   └── page.tsx
├── lib/
│   ├── auth.ts
│   ├── authMiddleware.ts
│   ├── db.ts
│   └── validation.ts
└── globals.css
```

## Key API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/[userId]` - Get user profile
- `PUT /api/users/[userId]` - Update user profile
- `GET/POST /api/users/[userId]/connections` - Manage connections

### Projects
- `GET /api/projects` - List all projects
- `POST /api/projects` - Create project
- `GET /api/projects/[projectId]` - Get project details
- `PUT /api/projects/[projectId]` - Update project
- `DELETE /api/projects/[projectId]` - Delete project

### Project Management
- `GET/POST /api/projects/[projectId]/members` - Manage team members
- `GET/POST /api/projects/[projectId]/documents` - Manage documents

### Media
- `POST /api/upload` - Upload media files

## Security Features

1. **Password Security**
   - Bcryptjs hashing (10 rounds)
   - Salted storage

2. **Authentication**
   - JWT tokens (7-day expiry)
   - Token verification on protected routes
   - Authorization checks

3. **File Upload**
   - MIME type validation
   - Size restrictions (10MB)
   - Unique filename generation

4. **Data Validation**
   - Zod schema validation
   - Input sanitization
   - CORS ready

## User Flows

### Registration & Login
- Visit `/` landing page
- Click "Sign Up" or "Log In"
- Enter credentials
- JWT token stored in localStorage
- Redirected to dashboard

### Profile Management
- View profile at `/profile/[userId]`
- Edit information and upload picture
- Changes saved to database

### Project Collaboration
- Create projects from dashboard
- Add team members
- Upload and share documents
- Track project status

## Database Relationships

```
users (1) ──→ (many) projects (owner)
users (1) ──→ (many) connections
users (1) ──→ (many) project_members
users (1) ──→ (many) documents (uploader)
projects (1) ──→ (many) project_members
projects (1) ──→ (many) documents
```

## Future Enhancements

- Real-time messaging
- Email notifications
- Advanced search
- Portfolio gallery
- Skills endorsement
- Activity feed
- Permission levels
- Project templates

## Contributing

Contributions welcome! Follow existing code structure and test features.

## License

MIT License - Open source

---

**Created:** December 2025 | **Version:** 1.0.0 | **Platform:** Next.js + MySQL

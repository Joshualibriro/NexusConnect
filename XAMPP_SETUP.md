# NexusConnect - XAMPP Setup Guide

## Prerequisites
- XAMPP installed (download from https://www.apachefriends.org/)
- Node.js 18+ installed
- The NexusConnect project folder

## Step-by-Step Setup

### Step 1: Start XAMPP Services

1. Open **XAMPP Control Panel**
2. Click **Start** for:
   - Apache (optional - only needed if serving web content)
   - MySQL (REQUIRED)
3. MySQL should show as "Running" with a green checkmark

### Step 2: Create Database

1. Open your browser and go to: **http://localhost/phpmyadmin**
2. Login (default: username `root`, no password)
3. Click **New** on the left sidebar
4. Enter database name: `nexusconnect`
5. Click **Create**

### Step 3: Import Database Schema

1. In phpMyAdmin, click on the `nexusconnect` database
2. Click the **Import** tab
3. Click **Choose File** and select: `database.sql` (from your NexusConnect folder)
4. Click **Import**
5. You should see success message with tables created

**Verify:** You should see 7 tables:
- connections
- documents
- messages
- portfolio_items
- project_members
- projects
- users

### Step 4: Configure Environment Variables

Navigate to your NexusConnect project folder and edit `.env.local`:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=nexusconnect
JWT_SECRET=your_super_secret_jwt_key_here_change_this
NEXTAUTH_SECRET=your_nextauth_secret_key_here_change_this
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_MAX_FILE_SIZE=10485760
```

**Important Notes:**
- `DB_USER=root` (XAMPP default)
- `DB_PASSWORD=` (leave empty - XAMPP default has no password)
- `DB_HOST=localhost` (XAMPP MySQL runs on localhost)

### Step 5: Run NexusConnect Development Server

Open PowerShell/Command Prompt in your NexusConnect project folder:

```bash
# Install dependencies (if not done)
npm install

# Start development server
npm run dev
```

You should see:
```
▲ Next.js 16.0.7
Local:        http://localhost:3000
```

### Step 6: Access the Application

1. Open browser: **http://localhost:3000**
2. You should see the NexusConnect landing page
3. Click **Sign Up** to create an account
4. Test the application!

## Troubleshooting

### MySQL Connection Error

**Error:** "Cannot find module or connection error"

**Solution:**
1. Verify MySQL is running in XAMPP (green checkmark)
2. Check `.env.local` has correct settings
3. Verify database `nexusconnect` exists in phpMyAdmin
4. Try this in PowerShell:
```bash
mysql -u root -e "SHOW DATABASES;"
```
You should see `nexusconnect` in the list

### Port Already in Use

**Error:** "Port 3000 already in use"

**Solution:**
```bash
# Kill process on port 3000
Get-Process node | Stop-Process -Force

# Or use different port
npm run dev -- -p 3001
```

### XAMPP MySQL Won't Start

**Solution:**
1. Click the **Logs** button next to MySQL
2. Check for errors
3. Try these steps:
   - Stop MySQL
   - Click **Admin** button to check status
   - Delete `data` folder in `C:\xampp\mysql\data` (backup first!)
   - Restart MySQL

### Database Tables Not Created

**Solution:**
1. Go to phpMyAdmin: http://localhost/phpmyadmin
2. Select `nexusconnect` database
3. Click **Import** tab
4. Upload `database.sql` again
5. Verify tables appear in left sidebar

### File Upload Not Working

**Solution:**
1. Create folder: `public/uploads` in your project
2. Create folder: `public/documents` in your project
3. Make sure these folders have write permissions
4. Restart dev server: `npm run dev`

## Testing the Application

### 1. Register a User
```
Email: test@example.com
Password: Test12345
```

### 2. Login
Use the credentials from registration

### 3. Create a Project
- Click "Create Project" button
- Fill in details
- Submit

### 4. Upload Documents
- Go to project details
- Click "Documents" tab
- Click "Upload Document"
- Select a file (PDF, image, etc.)

### 5. Upload Profile Picture
- Go to your profile
- Upload a profile picture

## Accessing phpMyAdmin

**URL:** http://localhost/phpmyadmin

**Useful Features:**
- View all tables and data
- Run SQL queries
- Export/import databases
- Manage users

## File Structure in XAMPP

```
C:\xampp\
├── mysql/
│   └── data/                  # Your databases stored here
│       └── nexusconnect/      # Our database
├── phpmyadmin/                # Database management tool
└── htdocs/                    # Web server files (not needed for Next.js)
```

## Connecting from Other Devices

To access from another computer on your network:

1. Find your computer's IP:
```bash
ipconfig
```
Look for IPv4 Address (e.g., 192.168.1.100)

2. Change `.env.local`:
```
DB_HOST=192.168.1.100
NEXTAUTH_URL=http://192.168.1.100:3000
```

3. Access from other device:
```
http://192.168.1.100:3000
```

**Note:** Make sure MySQL allows connections from other IPs (default does)

## Production Deployment (Optional)

When ready to deploy:

1. Change `.env.local` to `.env.production.local`
2. Update values for production database
3. Run: `npm run build`
4. Deploy to hosting platform (Vercel, Railway, Heroku, etc.)

## Common XAMPP Ports

- MySQL: `3306`
- phpMyAdmin: `http://localhost/phpmyadmin`
- Apache (web): `http://localhost:80`
- Next.js dev: `http://localhost:3000`

## Useful Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Check if MySQL is running
mysql -u root -e "SELECT 1"

# Connect to MySQL directly
mysql -u root -p nexusconnect

# View all databases
mysql -u root -e "SHOW DATABASES;"
```

## Database Backup

To backup your database:

```bash
# Backup to file
mysqldump -u root nexusconnect > backup.sql

# Restore from file
mysql -u root nexusconnect < backup.sql
```

## Next.js Development vs Production

**Development Mode** (npm run dev)
- Hot reload on file changes
- Detailed error messages
- Slower performance
- Used for development

**Production Mode** (npm run build && npm start)
- Optimized code
- Better performance
- No hot reload
- Used for deployment

## Security Notes

**⚠️ IMPORTANT - Before Production:**

1. **Change JWT_SECRET** - Generate a random string:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

2. **Change NEXTAUTH_SECRET** - Generate another random string

3. **Set DB_PASSWORD** if using MySQL with password

4. **Enable HTTPS** in production

5. **Disable phpMyAdmin** or password protect it

6. **Restrict MySQL access** - Don't expose port 3306

## Getting Help

**Check Logs:**
```bash
# Terminal running npm run dev
# Look for any errors

# XAMPP Control Panel
# Click "Logs" button for MySQL errors

# phpMyAdmin
# Check status messages
```

**Verify Setup:**
1. MySQL running ✓
2. Database created ✓
3. Tables imported ✓
4. .env.local configured ✓
5. npm install completed ✓
6. npm run dev started ✓

If still having issues, check the files:
- `.env.local` - Environment variables
- `database.sql` - Database schema
- Console errors in terminal

---

**You're all set! NexusConnect is now running on XAMPP with MySQL.** 🎉

For full documentation, see `README.md` and `QUICKSTART.md`

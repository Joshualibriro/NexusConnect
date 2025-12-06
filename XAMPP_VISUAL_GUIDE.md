# XAMPP Setup - Visual Step-by-Step Guide

## Step 1: Start XAMPP MySQL Service

**What you'll see:**
- XAMPP Control Panel window
- List of services (Apache, MySQL, etc.)

**What to do:**
1. Open XAMPP Control Panel (Start Menu → XAMPP Control Panel)
2. Look for **MySQL** in the list
3. Click the **Start** button next to MySQL
4. Wait for it to say "Running" with a green indicator
5. You may see "Apache" message - click OK

```
┌─────────────────────────────────────────┐
│         XAMPP Control Panel             │
├─────────────────────────────────────────┤
│ Module    | Port | PID     | Running   │
├─────────────────────────────────────────┤
│ Apache    | 80   | 1234    | ▢ Stop    │
│ MySQL     | 3306 | 5678    | ▢ Stop    │ ← Click Start here
│ FileZilla | 21   | -       | ○ Start   │
│ Tomcat    | 8080 | -       | ○ Start   │
└─────────────────────────────────────────┘
```

**✓ Success:** MySQL shows "Running" with a green checkmark

---

## Step 2: Open phpMyAdmin to Create Database

**What you'll see:**
- Your browser opening to localhost
- phpMyAdmin interface
- Login page (or already logged in)

**What to do:**
1. Open web browser (Chrome, Firefox, Edge, etc.)
2. Go to: `http://localhost/phpmyadmin`
3. You may see login screen - leave fields empty and click Go
4. You should now see phpMyAdmin interface

```
Web Browser Address Bar:
[http://localhost/phpmyadmin] [↓]

phpMyAdmin Screen:
┌────────────────────────────────────────┐
│  phpMyAdmin              [EN] [?] [←]  │
├────────────────────────────────────────┤
│                                        │
│  Welcome to phpMyAdmin                 │
│                                        │
│  Databases:                            │
│  ├─ information_schema                 │
│  ├─ mysql                              │
│  ├─ performance_schema                 │
│  ├─ phpmyadmin                         │
│  └─ test                               │
│                                        │
│  [Create New Database]                 │
│                                        │
└────────────────────────────────────────┘
```

**✓ Success:** You see the phpMyAdmin welcome page

---

## Step 3: Create New Database

**What you'll see:**
- A form to enter database name
- A "Create" button

**What to do:**
1. Look for "Create New Database" section
2. In the text field, type: `nexusconnect`
3. Click the **Create** button
4. Should see success message: "Database nexusconnect created"

```
Input Form:
┌─────────────────────────────────────┐
│ Create new database:                │
│                                     │
│ Database name:  [nexusconnect    ] │
│ Collation:      [utf8_general_ci] │
│                                     │
│ [Create Database]                   │
│                                     │
└─────────────────────────────────────┘

Success Message:
✓ Database nexusconnect created
```

**✓ Success:** You see "Database nexusconnect created" message

---

## Step 4: Import Database Schema

**What you'll see:**
- You're now inside the `nexusconnect` database
- An **Import** tab at the top
- A file upload area

**What to do:**
1. Click on the **Import** tab
2. Click **Choose File**
3. Navigate to your project folder
4. Select `database.sql`
5. Click **Import** button
6. Wait for success message

```
Database: nexusconnect
Tabs: [Structure] [SQL] [Search] [Query] [Export] [Import] [Operations]
                                                            ↓ Click here

Import Screen:
┌─────────────────────────────────────────────┐
│ File to import:                             │
│ [Choose File]  database.sql                 │
│                                             │
│ Format: [SQL ▼]                             │
│ Encoding: [UTF-8 ▼]                        │
│                                             │
│ [Import]                                    │
│                                             │
└─────────────────────────────────────────────┘

Success:
✓ Import finished, 7 tables created
```

**✓ Success:** You see "Import finished" and 7 tables created

---

## Step 5: Verify Database Tables

**What you'll see:**
- Left sidebar showing database structure
- All 7 tables listed

**What to do:**
1. Look at the left sidebar
2. Expand the `nexusconnect` database if needed
3. You should see these 7 tables:
   - connections
   - documents
   - messages
   - portfolio_items
   - project_members
   - projects
   - users

```
Left Sidebar Structure:
└─ localhost
   ├─ information_schema
   ├─ mysql
   ├─ nexusconnect ◄─── Your database
   │  ├─ connections      ✓
   │  ├─ documents        ✓
   │  ├─ messages         ✓
   │  ├─ portfolio_items  ✓
   │  ├─ project_members  ✓
   │  ├─ projects         ✓
   │  └─ users            ✓
   ├─ performance_schema
   └─ test
```

**✓ Success:** All 7 tables are visible in the left sidebar

---

## Step 6: Configure .env.local

**What you'll see:**
- Your code editor with `.env.local` file open
- Various configuration variables

**What to do:**
1. Open your project folder in a code editor (VS Code, Notepad++, etc.)
2. Find or create file: `.env.local`
3. Copy this content into it:

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

4. Save the file (Ctrl+S)

```
.env.local File Content:
┌─────────────────────────────────────────┐
│ # Database Configuration                │
│ DB_HOST=localhost                       │
│ DB_USER=root                            │
│ DB_PASSWORD=                            │
│ DB_NAME=nexusconnect                    │
│                                         │
│ # Authentication                        │
│ JWT_SECRET=your_super_secret_jwt_key... │
│ NEXTAUTH_SECRET=your_nextauth_secret... │
│                                         │
│ # URLs                                  │
│ NEXTAUTH_URL=http://localhost:3000      │
│ NEXT_PUBLIC_API_URL=http://localhost... │
│                                         │
└─────────────────────────────────────────┘
```

**✓ Success:** `.env.local` file is saved with correct values

---

## Step 7: Open PowerShell Terminal

**What you'll see:**
- Windows PowerShell window
- Command prompt ready for input

**What to do:**
1. Hold **Shift** and right-click in your project folder
2. Select **"Open PowerShell window here"**
3. Or manually navigate:
   - Open PowerShell (Start Menu → PowerShell)
   - Type: `cd C:\Users\joshualibriro\Downloads\nexsusconnect`
   - Press Enter

```
PowerShell Window:
┌──────────────────────────────────────────┐
│ PS C:\Users\joshualibriro\Downloads\n... │
│                                          │
│ PS>  ◄─── Command prompt (ready for input)
│                                          │
└──────────────────────────────────────────┘
```

**✓ Success:** PowerShell is open in your project directory

---

## Step 8: Install Dependencies

**What you'll see:**
- Many npm packages being downloaded
- Installation progress messages
- "added XXX packages" when complete

**What to do:**
1. In PowerShell, type: `npm install`
2. Press Enter
3. Wait for installation (1-2 minutes)
4. Look for: "added 421 packages" or similar

```
PowerShell Command:
PS > npm install

Output:
npm notice
npm notice New major version of npm available: 9.8.1 -> 10.2.3
added 421 packages, and audited 422 packages in 45s
found 0 vulnerabilities

PS > ◄─── Ready for next command
```

**✓ Success:** Installation complete with "found 0 vulnerabilities"

---

## Step 9: Start Development Server

**What you'll see:**
- Server starting messages
- "Local: http://localhost:3000"
- Compilation messages
- Server ready to accept requests

**What to do:**
1. In PowerShell, type: `npm run dev`
2. Press Enter
3. Wait for "▲ Next.js" message and "Compiled successfully"

```
PowerShell Command:
PS > npm run dev

Output:
▲ Next.js 16.0.7
  - Environments: .env.local

Γö£ Next.js 16.0.7 (Turbopack)
  Creating an optimized production build...
  ✓ Compiled successfully

  ▲ Local:        http://localhost:3000
  
  ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

**✓ Success:** Server is running and ready

---

## Step 10: Open Application in Browser

**What you'll see:**
- Beautiful landing page
- Navigation with "Log In" and "Sign Up" buttons
- Feature cards below
- Professional layout

**What to do:**
1. Open web browser
2. Go to: `http://localhost:3000`
3. You should see the NexusConnect homepage

```
Browser Window:
Address Bar: [http://localhost:3000]

Page Content:
┌────────────────────────────────────────┐
│                                        │
│    NexusConnect                        │
│    [Log In]  [Sign Up]                 │
│                                        │
│    Connect, Collaborate, Create        │
│                                        │
│    [Get Started]  [Sign In]            │
│                                        │
│    ┌──────────┐  ┌──────────┐         │
│    │👥 Network│  │📁Project │         │
│    │          │  │          │         │
│    └──────────┘  └──────────┘         │
│                                        │
└────────────────────────────────────────┘
```

**✓ Success:** Application is running and accessible!

---

## Step 11: Test Registration

**What you'll see:**
- Sign Up form
- Fields for email, password, name
- Success message after submission

**What to do:**
1. Click **Sign Up** button
2. Fill in the form:
   ```
   Email: testuser@example.com
   First Name: Test
   Last Name: User
   Password: TestPassword123
   Confirm Password: TestPassword123
   ```
3. Click **Register**
4. You should see: "Registration successful! Please log in."

```
Registration Form:
┌────────────────────────────────────┐
│ NexusConnect                       │
│ Join the professional network      │
│                                    │
│ First Name: [Test          ]       │
│ Last Name:  [User          ]       │
│ Email:      [test@example.c]       │
│ Password:   [••••••••••••••]       │
│ Confirm:    [••••••••••••••]       │
│                                    │
│ [Register]                         │
│                                    │
│ Already have an account? Log in    │
└────────────────────────────────────┘

Success Message:
✓ Registration successful! Please log in.
```

**✓ Success:** Account created!

---

## Step 12: Test Login

**What you'll see:**
- Login form
- Success message
- Redirect to dashboard

**What to do:**
1. Enter login credentials:
   ```
   Email: testuser@example.com
   Password: TestPassword123
   ```
2. Click **Log In**
3. You should be redirected to `/dashboard`

```
Login Form:
┌────────────────────────────────────┐
│ NexusConnect                       │
│ Professional networking platform   │
│                                    │
│ Email:    [testuser@example.com]   │
│ Password: [••••••••••••••]         │
│                                    │
│ [Log In]                           │
│                                    │
│ Don't have an account? Sign up     │
└────────────────────────────────────┘

After Login → Dashboard:
┌────────────────────────────────────┐
│ Welcome back!                      │
│ Discover and join exciting...      │
│                                    │
│ Recent Projects                    │
│ ┌──────────────────────────┐      │
│ │ No projects available   │      │
│ │ [Create first project]  │      │
│ └──────────────────────────┘      │
└────────────────────────────────────┘
```

**✓ Success:** Login works and you're in the dashboard!

---

## Congratulations! 🎉

Your NexusConnect application is now:
- ✓ Running on XAMPP MySQL
- ✓ Accessible at http://localhost:3000
- ✓ Ready for development and testing
- ✓ Connected to local database

## Next Steps

1. **Create Projects** - Click "Create Project" button
2. **Upload Documents** - Share files in projects
3. **Upload Profile Picture** - Customize your profile
4. **Explore Features** - Test all functionality

## Keeping It Running

**PowerShell Window:**
- Keep this open while developing
- All logs appear here
- Press Ctrl+C to stop server

**XAMPP Control Panel:**
- Keep MySQL running
- Click Stop if you want to close
- Can minimize to tray

**Database:**
- View at: http://localhost/phpmyadmin
- Monitor with SQL queries
- Backup regularly

---

**Enjoy NexusConnect! Happy coding! 🚀**

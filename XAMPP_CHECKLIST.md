# XAMPP Setup Checklist

Copy and paste this checklist as you complete each step:

## Before You Start
- [ ] XAMPP installed on computer
- [ ] Node.js 18+ installed
- [ ] NexusConnect project downloaded

## XAMPP Setup
- [ ] XAMPP Control Panel opened
- [ ] MySQL service started (green checkmark)
- [ ] Apache service started (optional)

## Database Setup
- [ ] Opened http://localhost/phpmyadmin
- [ ] Created database: `nexusconnect`
- [ ] Imported `database.sql` file
- [ ] Verified 7 tables created:
  - [ ] connections
  - [ ] documents
  - [ ] messages
  - [ ] portfolio_items
  - [ ] project_members
  - [ ] projects
  - [ ] users

## Project Setup
- [ ] Navigated to project folder in PowerShell
- [ ] Ran `npm install` (if needed)
- [ ] Edited `.env.local` file with:
  - [ ] DB_HOST=localhost
  - [ ] DB_USER=root
  - [ ] DB_PASSWORD= (empty)
  - [ ] DB_NAME=nexusconnect
  - [ ] JWT_SECRET=your_secret_key
  - [ ] NEXTAUTH_SECRET=your_secret_key

## Start Application
- [ ] Ran `npm run dev` in PowerShell
- [ ] Server started without errors
- [ ] Opened http://localhost:3000 in browser

## Test Application
- [ ] Landing page loads
- [ ] Can click "Sign Up"
- [ ] Can create account
- [ ] Can log in
- [ ] Can view dashboard
- [ ] Can create project
- [ ] Can upload files

## Troubleshooting
- [ ] MySQL connection works (tested)
- [ ] Database tables visible in phpMyAdmin
- [ ] No port conflicts (3000, 3306)
- [ ] File permissions set correctly
- [ ] .env.local has correct credentials

## Optional - Advanced
- [ ] MySQL password set
- [ ] Auto-backup configured
- [ ] Accessed from another device on network
- [ ] Production build tested (npm run build)

---

## Quick Reference

**Start Everything:**
1. Open XAMPP Control Panel → Start MySQL
2. Open PowerShell in project folder
3. Run: `npm run dev`
4. Open: http://localhost:3000

**Stop Everything:**
1. Stop MySQL in XAMPP Control Panel
2. Press Ctrl+C in PowerShell terminal

**Test Connection:**
```bash
mysql -u root -e "SHOW DATABASES;"
```

**View Database:**
http://localhost/phpmyadmin → nexusconnect

**Database Tables:**
- users (authentication)
- projects (project data)
- project_members (team members)
- documents (files)
- connections (networking)
- messages (messaging)
- portfolio_items (portfolios)

**Environment Variables Needed:**
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=nexusconnect
JWT_SECRET=generate_random_string
NEXTAUTH_SECRET=generate_random_string
```

**Ports Used:**
- MySQL: 3306
- phpMyAdmin: 80 (http://localhost/phpmyadmin)
- Next.js Dev: 3000 (http://localhost:3000)

---

**Status: ✓ Ready for XAMPP Setup**

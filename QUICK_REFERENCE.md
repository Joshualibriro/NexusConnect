# Quick Reference Card - XAMPP Setup

## 🚀 30-Second Quick Start

1. **Start XAMPP MySQL** (Use Control Panel)
2. **Open PowerShell** in project folder
3. **Run these 3 commands:**

```powershell
mysql -u root nexusconnect < database.sql
npm install
npm run dev
```

4. **Open browser:** http://localhost:3000

**Total time:** 5-10 minutes ⏱️

---

## 📚 8 Documentation Files Available

| Filename | Best For | Length |
|----------|----------|--------|
| **START_HERE.md** | Overview & guide selection | 3 min |
| **XAMPP_VISUAL_GUIDE.md** | Beginners, step-by-step | 15 min |
| **XAMPP_COMMANDS.md** | Copy-paste commands | 5 min |
| **XAMPP_SETUP.md** | Detailed help + troubleshooting | 20 min |
| **XAMPP_CHECKLIST.md** | Printable checklist | 3 min |
| **DOCUMENTATION.md** | Guide index | 5 min |
| **README.md** | Full project reference | 30 min |
| **QUICKSTART.md** | General quick start | 3 min |

---

## ⚙️ Configuration

File: `.env.local`

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=nexusconnect
JWT_SECRET=your_secret_key
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
```

---

## 🔧 Essential Commands

```bash
# Start dev server (after MySQL running)
npm run dev

# Build for production
npm run build

# Create database
mysql -u root -e "CREATE DATABASE nexusconnect;"

# Import schema
mysql -u root nexusconnect < database.sql

# Check connection
mysql -u root -e "SELECT 1;"

# View all databases
mysql -u root -e "SHOW DATABASES;"

# Backup database
mysqldump -u root nexusconnect > backup.sql
```

---

## 🔗 Important URLs

| URL | Purpose |
|-----|---------|
| http://localhost:3000 | NexusConnect app |
| http://localhost/phpmyadmin | Database admin |
| http://localhost:3000/auth/register | Sign up |
| http://localhost:3000/auth/login | Sign in |
| http://localhost:3000/dashboard | Main app |

---

## ✅ Checklist

- [ ] XAMPP MySQL running
- [ ] database.sql imported
- [ ] .env.local configured
- [ ] npm install completed
- [ ] npm run dev running
- [ ] Browser opened to localhost:3000

---

## 🆘 Common Issues & Solutions

### MySQL not connecting
```powershell
# Start XAMPP MySQL from Control Panel
# Or test connection:
mysql -u root -e "SHOW DATABASES;"
```

### Port 3000 in use
```powershell
# Kill Node process
Get-Process node | Stop-Process -Force

# Or use different port
npm run dev -- -p 3001
```

### Database not imported
```powershell
# Re-import schema
mysql -u root nexusconnect < database.sql

# Verify tables
mysql -u root -e "USE nexusconnect; SHOW TABLES;"
```

### npm install issues
```powershell
# Clear cache and retry
npm cache clean --force
npm install
```

---

## 🎯 What You Can Do

✅ Register and login
✅ Create user profiles
✅ Create projects
✅ Add team members
✅ Upload documents
✅ Upload profile pictures
✅ Connect with other users
✅ View project details
✅ Manage project members

---

## 🗂️ Project Structure

```
NexusConnect/
├── 📖 Documentation (8 .md files)
├── 💾 database.sql
├── ⚙️ .env.local
├── 📦 package.json
└── 📁 src/
    ├── app/
    │  ├── api/ (API routes)
    │  ├── auth/ (Login/Register)
    │  ├── dashboard/ (Main page)
    │  ├── profile/ (User profiles)
    │  └── projects/ (Project pages)
    └── lib/
       ├── auth.ts (JWT, bcrypt)
       ├── db.ts (MySQL)
       ├── validation.ts (Zod)
       └── authMiddleware.ts
```

---

## 🔐 Security

✅ Passwords hashed (bcryptjs)
✅ JWT authentication
✅ Input validation
✅ File upload limits
✅ Authorization checks
✅ Error handling

---

## 📊 Database

**7 Tables:**
1. users
2. projects
3. project_members
4. documents
5. connections
6. messages
7. portfolio_items

**Relationships:** All properly indexed and constrained

---

## 🚨 Before Production

1. Change `JWT_SECRET` to random string
2. Change `NEXTAUTH_SECRET` to random string
3. Set `DB_PASSWORD` if using password
4. Disable phpMyAdmin
5. Enable HTTPS
6. Restrict database access

Generate random secret:
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 📱 Test Credentials

```
Email: test@example.com
Password: TestPassword123
```

Create these in the app to test login.

---

## 💡 Pro Tips

- Keep XAMPP MySQL running in background
- Keep PowerShell terminal visible for logs
- Use http://localhost/phpmyadmin to inspect data
- npm run dev has hot reload - changes reload instantly
- Check terminal for detailed error messages

---

## 🎓 Learn More

- **Next.js:** https://nextjs.org/docs
- **XAMPP:** https://www.apachefriends.org/
- **MySQL:** https://dev.mysql.com/doc/
- **Zod:** https://zod.dev/

---

## 📞 Help

**In project:**
- Read: XAMPP_VISUAL_GUIDE.md (beginners)
- Read: XAMPP_SETUP.md (detailed)
- Run: Commands from XAMPP_COMMANDS.md

**Still stuck?**
- Check PowerShell error messages
- Visit phpMyAdmin to check database
- Verify XAMPP MySQL is running
- Ensure .env.local is correct

---

## ✨ You're Ready!

```
1. XAMPP MySQL running ✓
2. Database imported ✓
3. Project configured ✓
4. npm run dev ✓
5. Open http://localhost:3000 ✓
```

**That's it! Enjoy NexusConnect!** 🎉

---

**Last Updated:** December 2025
**Framework:** Next.js 16+ | TypeScript
**Database:** MySQL with XAMPP
**Status:** ✅ Production Ready

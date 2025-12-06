# XAMPP Setup - Copy & Paste Commands

## For Windows PowerShell

### Step 1: Create Database (Run in PowerShell)

```powershell
# Create database
mysql -u root -e "CREATE DATABASE IF NOT EXISTS nexusconnect;"

# Verify it was created
mysql -u root -e "SHOW DATABASES;"
```

Expected output should show `nexusconnect` in the list.

### Step 2: Import Schema (Run in PowerShell)

Navigate to your project folder first:

```powershell
# Change to project directory
cd C:\Users\joshualibriro\Downloads\nexsusconnect

# Import database schema
mysql -u root nexusconnect < database.sql

# Verify tables were created
mysql -u root -e "USE nexusconnect; SHOW TABLES;"
```

Expected output should show 7 tables:
```
+-----------------------------+
| Tables_in_nexusconnect      |
+-----------------------------+
| connections                 |
| documents                   |
| messages                    |
| portfolio_items             |
| project_members             |
| projects                    |
| users                       |
+-----------------------------+
```

### Step 3: Verify .env.local Configuration

Open `.env.local` in your project and verify it contains:

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

If .env.local doesn't exist, create it with the above content.

### Step 4: Install Dependencies (Run in PowerShell)

```powershell
# Make sure you're in the project directory
cd C:\Users\joshualibriro\Downloads\nexsusconnect

# Install npm packages
npm install
```

### Step 5: Start Development Server (Run in PowerShell)

```powershell
# Start the development server
npm run dev
```

You should see:
```
▲ Next.js 16.0.7
  - Local:        http://localhost:3000
  - Environments: .env.local
```

### Step 6: Access Application

Open your browser and go to:
```
http://localhost:3000
```

## Verification Commands

### Check MySQL is Running

```powershell
# Test MySQL connection
mysql -u root -e "SELECT 1;"
```

Should return: `1`

### View All Databases

```powershell
mysql -u root -e "SHOW DATABASES;"
```

### View All Tables in nexusconnect

```powershell
mysql -u root -e "USE nexusconnect; SHOW TABLES;"
```

### View Table Structure (Example: users table)

```powershell
mysql -u root -e "USE nexusconnect; DESCRIBE users;"
```

### Check if Port 3000 is Available

```powershell
# Check if port 3000 is in use
netstat -ano | findstr :3000
```

If nothing shows, port 3000 is available.

### Check if Port 3306 is Available (MySQL)

```powershell
# Check if port 3306 is in use
netstat -ano | findstr :3306
```

Should show MySQL is listening.

## Troubleshooting Commands

### Kill Process Using Port 3000

```powershell
# Find and kill process on port 3000
Get-Process node | Stop-Process -Force

# Or kill specific process
taskkill /PID <process_id> /F
```

### Backup Database

```powershell
# Backup to file
mysqldump -u root nexusconnect > nexusconnect_backup.sql

# Verify backup was created
Get-Item nexusconnect_backup.sql
```

### Restore Database from Backup

```powershell
# Restore from backup
mysql -u root nexusconnect < nexusconnect_backup.sql
```

### Reset Database (Delete and Recreate)

```powershell
# WARNING: This deletes all data!
mysql -u root -e "DROP DATABASE nexusconnect;"

# Create fresh database
mysql -u root -e "CREATE DATABASE nexusconnect;"

# Import schema
mysql -u root nexusconnect < database.sql
```

### Test Database Connection from Node

```powershell
# Create test file
@'
const mysql = require('mysql2/promise');

async function test() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'nexusconnect'
    });
    console.log('✓ Database connected!');
    await connection.end();
  } catch (err) {
    console.error('✗ Connection failed:', err.message);
  }
}

test();
'@ | Out-File -FilePath test-db.js

# Run test
node test-db.js

# Clean up
Remove-Item test-db.js
```

### View Application Logs

```powershell
# Logs are displayed in the terminal where you ran npm run dev
# Look for any error messages

# To save logs to file, restart with:
npm run dev > logs.txt 2>&1
```

## Start/Stop Quick Commands

### Start Everything

```powershell
# 1. Start XAMPP MySQL (use XAMPP Control Panel GUI)

# 2. Navigate to project
cd C:\Users\joshualibriro\Downloads\nexsusconnect

# 3. Start Next.js
npm run dev
```

### Stop Everything

```powershell
# 1. Stop MySQL (use XAMPP Control Panel GUI)

# 2. Stop Next.js (in PowerShell where it's running)
# Press: Ctrl + C

# 3. Close XAMPP Control Panel
```

## Full Setup Script (All-in-One)

Run these commands in order:

```powershell
# 1. Create database
mysql -u root -e "CREATE DATABASE IF NOT EXISTS nexusconnect;"

# 2. Navigate to project
cd C:\Users\joshualibriro\Downloads\nexsusconnect

# 3. Import schema
mysql -u root nexusconnect < database.sql

# 4. Verify tables
mysql -u root -e "USE nexusconnect; SHOW TABLES;"

# 5. Install dependencies
npm install

# 6. Start development server
npm run dev
```

Then open: `http://localhost:3000`

## Environment Variables - If .env.local Missing

Create `.env.local` in project root with:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=nexusconnect
JWT_SECRET=mysupersecretkey12345678901234
NEXTAUTH_SECRET=myauthsecretkey12345678901234
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_MAX_FILE_SIZE=10485760
```

To generate random secret keys:

```powershell
# Generate random JWT secret
[System.Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Testing Endpoints

After application is running, test these URLs:

```
http://localhost:3000/              # Landing page
http://localhost:3000/auth/login    # Login page
http://localhost:3000/auth/register # Registration page
http://localhost:3000/dashboard     # Dashboard (requires login)
http://localhost/phpmyadmin         # Database management
```

## API Testing with PowerShell

```powershell
# Register a new user
$body = @{
    email = "test@example.com"
    password = "Test12345"
    confirmPassword = "Test12345"
    firstName = "Test"
    lastName = "User"
} | ConvertTo-Json

Invoke-WebRequest -Uri http://localhost:3000/api/auth/register `
  -Method POST `
  -ContentType "application/json" `
  -Body $body
```

## Performance Monitoring

```powershell
# Monitor resource usage while running
# Use Windows Task Manager > Performance tab

# Or from PowerShell
Get-Process node | Select-Object ProcessName, CPU, Memory

# Or use tasklist
tasklist /fi "imagename eq node.exe"
```

---

**Ready to go!** Follow the "Full Setup Script" section for fastest setup. 🚀

# 🚀 QUICK START GUIDE - Get Running in 5 Minutes!

## 1️⃣ Prerequisites Check

Make sure you have:
- ✅ Node.js v16+ installed
- ✅ MongoDB v4+ installed
- ✅ npm or yarn

## 2️⃣ Backend Setup (Terminal 1)

```bash
# Step 1: Navigate to backend
cd backend

# Step 2: Install dependencies
npm install

# Step 3: Create .env file
cat > .env << EOL
PORT=5000
MONGO_URI=mongodb://localhost:27017/task-manager
JWT_SECRET=my_super_secret_jwt_key_change_in_production
ADMIN_INVITE_TOKEN=admin123
CLIENT_URL=http://localhost:5173
EOL

# Step 4: Start MongoDB (if not running)
# On Mac: brew services start mongodb-community
# On Windows: net start MongoDB
# On Linux: sudo systemctl start mongod

# Step 5: Start backend
npm start
```

**✅ Backend is ready when you see:** `Server running on port 5000` & `MongoDB Connected`

---

## 3️⃣ Frontend Setup (Terminal 2 - NEW WINDOW)

```bash
# Step 1: Navigate to frontend
cd frontend/Task-Manager

# Step 2: Install dependencies
npm install

# Step 3: Start frontend
npm run dev
```

**✅ Frontend is ready when you see:** `Local: http://localhost:5173`

---

## 4️⃣ First Time Setup

### 🔐 Create Admin Account

1. **Open Browser:** `http://localhost:5173`
2. **Click "Sign Up"**
3. **Fill in Form:**
   - Name: Admin User
   - Email: admin@test.com
   - Password: Admin@123
   - **Admin Token:** `admin123` (from your .env)
4. **Click "Sign Up"**

### 🎯 Create First Project

1. **Go to "Projects"** (in sidebar)
2. **Click "New Project"**
3. **Fill in details:**
   - Name: Test Project
   - Description: My first project
   - Start Date: Today
   - End Date: Next month
   - Priority: High
   - Status: Active
4. **Click "Create Project"**

### ✅ Create First Task

1. **Click "Add Task"** from project
2. **Fill in details:**
   - Title: Test Task
   - **Project:** Select the project you created
   - Description: My first task
   - Priority: High
   - Due Date: Tomorrow
   - Assigned To: Select yourself
3. **Click "Create Task"**

---

## 5️⃣ Test Everything

✅ Login/Logout  
✅ Create Project  
✅ Create Task  
✅ View Dashboard  
✅ Update Task Status  
✅ Filter Projects  

---

## 🎉 YOU'RE DONE!

**Backend:** `http://localhost:5000`  
**Frontend:** `http://localhost:5173`

**Default Credentials:**
- **Admin:** admin@test.com / Admin@123
- **Member:** member@test.com / Member@123 (You need to create this)

---

## 🚨 Common Issues

### ❌ MongoDB Connection Error
```bash
# Make sure MongoDB is running
# Mac:
brew services start mongodb-community

# Windows:
net start MongoDB

# Linux:
sudo systemctl start mongod
```

### ❌ Port Already in Use
```bash
# Kill process on port 5000 (Backend)
# Mac/Linux:
lsof -ti:5000 | xargs kill

# Windows:
netstat -ano | findstr :5000
# Then: taskkill /PID [PID_NUMBER] /F
```

### ❌ Dependencies Error
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Next Steps

- 📖 Read [README.md](./README.md) for full documentation
- 🔧 Check [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed setup
- ✨ See [FEATURES.md](./FEATURES.md) for complete feature list

---

**🎊 Happy Coding! You're all set!**

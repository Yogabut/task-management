# 🚀 Complete Setup Guide - Task & Project Management System

This guide will walk you through setting up the entire application from scratch.

---

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Backend Setup](#backend-setup)
3. [Frontend Setup](#frontend-setup)
4. [First-Time Setup](#first-time-setup)
5. [Testing the Application](#testing-the-application)
6. [Troubleshooting](#troubleshooting)

---

## 1. Prerequisites

Before starting, ensure you have the following installed:

### Required Software
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** (for cloning) - [Download](https://git-scm.com/)

### Verify Installation
```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check MongoDB
mongod --version
```

---

## 2. Backend Setup

### Step 1: Navigate to Backend Directory
```bash
cd backend
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install:
- express
- mongoose
- jsonwebtoken
- bcryptjs
- cors
- dotenv
- multer
- exceljs

### Step 3: Create `.env` File

Create a new file named `.env` in the `backend` directory:

```env
# Server Configuration
PORT=5000

# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/task-manager

# JWT Configuration (Change this to a secure random string)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Admin Registration Token (Change this to a secure secret)
ADMIN_INVITE_TOKEN=admin_secret_token_change_this

# Client Configuration (Frontend URL)
CLIENT_URL=http://localhost:5173
```

### Step 4: Start MongoDB

**On Windows:**
```bash
# Open a new terminal and run:
mongod
```

**On Mac (with Homebrew):**
```bash
# Start MongoDB service
brew services start mongodb-community
```

**On Linux:**
```bash
sudo systemctl start mongod
```

### Step 5: Start Backend Server
```bash
npm start
# or for development with auto-restart:
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB Connected
```

---

## 3. Frontend Setup

### Step 1: Navigate to Frontend Directory

Open a **NEW terminal** window and navigate to frontend:
```bash
cd frontend/Task-Manager
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install:
- react
- react-router-dom
- axios
- react-hot-toast
- react-icons
- moment
- tailwindcss
- recharts

### Step 3: Create `.env` File (Optional)

If the backend is on a different URL, create `.env` in the frontend directory:
```env
VITE_API_URL=http://localhost:5000/api
```

### Step 4: Start Frontend Server
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

---

## 4. First-Time Setup

### Step 1: Create Admin Account

1. **Open your browser** and go to: `http://localhost:5173`

2. **Navigate to Sign Up** page

3. **Register Admin Account:**
   - Name: Your Name
   - Email: admin@example.com
   - Password: Admin@123 (or your choice)
   - **Admin Token**: Enter the token from your `.env` file (`ADMIN_INVITE_TOKEN`)
   - Click "Sign Up"

4. **Login with Admin Credentials**

### Step 2: Create Your First Project

1. **Navigate to Projects** (in sidebar)
2. **Click "New Project"**
3. **Fill in Details:**
   - Name: "Website Redesign"
   - Description: "Redesign company website with modern UI"
   - Start Date: Today's date
   - End Date: A future date
   - Status: "Active"
   - Priority: "High"
   - Budget: 10000
4. **Click "Create Project"**

### Step 3: Create Your First Task

1. **Navigate to Tasks** OR click "Add Task" from project details
2. **Fill in Task Details:**
   - **Project**: Select the project you just created
   - **Title**: "Design Homepage"
   - **Description**: "Create mockup for new homepage"
   - **Priority**: "High"
   - **Due Date**: Pick a date
   - **Assign To**: Select yourself
   - **Todo Checklist** (optional):
     - Research competitors
     - Create wireframe
     - Design mockup
3. **Click "Create Task"**

### Step 4: Create Member Account

1. **Logout** from admin account
2. **Go to Sign Up**
3. **Register Member Account** (WITHOUT admin token):
   - Name: Team Member
   - Email: member@example.com
   - Password: Member@123
   - **Do NOT enter admin token**
4. **Login with Member Credentials**
5. **View assigned tasks**

---

## 5. Testing the Application

### Test Checklist

#### ✅ Authentication
- [ ] Register admin account with token
- [ ] Register member account without token
- [ ] Login with correct credentials
- [ ] Login with wrong credentials (should fail)
- [ ] Access admin routes as admin
- [ ] Access admin routes as member (should fail)

#### ✅ Projects (Admin Only)
- [ ] Create a new project
- [ ] View all projects
- [ ] View single project details
- [ ] Update project information
- [ ] Try to delete project with tasks (should fail)
- [ ] View project statistics

#### ✅ Tasks
- [ ] Create task (Admin only)
- [ ] View all tasks
- [ ] View single task details
- [ ] Update task status
- [ ] Update task checklist
- [ ] Filter tasks by project
- [ ] Filter tasks by status
- [ ] Assign task to team members

#### ✅ Dashboard
- [ ] View admin dashboard with statistics
- [ ] View user dashboard with assigned tasks
- [ ] Check task counts are accurate

---

## 6. Troubleshooting

### MongoDB Connection Error

**Error:** `MongoNetworkError: connect ECONNREFUSED`

**Solution:**
1. Ensure MongoDB is running:
   ```bash
   # Check if MongoDB is running
   ps aux | grep mongo  # On Mac/Linux
   
   # Start MongoDB
   mongod  # Or use the appropriate command for your system
   ```

2. Check `MONGO_URI` in backend `.env`:
   ```env
   MONGO_URI=mongodb://localhost:27017/task-manager
   ```

---

### Port Already in Use

**Error:** `Port 5000 is already in use`

**Solution:**
1. Kill the process using the port:
   ```bash
   # On Mac/Linux
   lsof -ti:5000 | xargs kill
   
   # On Windows
   netstat -ano | findstr :5000
   taskkill /PID [PID_NUMBER] /F
   ```

2. OR change the port in backend `.env`:
   ```env
   PORT=5001  # Use a different port
   ```

---

### CORS Error

**Error:** `Access-Control-Allow-Origin error`

**Solution:**
1. Check `CLIENT_URL` in backend `.env`:
   ```env
   CLIENT_URL=http://localhost:5173
   ```

2. Restart the backend server after changing `.env`

---

### Frontend Can't Connect to Backend

**Error:** `Network Error` or `Failed to fetch`

**Solution:**
1. Ensure backend is running (`http://localhost:5000`)
2. Check `VITE_API_URL` in frontend `.env`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
3. Restart frontend server after changing `.env`

---

### JWT Token Error

**Error:** `jwt malformed` or `jwt expired`

**Solution:**
1. **Clear browser local storage:**
   - Open DevTools (F12)
   - Go to Application tab
   - Clear all storage
   - Refresh page and login again

2. **Check JWT_SECRET** in backend `.env`

---

### Task Creation Fails - "Project is required"

**Error:** `Project is required` when creating task

**Solution:**
- You MUST select a project when creating a task
- Ensure the project exists
- Project ID must be valid

---

### Admin Token Not Working

**Error:** "Invalid admin token" during registration

**Solution:**
1. Check `ADMIN_INVITE_TOKEN` in backend `.env`
2. Ensure you're entering the EXACT token (case-sensitive)
3. Restart backend server after changing `.env`

---

## 🎯 Default Configuration

### Backend
- **Port:** 5000
- **MongoDB:** localhost:27017
- **Database Name:** task-manager

### Frontend
- **Port:** 5173 (Vite default)
- **API URL:** http://localhost:5000/api

---

## 📝 Important Notes

1. **Admin Token:** Keep your `ADMIN_INVITE_TOKEN` secret! Don't share it.
2. **JWT Secret:** Use a strong, unique secret for `JWT_SECRET` in production.
3. **MongoDB:** Ensure MongoDB is running before starting the backend.
4. **Port Numbers:** Ensure ports 5000 and 5173 are not in use.
5. **Project Required:** All tasks MUST have a project assigned.

---

## 🎉 Success!

If everything is set up correctly, you should see:

✅ Backend running on `http://localhost:5000`  
✅ Frontend running on `http://localhost:5173`  
✅ MongoDB connected  
✅ Admin and Member accounts created  
✅ Projects and tasks working

---

## 📞 Need Help?

If you encounter any issues:
1. Check the [Troubleshooting](#troubleshooting) section
2. Check browser console for errors (F12)
3. Check backend terminal for error messages
4. Ensure all dependencies are installed
5. Verify environment variables are correct

---

## 🚀 What's Next?

- Create more projects and tasks
- Invite team members
- Assign tasks to team members
- Track project progress
- Export reports
- Explore the admin dashboard

---

**Happy Coding! 🎉**

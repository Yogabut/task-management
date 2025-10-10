# 🔧 Troubleshooting Guide - Common Issues & Solutions

## 📋 Common Issues

### 1️⃣ Backend Issues

#### ❌ MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**
```bash
# Check if MongoDB is running
# Mac:
brew services start mongodb-community

# Windows:
net start MongoDB

# Linux:
sudo systemctl start mongod

# Verify it's running:
ps aux | grep mongo  # Mac/Linux
```

#### ❌ Port 5000 Already in Use
```
Error: Port 5000 is already in use
```

**Solution:**
```bash
# Mac/Linux:
lsof -ti:5000 | xargs kill

# Windows:
netstat -ano | findstr :5000
# Then: taskkill /PID [PID_NUMBER] /F

# OR change port in .env:
PORT=5001
```

#### ❌ JWT_SECRET Not Set
```
Error: JWT_SECRET is required
```

**Solution:**
```env
# Add to backend/.env:
JWT_SECRET=your_super_secret_key_change_this_in_production
```

---

### 2️⃣ Frontend Issues

#### ❌ CORS Error
```
Access to XMLHttpRequest at 'http://localhost:5000/api/...' from origin 'http://localhost:5173' has been blocked by CORS
```

**Solution:**
```env
# In backend/.env, add:
CLIENT_URL=http://localhost:5173
```

Then restart backend server.

#### ❌ Dependencies Error
```
Module not found: Error: Can't resolve 'react-router-dom'
```

**Solution:**
```bash
cd frontend/Task-Manager
rm -rf node_modules package-lock.json
npm install
```

#### ❌ Vite Port in Use
```
Port 5173 is in use, trying another one...
```

**Solution:**
```bash
# Kill process or change port in vite.config.js:
export default {
  server: {
    port: 5174  // Change port
  }
}
```

---

### 3️⃣ Authentication Issues

#### ❌ Token Expired / Invalid
```
Error: Token expired or invalid
```

**Solution:**
1. **Clear Browser Storage:**
   - Open DevTools (F12)
   - Go to Application tab
   - Clear storage
   - Refresh page
   - Login again

#### ❌ Admin Token Not Accepted
```
Error: Invalid admin token
```

**Solution:**
1. Check token in backend/.env: `ADMIN_INVITE_TOKEN`
2. Token is case-sensitive
3. Restart backend after changing

---

### 4️⃣ API Issues

#### ❌ Project is Required Error
```
Error: Project is required
```

**Solution:**
- You MUST select a project when creating a task
- The project field is REQUIRED in the Task model

#### ❌ Network Error / Failed to Fetch
```
Error: Network Error or Failed to fetch
```

**Solution:**
1. Check backend is running (http://localhost:5000)
2. Check frontend API URL:
   ```env
   # frontend/Task-Manager/.env
   VITE_API_URL=http://localhost:5000/api
   ```
3. Check CORS settings in backend

---

### 5️⃣ Development Issues

#### ❌ Changes Not Reflecting
**Solution:**
```bash
# Clear cache and restart:
# Backend:
npm cache clean --force
npm install
npm start

# Frontend:
npm cache clean --force
npm install
npm run dev
```

#### ❌ ESLint Errors
**Solution:**
```javascript
// Add to eslint config or ignore:
/* eslint-disable */
```

---

## 🐛 Error Messages & Solutions

### Backend Errors

| Error | Solution |
|-------|----------|
| `MongoDB connection error` | Start MongoDB service |
| `Port already in use` | Kill process or change port |
| `JWT_SECRET not defined` | Add to .env file |
| `Module not found` | Run `npm install` |
| `Cannot find module` | Check file paths, imports |

### Frontend Errors

| Error | Solution |
|-------|----------|
| `Module not found` | Run `npm install` |
| `CORS error` | Set CLIENT_URL in backend |
| `Network error` | Check backend is running |
| `Token expired` | Clear localStorage, re-login |
| `Component not found` | Check import paths |

---

## 🔧 Quick Fixes

### Reset Everything

```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install
npm start

# Frontend
cd frontend/Task-Manager  
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Clear All Data

```bash
# Drop MongoDB database
mongo
use task-manager
db.dropDatabase()
exit

# Clear Browser Storage:
# DevTools (F12) → Application → Clear Storage
```

### Check Services Running

```bash
# Check if backend is running:
curl http://localhost:5000/api

# Check if frontend is running:
# Open browser: http://localhost:5173

# Check MongoDB:
mongo --version
mongod --version
```

---

## 📝 Debugging Tips

### 1. Check Console Logs

**Backend:**
```bash
# Check terminal where backend is running
# Look for errors in red
```

**Frontend:**
```bash
# Open Browser DevTools (F12)
# Check Console tab for errors
# Check Network tab for failed requests
```

### 2. Verify Environment Variables

```bash
# Backend (.env):
cat backend/.env

# Frontend (.env):
cat frontend/Task-Manager/.env
```

### 3. Check API Responses

```bash
# Use curl or Thunder Client to test API:
curl http://localhost:5000/api/projects

# Or use Postman/Thunder Client in VS Code
```

---

## 🚨 Common Mistakes

### ❌ Mistake 1: Not Starting MongoDB
**Fix:** Always start MongoDB before starting backend

### ❌ Mistake 2: Wrong API URL
**Fix:** Ensure VITE_API_URL points to correct backend URL

### ❌ Mistake 3: Token Not Set
**Fix:** Ensure all environment variables are set

### ❌ Mistake 4: Not Restarting Server
**Fix:** Restart backend after changing .env

### ❌ Mistake 5: Wrong Node Version
**Fix:** Use Node.js v16 or higher

---

## 🔍 Step-by-Step Debugging

### Problem: Nothing Works

1. **Check Node Version:**
   ```bash
   node --version  # Should be v16+
   ```

2. **Check MongoDB:**
   ```bash
   mongo --version
   mongod --version
   ```

3. **Check Ports:**
   ```bash
   # Port 5000 (Backend):
   lsof -i:5000  # Mac/Linux
   netstat -ano | findstr :5000  # Windows
   
   # Port 5173 (Frontend):
   lsof -i:5173  # Mac/Linux
   netstat -ano | findstr :5173  # Windows
   ```

4. **Check Dependencies:**
   ```bash
   # Backend:
   cd backend
   npm list --depth=0
   
   # Frontend:
   cd frontend/Task-Manager
   npm list --depth=0
   ```

5. **Check .env Files:**
   ```bash
   # Backend:
   cat backend/.env
   
   # Frontend (if exists):
   cat frontend/Task-Manager/.env
   ```

---

## 💡 Pro Tips

### Tip 1: Use Logs
```javascript
// Add console.logs to debug:
console.log('Data:', data);
console.log('Error:', error);
```

### Tip 2: Check Network Tab
1. Open DevTools (F12)
2. Go to Network tab
3. See failed requests
4. Check request/response

### Tip 3: Use Thunder Client / Postman
- Test API endpoints directly
- Check if backend is working
- Verify request/response

### Tip 4: Check Server Logs
- Backend terminal for errors
- Look for stack traces
- Check error messages

---

## 📞 Still Having Issues?

### Check These:

1. ✅ Node.js v16+ installed
2. ✅ MongoDB running
3. ✅ All dependencies installed
4. ✅ .env files configured
5. ✅ Ports 5000 & 5173 available
6. ✅ Backend running (http://localhost:5000)
7. ✅ Frontend running (http://localhost:5173)
8. ✅ No firewall blocking
9. ✅ No antivirus blocking
10. ✅ Correct file paths

---

## 🎯 Quick Checklist

Before asking for help, verify:

- [ ] MongoDB is running
- [ ] Backend is running (port 5000)
- [ ] Frontend is running (port 5173)
- [ ] .env files are configured
- [ ] Dependencies are installed
- [ ] Ports are not blocked
- [ ] No CORS errors
- [ ] Token is valid
- [ ] Network requests working
- [ ] Console has no errors

---

**💡 Remember:** Most issues are due to:
1. MongoDB not running (90%)
2. Wrong environment variables (8%)
3. Port conflicts (2%)

---

**Good luck! 🚀**

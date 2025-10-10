# 🚀 Deployment Guide - Deploy to Production

This guide will help you deploy your Task & Project Management system to production.

---

## 📦 Deployment Options

### Option 1: Deploy Both Frontend & Backend Together
- Render
- Railway
- Heroku

### Option 2: Deploy Separately (Recommended)
- **Backend:** Render, Railway, Heroku, AWS, DigitalOcean
- **Frontend:** Vercel, Netlify, Cloudflare Pages
- **Database:** MongoDB Atlas (Free tier available)

---

## 🔧 Pre-Deployment Checklist

### Backend
- [ ] Update `JWT_SECRET` to a strong, secure secret
- [ ] Update `ADMIN_INVITE_TOKEN` to a secure token
- [ ] Set up MongoDB Atlas (or production database)
- [ ] Update `MONGO_URI` to production database
- [ ] Set `CLIENT_URL` to your frontend production URL
- [ ] Test all API endpoints
- [ ] Check environment variables are set

### Frontend
- [ ] Update `VITE_API_URL` to production backend URL
- [ ] Test all pages and features
- [ ] Check responsive design
- [ ] Test authentication flow
- [ ] Verify API calls work

---

## 🌐 Deploy Backend (Render - Free)

### Step 1: Prepare Backend for Deployment

1. **Add start script to `backend/package.json`:**
   ```json
   {
     "scripts": {
       "start": "node server.js",
       "dev": "nodemon server.js"
     }
   }
   ```

2. **Create `backend/.env.example`:**
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri_here
   JWT_SECRET=your_jwt_secret_here
   ADMIN_INVITE_TOKEN=your_admin_token_here
   CLIENT_URL=your_frontend_url_here
   ```

### Step 2: MongoDB Atlas Setup

1. **Create Account:** https://www.mongodb.com/cloud/atlas/register
2. **Create Cluster:** (Free tier available)
3. **Get Connection String:**
   - Click "Connect"
   - Select "Connect your application"
   - Copy connection string
   - Replace `<password>` with your database password
   - Example: `mongodb+srv://username:password@cluster.mongodb.net/taskmanager`

### Step 3: Deploy to Render

1. **Create Account:** https://render.com
2. **Click "New +" → "Web Service"**
3. **Connect GitHub Repository** (or upload code)
4. **Configure Service:**
   - Name: `task-manager-backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Plan: Free

5. **Add Environment Variables:**
   ```
   PORT=5000
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager
   JWT_SECRET=your_super_secure_secret_key_change_this
   ADMIN_INVITE_TOKEN=your_admin_secret_token
   CLIENT_URL=https://your-frontend-url.vercel.app
   ```

6. **Deploy** → Click "Create Web Service"

7. **Get Backend URL:** (e.g., `https://task-manager-api.onrender.com`)

---

## 🎨 Deploy Frontend (Vercel - Free)

### Step 1: Prepare Frontend for Deployment

1. **Update `frontend/Task-Manager/.env.production`:**
   ```env
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```

2. **Add `.env.production` to `.gitignore`** (if using Git)

### Step 2: Deploy to Vercel

1. **Create Account:** https://vercel.com
2. **Click "New Project"**
3. **Import Git Repository** (or drag & drop)
4. **Configure Project:**
   - Framework: React
   - Root Directory: `frontend/Task-Manager`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

5. **Add Environment Variable:**
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```

6. **Deploy** → Click "Deploy"

7. **Get Frontend URL:** (e.g., `https://task-manager-app.vercel.app`)

---

## 🔄 Update Backend with Frontend URL

After frontend is deployed:

1. **Go back to Render (Backend)**
2. **Update Environment Variable:**
   ```
   CLIENT_URL=https://your-frontend-url.vercel.app
   ```
3. **Save & Redeploy**

---

## 🧪 Test Production Environment

### Test Checklist:
- [ ] Frontend loads correctly
- [ ] Login works
- [ ] Register works
- [ ] API calls work (check Network tab)
- [ ] Projects CRUD works
- [ ] Tasks CRUD works
- [ ] File upload works
- [ ] Reports download works
- [ ] All features work as expected

---

## 🔒 Security Checklist

### Backend
- [ ] Strong JWT_SECRET (Use random string generator)
- [] Secure ADMIN_INVITE_TOKEN
- [ ] HTTPS enabled (Render provides this)
- [ ] CORS configured correctly
- [ ] Environment variables not exposed
- [ ] MongoDB connection string secure

### Frontend
- [ ] HTTPS enabled (Vercel provides this)
- [ ] API URL correct
- [ ] No sensitive data in code
- [ ] Remove console.logs in production

---

## 📊 Monitoring & Maintenance

### Backend (Render)
- View Logs: Dashboard → Logs
- Monitor CPU/Memory
- Check for errors
- Auto-deploys on Git push

### Frontend (Vercel)
- View Deployments
- Check Analytics
- Monitor Performance
- Auto-deploys on Git push

### Database (MongoDB Atlas)
- Monitor cluster performance
- Check storage usage
- Set up backup (automatic in Atlas)

---

## 🚀 Continuous Deployment

### Automatic Deployment (Recommended)

**Connect Git Repository:**
1. Both Render and Vercel support auto-deploy
2. Push changes to Git → Automatic deployment
3. No manual deployment needed

**Git Workflow:**
```bash
# Make changes
git add .
git commit -m "Update features"
git push origin main

# Automatic deployment happens!
```

---

## 💡 Pro Tips

### Performance Optimization
- ✅ Enable compression (gzip)
- ✅ Optimize images
- ✅ Use CDN for static files
- ✅ Enable caching
- ✅ Lazy load components

### Cost Optimization
- ✅ Use free tiers (Render, Vercel, MongoDB Atlas)
- ✅ Optimize database queries
- ✅ Use indexes in MongoDB
- ✅ Clean up unused resources

### Security Best Practices
- ✅ Use strong passwords
- ✅ Enable 2FA on accounts
- ✅ Regular security updates
- ✅ Monitor for suspicious activity
- ✅ Use environment variables for secrets

---

## 📞 Support & Resources

- **Render Docs:** https://render.com/docs
- **Vercel Docs:** https://vercel.com/docs
- **MongoDB Atlas Docs:** https://docs.atlas.mongodb.com

---

## 🎉 Congratulations!

Your Task & Project Management System is now live! 🚀

**Share it with your team and start managing projects efficiently!**

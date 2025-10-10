# 🏗️ System Architecture & Technical Documentation

## 📐 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                        │
│                     (React + Tailwind CSS)                  │
├─────────────────────────────────────────────────────────────┤
│              ┌──────────────────────────────┐               │
│              │    React Components          │               │
│              │  - Admin Pages               │               │
│              │  - User Pages                │               │
│              │  - Shared Components          │               │
│              └──────────────────────────────┘               │
│                          │                                  │
│              ┌──────────────────────────────┐               │
│              │   Services Layer (API)       │               │
│              │  - projectService.js          │               │
│              │  - taskService.js             │               │
│              │  - authService.js             │               │
│              └──────────────────────────────┘               │
└─────────────────────────────────────────────────────────────┘
                           │
                           │ HTTP/HTTPS (REST API)
                           │
┌─────────────────────────────────────────────────────────────┐
│                    API LAYER (Express.js)                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              ROUTES (Endpoints)                       │  │
│  │  - /api/auth      (Authentication)                    │  │
│  │  - /api/projects  (Projects CRUD)                     │  │
│  │  - /api/tasks     (Tasks CRUD)                        │  │
│  │  - /api/users     (User Management)                   │  │
│  │  - /api/reports   (Reports & Export)                  │  │
│  └──────────────────────────────────────────────────────┘  │
│                          │                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              MIDDLEWARE                                │  │
│  │  - JWT Authentication (auth)                          │  │
│  │  - Role-Based Access (admin/user)                     │  │
│  │  - File Upload (multer)                               │  │
│  │  - CORS (cross-origin)                                │  │
│  │  - Error Handling                                     │  │
│  └──────────────────────────────────────────────────────┘  │
│                          │                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │            CONTROLLERS (Business Logic)               │  │
│  │  - authController                                     │  │
│  │  - projectController                                  │  │
│  │  - taskController                                     │  │
│  │  - userController                                     │  │
│  │  - reportController                                   │  │
│  └──────────────────────────────────────────────────────┘  │
│                          │                                   │
└──────────────────────────────────────────────────────────────┘
                          │
                          │ Mongoose (ODM)
                          │
┌─────────────────────────────────────────────────────────────┐
│                 DATABASE LAYER (MongoDB)                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                    COLLECTIONS                         │  │
│  │  - users      (User accounts & auth)                  │  │
│  │  - projects   (Project data & metadata)               │  │
│  │  - tasks      (Task data & assignments)               │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 🗂️ Database Schema

### Users Collection

```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: ['admin', 'member']),
  profileImageUrl: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Projects Collection

```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  status: String (enum: ['Planning', 'Active', 'On Hold', 'Completed', 'Cancelled']),
  priority: String (enum: ['Low', 'Medium', 'High']),
  startDate: Date,
  endDate: Date,
  createdBy: ObjectId (ref: User),
  teamMembers: [ObjectId] (ref: User),
  budget: Number,
  progress: Number (0-100),
  createdAt: Date,
  updatedAt: Date
}
```

### Tasks Collection

```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  project: ObjectId (ref: Project), // REQUIRED
  status: String (enum: ['Pending', 'In-Progress', 'Completed']),
  priority: String (enum: ['Low', 'Medium', 'High']),
  dueDate: Date,
  assignedTo: [ObjectId] (ref: User),
  createdBy: ObjectId (ref: User),
  todoChecklist: [{
    text: String,
    completed: Boolean
  }],
  attachments: [String],
  progress: Number,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔐 Authentication Flow

```
┌─────────────┐
│   Client    │
└──────┬──────┘
       │
       │ 1. POST /api/auth/register or /api/auth/login
       │    (email, password)
       ▼
┌─────────────────┐
│   Auth Route    │
│                 │
│  ┌───────────┐  │
│  │Controller │  │
│  └───────────┘  │
│       │          │
│       │ 2. Validate credentials
│       │
│       │ 3. Generate JWT token
│       │
│       ▼
│  ┌───────────┐  │
│  │ JWT Token  │  │
│  └───────────┘  │
└─────────────────┘
       │
       │ 4. Return token + user data
       ▼
┌─────────────┐
│   Client    │  5. Store token in localStorage
│ (localStorage)│
└─────────────┘
       │
       │ 6. Include token in Authorization header
       │    for all subsequent requests
       ▼
┌─────────────┐
│  Protected  │  7. JWT Middleware verifies token
│  Endpoints   │
└─────────────┘
```

---

## 🔐 Authentication & Authorization

### JWT Token Structure

```javascript
{
  payload: {
    id: userId,
    role: 'admin' | 'member'
  },
  signature: JWT_SECRET,
  expiresIn: '7d'
}
```

### Authorization Middleware

```javascript
// authMiddleware.js
const protect = async (req, res, next) => {
  // Verify JWT token
  // Attach user to request (req.user)
  // Continue to next middleware
}

const adminOnly = (req, res, next) => {
  // Check if user.role === 'admin'
  // If not, return 403 Forbidden
}
```

---

## 📦 Project Structure

### Backend Structure

```
backend/
├── config/
│   └── db.js                      # MongoDB connection
├── controllers/
│   ├── authController.js          # Auth logic
│   ├── projectController.js       # Project CRUD
│   ├── taskController.js          # Task CRUD
│   ├── userController.js          # User management
│   └── reportController.js        # Reports & export
├── middlewares/
│   ├── authMiddleware.js          # JWT verification
│   └── uploadMiddleware.js        # File uploads
├── models/
│   ├── User.js                    # User schema
│   ├── Project.js                 # Project schema
│   └── Task.js                    # Task schema
├── routes/
│   ├── authRoutes.js              # Auth endpoints
│   ├── projectRoutes.js           # Project endpoints
│   ├── taskRoutes.js              # Task endpoints
│   ├── userRoutes.js              # User endpoints
│   └── reportRoutes.js            # Report endpoints
├── uploads/                        # Uploaded files
├── .env                           # Environment variables
├── server.js                       # Express server
└── package.json                   # Dependencies
```

### Frontend Structure

```
frontend/Task-Manager/
├── src/
│   ├── components/               # Reusable components
│   │   ├── Sidebar.jsx          # Navigation sidebar
│   │   ├── Header.jsx           # Top header
│   │   └── ProjectCard.jsx      # Project card
│   ├── pages/
│   │   ├── Admin/               # Admin pages
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── ProjectDetails.jsx
│   │   │   ├── ProjectForm.jsx
│   │   │   ├── ManageTask.jsx
│   │   │   ├── CreateTask.jsx
│   │   │   └── ManageUsers.jsx
│   │   ├── Users/               # User pages
│   │   │   ├── UserDashboard.jsx
│   │   │   ├── MyTasks.jsx
│   │   │   └── ViewTaskDetails.jsx
│   │   └── Auth/                # Auth pages
│   │       ├── Login.jsx
│   │       └── SignUp.jsx
│   ├── services/                # API services
│   │   ├── projectService.js
│   │   └── taskService.js
│   ├── utils/                   # Utilities
│   │   ├── axiosInstance.js    # Axios config
│   │   └── apiPaths.js         # API endpoints
│   ├── routes/                  # Route config
│   │   └── PrivateRoutes.jsx
│   ├── App.jsx                  # Main app
│   ├── main.jsx                 # Entry point
│   └── index.css               # Global styles
├── public/
├── index.html
└── package.json
```

---

## 🔄 Data Flow

### Creating a Task Example

```
1. User fills form → 
2. React component (CreateTask.jsx) → 
3. taskService.createTask() → 
4. Axios POST /api/tasks → 
5. Backend: authMiddleware → 
6. taskController.createTask() → 
7. Task.create() (Mongoose) → 
8. MongoDB (save) → 
9. Response (task object) → 
10. Frontend (update UI)
```

---

## 🔐 Security Features

### Frontend Security
- ✅ Token stored in localStorage
- ✅ Token included in Authorization header
- ✅ Protected routes (PrivateRoute component)
- ✅ Form validation
- ✅ XSS protection (React's built-in)
- ✅ HTTPS in production

### Backend Security
- ✅ Password hashing (bcrypt)
- ✅ JWT authentication
- ✅ Role-based access control
- ✅ CORS configuration
- ✅ Input validation
- ✅ Environment variables for secrets
- ✅ Secure file uploads

---

## 🚀 Performance Optimizations

### Frontend
- ✅ Code splitting (React.lazy)
- ✅ Image optimization
- ✅ Lazy loading
- ✅ Memoization (useMemo, useCallback)
- ✅ Tree shaking (Vite)

### Backend
- ✅ Database indexing
- ✅ Query optimization
- ✅ Mongoose population (only needed fields)
- ✅ Caching (headers)

---

## 📊 State Management

### Frontend State
- Local state (useState)
- Component state (React hooks)
- Token storage (localStorage)
- Form state (controlled components)

### Backend State
- Stateless API (RESTful)
- JWT for authentication
- MongoDB for persistence

---

## 🔄 API Design Patterns

### RESTful API

```
GET    /api/projects       # Get all
GET    /api/projects/:id   # Get one
POST   /api/projects       # Create
PUT    /api/projects/:id   # Update
DELETE /api/projects/:id   # Delete
```

### Status Codes
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

---

## 🎨 Frontend Architecture

### Component Structure
```
App
├── Router
│   ├── Public Routes
│   │   ├── Login
│   │   └── SignUp
│   ├── Admin Routes (Protected)
│   │   ├── Dashboard
│   │   ├── Projects
│   │   ├── Tasks
│   │   └── Users
│   └── User Routes (Protected)
│       ├── Dashboard
│       ├── Projects
│       └── Tasks
```

### State Management Pattern
```
Component → Service → API → Backend → Database
     ↑                                     ↓
     └─────────── Response ─────────────────┘
```

---

## 📝 Development Workflow

```
1. Start MongoDB
2. Start Backend (npm start)
3. Start Frontend (npm run dev)
4. Make changes
5. Test locally
6. Commit & Push (Git)
7. Auto-deploy (Production)
```

---

## 🧪 Testing Strategy

### Frontend Testing
- Component testing (Jest + React Testing Library)
- Integration testing
- E2E testing (Cypress)

### Backend Testing
- Unit testing (Jest)
- Integration testing
- API testing (Postman / Thunder Client)

---

## 📊 Monitoring & Logging

### Production Monitoring
- Server logs (Render/Railway)
- Error tracking (Sentry)
- Performance monitoring (New Relic / Datadog)
- Uptime monitoring (UptimeRobot)

---

## 🔮 Future Architecture Enhancements

- [ ] Microservices architecture
- [ ] GraphQL API
- [] Redis caching
- [ ] Message queue (RabbitMQ / Redis)
- [ ] Load balancing
- [ ] Docker containerization
- [ ] Kubernetes orchestration
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Monitoring (Prometheus + Grafana)

---

**📘 This document serves as the technical reference for the system architecture.**

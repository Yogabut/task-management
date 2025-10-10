import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";

// Admin Pages
import AdminDashboard from "./pages/Admin/Dashboard";
import Projects from "./pages/Admin/Projects";
import ProjectDetails from "./pages/Admin/ProjectDetails";
import ProjectForm from "./pages/Admin/ProjectForm";
import ManageTasks from "./pages/Admin/ManageTask";
import CreateTask from "./pages/Admin/CreateTask";
import ManageUsers from "./pages/Admin/ManageUsers";

// User Pages
import UserDashboard from "./pages/Users/UserDashboard";
import MyTasks from "./pages/Users/MyTasks";
import ViewTaskDetails from "./pages/Users/ViewTaskDetails";

// Routes
import PrivateRoute from "./routes/PrivateRoutes";

const App = () => {
  return (
    <>
      <Toaster position="top-right" />
      
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Admin Routes */}
          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/projects" element={<Projects />} />
            <Route path="/admin/projects/create" element={<ProjectForm />} />
            <Route path="/admin/projects/:id" element={<ProjectDetails />} />
            <Route path="/admin/projects/:id/edit" element={<ProjectForm />} />
            <Route path="/admin/tasks" element={<ManageTasks />} />
            <Route path="/admin/tasks/create" element={<CreateTask />} />
            <Route path="/admin/tasks/:id/edit" element={<CreateTask />} />
            <Route path="/admin/users" element={<ManageUsers />} />
          </Route>

          {/* User Routes */}
          <Route element={<PrivateRoute allowedRoles={["user", "member"]} />}>
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/tasks" element={<MyTasks />} />
            <Route path="/user/task-details/:id" element={<ViewTaskDetails />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;

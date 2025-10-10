import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Dashboard from "./pages/Admin/Dashboard";
import ManageTasks from "./pages/Admin/ManageTask";
import CreateTask from "./pages/Admin/CreateTask";
import ManageUsers from "./pages/Admin/ManageUsers";
import PrivateRoute from "./routes/PrivateRoutes";
import UserDashboard from "./pages/Users/UserDashboard";
import MyTasks from "./pages/Users/MyTasks";
import ViewTaskDetails from "./pages/Users/ViewTaskDetails";


const App = () => {
  return(
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />

          {/* Admin Routes */}
          <Route element={<PrivateRoute allowedRoles={["admin"]}/>}>
            <Route path = "/admin/dashboard" element={<Dashboard/>} />
            <Route path = "/admin/tasks" element={<ManageTasks/>} />
            <Route path = "/admin/create-task" element={<CreateTask/>} />
            <Route path = "/admin/users" element={<ManageUsers/>} />
          </Route> 
          {/* User Routes */}
          <Route element={<PrivateRoute allowedRoles={["user"]}/>}>
            <Route path = "/user/dashboard" element={<UserDashboard/>} />
            <Route path = "/user/tasks" element={<MyTasks/>} />
            <Route path = "/user/task-details/:id" element={<ViewTaskDetails/>} />
            
          </Route>

        </Routes>
      </Router>
    </div>
  )
}
export default App;
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiFolder, FiCheckSquare, FiUsers, FiTrendingUp } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import Sidebar from '../../components/Sidebar';
import { getAllProjects } from '../../services/projectService';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeProjects: 0,
    totalTasks: 0,
    completedTasks: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const projectData = await getAllProjects();
      const projects = projectData.data || projectData;
      
      // Calculate stats
      const activeProjects = projects.filter(p => p.status === 'Active').length;
      let totalTasks = 0;
      let completedTasks = 0;
      
      projects.forEach(project => {
        const stats = project.taskStats || project.data?.taskStats || {};
        totalTasks += stats.total || 0;
        completedTasks += stats.completed || 0;
      });
      
      setStats({
        totalProjects: projects.length,
        activeProjects,
        totalTasks,
        completedTasks
      });
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isAdmin={true} />
      
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back! Here's what's happening</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Projects */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FiFolder className="text-2xl text-blue-600" />
                </div>
                <span className="text-sm text-gray-500">Total</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{stats.totalProjects}</h3>
              <p className="text-gray-600 text-sm mt-1">Total Projects</p>
            </div>

            {/* Active Projects */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <FiTrendingUp className="text-2xl text-green-600" />
                </div>
                <span className="text-sm text-gray-500">Active</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{stats.activeProjects}</h3>
              <p className="text-gray-600 text-sm mt-1">Active Projects</p>
            </div>

            {/* Total Tasks */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <FiCheckSquare className="text-2xl text-purple-600" />
                </div>
                <span className="text-sm text-gray-600">Total</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{stats.totalTasks}</h3>
              <p className="text-gray-600 text-sm mt-1">Total Tasks</p>
            </div>

            {/* Completed Tasks */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex-items-center justify-between mb-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <FiCheckSquare className="text-2xl text-green-600" />
                </div>
                <span className="text-sm text-gray-500">Done</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{stats.completedTasks}</h3>
              <p className="text-gray-600 text-sm mt-1">Completed Tasks</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                to="/admin/projects/create"
                className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
              >
                <FiFolder className="text-2xl text-blue-600" />
                <div>
                  <p className="font-semibold text-gray-900">New Project</p>
                  <p className="text-sm text-gray-600">Create a new project</p>
                </div>
              </Link>

              <Link
                to="/admin/tasks/create"
                className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition"
              >
                <FiCheckSquare className="text-2xl text-blue-600" />
                <div>
                  <p className="font-semibold text-gray-900">New Task</p>
                  <p className="text-sm text-gray-600">Create a new task</p>
                </div>
              </Link>

              <Link
                to="/admin/users"
                className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition"
              >
                <FiUsers className="text-2xl text-blue-600" />
                <div>
                  <p className="font-semibold text-gray-900">Manage Users</p>
                  <p className="text-sm text-gray-600">View all users</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

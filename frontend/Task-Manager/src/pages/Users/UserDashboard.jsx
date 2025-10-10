import React from 'react';
import { Link } from 'react-router-dom';
import { FiFolder, FiCheckSquare, FiClock } from 'react-icons/fi';
import Sidebar from '../../components/Sidebar';

const UserDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user') || {});

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isAdmin={false} />
      
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
            <p className="text-gray-600 mt-2">Here's an overview of your tasks</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FiFolder className="text-2xl text-blue-600" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900">0</h3>
              <p className="text-gray-600 text-sm mt-1">My Projects</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <FiCheckSquare className="text-2xl text-purple-600" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900">0</h3>
              <p className="text-gray-600 text-sm mt-1">My Tasks</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <FiClock className="text-2xl text-orange-600" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900">0</h3>
              <p className="text-gray-600 text-sm mt-1">Pending Tasks</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                to="/user/projects"
                className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
              >
                <FiFolder className="text-2xl text-blue-600" />
                <div>
                  <p className="font-semibold text-gray-900">My Projects</p>
                  <p className="text-sm text-gray-600">View all your projects</p>
                </div>
              </Link>

              <Link
                to="/user/tasks"
                className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
              >
                <FiCheckSquare className="text-2xl text-blue-600" />
                <div>
                  <p className="font-semibold text-gray-900">My Tasks</p>
                  <p className="text-sm text-gray-600">View all your tasks</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

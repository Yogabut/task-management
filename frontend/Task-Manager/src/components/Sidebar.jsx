import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FiHome, FiFolder, FiCheckSquare, FiUsers, FiLogOut, 
  FiFileText, FiUser 
} from 'react-icons/fi';

const Sidebar = ({ isAdmin }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const adminLinks = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: FiHome },
    { path: '/admin/projects', label: 'Projects', icon: FiFolder },
    { path: '/admin/tasks', label: 'Tasks', icon: FiCheckSquare },
    { path: '/admin/users', label: 'Users', icon: FiUsers },
    { path: '/admin/reports', label: 'Reports', icon: FiFileText },
  ];

  const userLinks = [
    { path: '/user/dashboard', label: 'Dashboard', icon: FiHome },
    { path: '/user/projects', label: 'My Projects', icon: FiFolder },
    { path: '/user/tasks', label: 'My Tasks', icon: FiCheckSquare },
    { path: '/user/profile', label: 'Profile', icon: FiUser },
  ];

  const links = isAdmin ? adminLinks : userLinks;

  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold">Task Manager</h1>
        <p className="text-sm text-gray-400 mt-1">
          {isAdmin ? 'Admin Panel' : 'User Panel'}
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive(link.path)
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Icon className="text-xl" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <FiLogOut className="text-xl" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

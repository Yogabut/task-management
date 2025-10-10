import React from 'react';
import { FiUser, FiBell, FiSettings } from 'react-icons/fi';

const Header = ({ user, title }) => {
  return (
    <div className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-lg transition">
          <FiBell className="text-xl text-gray-600" />
        </button>
        
        <button className="p-2 hover:bg-gray-100 rounded-lg transition">
          <FiSettings className="text-xl text-gray-600" />
        </button>
        
        <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-200">
          {user?.profileImageUrl ? (
            <img 
              src={user.profileImageUrl} 
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <FiUser className="text-white text-xl" />
            </div>
          )}
          <div>
            <p className="font-semibold text-gray-800">{user?.name || 'User'}</p>
            <p className="text-xs text-gray-500">{user?.role || 'Member'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

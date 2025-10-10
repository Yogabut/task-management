import React from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiUsers, FiCheckCircle, FiClock } from 'react-icons/fi';
import moment from 'moment';

const ProjectCard = ({ project, isAdmin }) => {
  const { taskStats = {}, teamMembers = [] } = project;

  const getStatusColor = (status) => {
    const colors = {
      'Planning': 'bg-gray-100 text-gray-800',
      'Active': 'bg-green-100 text-green-800',
      'On Hold': 'bg-yellow-100 text-yellow-800',
      'Completed': 'bg-blue-100 text-blue-800',
      'Cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status] || colors['Planning'];
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'Low': 'text-green-600',
      'Medium': 'text-yellow-600',
      'High': 'text-red-600'
    };
    return colors[priority] || colors['Medium'];
  };

  return (
    <Link 
      to={isAdmin ? `/admin/projects/${project._id}` : `/user/projects/${project._id}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {project.name}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2">
            {project.description}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}>
          {project.status}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <FiCalendar className="mr-2" />
          <span>
            {moment(project.startDate).format('MMM DD, YYYY')} - {moment(project.endDate).format('MMM DD, YYYY')}
          </span>
        </div>

        <div className="flex items-center text-sm">
          <FiUsers className="mr-2 text-gray-600" />
          <span className="text-gray-600">{teamMembers.length} team member(s)</span>
        </div>

        <div className="flex items-center text-sm">
          <span className={`font-semibold ${getPriorityColor(project.priority)}`}>
            {project.priority} Priority
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">Progress</span>
          <span className="font-semibold text-gray-700">{project.progress || 0}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all" 
            style={{ width: `${project.progress || 0}%` }}
          />
        </div>
      </div>

      {/* Task Stats */}
      <div className="grid grid-cols-4 gap-2 pt-4 border-t border-gray-200">
        <div className="text-center">
          <p className="text-xs text-gray-500">Total</p>
          <p className="text-lg font-bold text-gray-800">{taskStats.total || 0}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">Pending</p>
          <p className="text-lg font-bold text-orange-600">{taskStats.pending || 0}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">In Progress</p>
          <p className="text-lg font-bold text-blue-600">{taskStats.inProgress || 0}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">Done</p>
          <p className="text-lg font-bold text-green-600">{taskStats.completed || 0}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;

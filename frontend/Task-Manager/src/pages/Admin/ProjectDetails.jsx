import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { 
  FiArrowLeft, FiEdit, FiTrash2, FiPlus, FiCalendar, 
  FiUsers, FiDollarSign, FiCheckCircle 
} from 'react-icons/fi';
import moment from 'moment';
import { getProjectById, deleteProject } from '../../services/projectService';
import Sidebar from '../../components/Sidebar';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    fetchProjectDetails();
  }, [id]);

  const fetchProjectDetails = async () => {
    try {
      setLoading(true);
      const data = await getProjectById(id);
      setProject(data.data || data);
      setTasks(data.data?.tasks || data.tasks || []);
    } catch (error) {
      toast.error('Failed to fetch project details');
      navigate('/admin/projects');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async () => {
    try {
      await deleteProject(id);
      toast.success('Project deleted successfully');
      navigate('/admin/projects');
    } catch (error) {
      toast.error(error.message || 'Failed to delete project');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Planning': 'bg-gray-100 text-gray-800',
      'Active': 'bg-green-100 text-green-800',
      'On-Hold': 'bg-yellow-100 text-yellow-800',
      'Completed': 'bg-blue-100 text-blue-800',
      'Cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status] || colors['Planning'];
  };

  const getTaskStatusColor = (status) => {
    const colors = {
      'Pending': 'bg-orange-100 text-orange-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      'Completed': 'bg-green-100 text-green-800'
    };
    return colors[status] || colors['Pending'];
  };

  if (loading) {
    return (
      <div className="flex min-h-screen">
        <Sidebar isAdmin={true} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading project...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex min-h-screen">
        <Sidebar isAdmin={true} />
        <div className="flex-1 p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">Project not found</h2>
            <button
              onClick={() => navigate('/admin/projects')}
              className="mt-4 text-blue-600 hover:text-blue-700"
            >
              Back to Projects
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isAdmin={true} />
      
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <button
              onClick={() => navigate('/admin/projects')}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
            >
              <FiArrowLeft className="mr-2" />
              Back to Projects
            </button>
            
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
                <p className="text-gray-600 mt-2">{project.description}</p>
              </div>
              
              <div className="flex gap-2">
                <Link
                  to={`/admin/projects/${id}/edit`}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <FiEdit />
                  Edit
                </Link>
                <button
                  onClick={() => setDeleteModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  <FiTrash2 />
                  Delete
                </button>
              </div>
            </div>
          </div>

          {/* Project Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FiCheckCircle className="text-blue-600 text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span className={`text-sm px-3 py-1 rounded-full ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <FiCalendar className="text-purple-600 text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {moment(project.startDate).format('MMM DD')} - {moment(project.endDate).format('MMM DD, YYYY')}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FiUsers className="text-green-600 text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Team Members</p>
                  <p className="text-lg font-semibold text-gray-900">{project.teamMembers?.length || 0}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <FiDollarSign className="text-yellow-600 text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Budget</p>
                  <p className="text-lg font-semibold text-gray-900">
                    ${project.budget?.toLocaleString() || '0'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tasks Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Project Tasks</h2>
              <Link
                to={`/admin/tasks/create?project=${id}`}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <FiPlus />
                Add Task
              </Link>
            </div>

            {tasks.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No tasks yet</p>
                <Link
                  to={`/admin/tasks/create?project=${id}`}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Create your first task
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div
                    key={task._id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{task.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Due: {moment(task.dueDate).format('MMM DD, YYYY')}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 text-sm rounded-full ${getTaskStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                      <Link
                        to={`/admin/tasks/${task._id}`}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Delete Project?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this project? This action cannot be undone.
              {tasks.length > 0 && (
                <span className="block mt-2 text-red-600 font-semibold">
                  Warning: This project has {tasks.length} task(s). Please delete or reassign them first.
                </span>
              )}
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setDeleteModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProject}
                disabled={tasks.length > 0}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;

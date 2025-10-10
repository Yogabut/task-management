import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import { createProject, getProjectById, updateProject } from '../../services/projectService';
import Sidebar from '../../components/Sidebar';

const ProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'Planning',
    priority: 'Medium',
    budget: 0,
    teamMembers: []
  });

  const [loading, setLoading] = useState(false);
  
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  useEffect(() => {
    if (isEdit) {
      fetchProject();
    }
  }, [id]);

  const fetchProject = async () => {
    try {
      const data = await getProjectById(id);
      const project = data.data || data;
      setFormData({
        name: project.name,
        description: project.description,
        startDate: project.startDate?.split('T')[0],
        endDate: project.endDate?.split('T')[0],
        status: project.status,
        priority: project.priority,
        budget: project.budget,
        teamMembers: project.teamMembers?.map(m => m._id) || []
      });
    } catch (error) {
      toast.error('Failed to fetch project');
      navigate('/admin/projects');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.description || !formData.startDate || !formData.endDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      toast.error('End date must be after start date');
      return;
    }

    try {
      setLoading(true);
      
      if (isEdit) {
        await updateProject(id, formData);
        toast.success('Project updated successfully');
      } else {
        await createProject(formData);
        toast.success('Project created successfully');
      }
      
      navigate('/admin/projects');
    } catch (error) {
      toast.error(error.message || `Failed to ${isEdit ? 'update' : 'create'} project`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isAdmin={true} />
      
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <button
              onClick={() => navigate('/admin/projects')}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
            >
              <FiArrowLeft className="mr-2" />
              Back to Projects
            </button>
            
            <h1 className="text-3xl font-bold text-gray-900">
              {isEdit ? 'Edit Project' : 'Create New Project'}
            </h1>
            <p className="text-gray-600 mt-2">
              {isEdit ? 'Update project details' : 'Fill in the details to create a new project'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-8">
            <div className="space-y-6">
              {/* Project Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter project name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your project..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Status and Priority */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Planning">Planning</option>
                    <option value="Active">Active</option>
                    <option value="On-Hold">On Hold</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget ($)
                </label>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => navigate('/admin/projects')}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                  <FiSave />
                  {loading ? 'Saving...' : isEdit ? 'Update Project' : 'Create Project'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;

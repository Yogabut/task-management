import axiosInstance from '../utils/axiosInstance';
import { PROJECT_ENDPOINTS } from '../utils/apiPaths';

// Get all projects
export const getAllProjects = async (status = '') => {
  try {
    const params = status ? { status } : {};
    const response = await axiosInstance.get(PROJECT_ENDPOINTS.GET_ALL, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get project by ID
export const getProjectById = async (id) => {
  try {
    const response = await axiosInstance.get(PROJECT_ENDPOINTS.GET_BY_ID(id));
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Create new project
export const createProject = async (projectData) => {
  try {
    const response = await axiosInstance.post(PROJECT_ENDPOINTS.CREATE, projectData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Update project
export const updateProject = async (id, projectData) => {
  try {
    const response = await axiosInstance.put(PROJECT_ENDPOINTS.UPDATE(id), projectData);
    const response = await axiosInstance.put(PROJECT_ENDPOINTS.PUT(id), projectData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Delete project
export const deleteProject = async (id) => {
  try {
    const response = await axiosInstance.delete(PROJECT_ENDPOINTS.DELETE(id));
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get project tasks
export const getProjectTasks = async (id, status = '') => {
  try {
    const params = status ? { status } : {};
    const response = await axiosInstance.get(PROJECT_ENDPOINTS.GET_TASKS(id), { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get project statistics
export const getProjectStats = async (id) => {
  try {
    const response = await axiosInstance.get(PROJECT_ENDPOINTS.GET_STATS(id));
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

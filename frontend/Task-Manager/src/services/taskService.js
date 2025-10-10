import axiosInstance from '../utils/axiosInstance';
import { TASK_ENDPOINTS } from '../utils/apiPaths';

export const getAllTasks = async (filters = {}) => {
  try {
    const response = await axiosInstance.get(TASK_ENDPOINTS.GET_ALL, { params: filters });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get task by ID
export const getTaskById = async (id) => {
  try {
    const response = await axiosInstance.get(TASK_ENDPOINTS.GET_BY_ID(id));
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Create new task
export const createTask = async (taskData) => {
  try {
    const response = await axiosInstance.post(TASK_ENDPOINTS.CREATE, taskData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Update task
export const updateTask = async (id, taskData) => {
  try {
    const response = await axiosInstance.put(TASK_ENDPOINTS.UPDATE(id), taskData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Delete task
export const deleteTask = async (id) => {
  try {
    const response = await axiosInstance.delete(TASK_ENDPOINTS.DELETE(id));
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Update task status
export const updateTaskStatus = async (id, status) => {
  try {
    const response = await axiosInstance.put(TASK_ENDPOINTS.UPDATE_STATUS(id), { status });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Update task checklist
export const updateTaskChecklist = async (id, todoChecklist) => {
  try {
    const response = await axiosInstance.put(TASK_ENDPOINTS.UPDATE_CHECKLIST(id), { todoChecklist });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get dashboard data
export const getDashboardData = async () => {
  try {
    const response = await axiosInstance.get(TASK_ENDPOINTS.DASHBOARD);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get user dashboard data
export const getUserDashboardData = async () => {
  try {
    const response = await axiosInstance.get(TASK_ENDPOINTS.USER_DASHBOARD);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

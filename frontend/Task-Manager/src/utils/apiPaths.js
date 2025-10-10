// Auth endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  PROFILE: '/auth/profile',
  UPLOAD_IMAGE: '/auth/upload-image',
};

// User endpoints
export const USER_ENDPOINTS = {
  GET_ALL: '/users',
  GET_BY_ID: (id) => `/users/${id}`,
};

// Project endpoints
export const PROJECT_ENDPOINTS = {
  GET_ALL: '/projects',
  GET_BY_ID: (id) => `/projects/${id}`,
  CREATE: '/projects',
  UPDATE: (id) => `/projects/${id}`,
  DELETE: (id) => `/projects/${id}`,
  GET_TASKS: (id) => `/projects/${id}/tasks`,
  GET_STATS: (id) => `/projects/${id}/stats`,
};

// Task endpoints
export const TASK_ENDPOINTS = {
  GET_ALL: '/tasks',
  GET_BY_ID: (id) => `/tasks/${id}`,
  CREATE: '/tasks',
  UPDATE: (id) => `/tasks/${id}`,
  DELETE: (id) => `/tasks/${id}`,
  UPDATE_STATUS: (id) => `/tasks/${id}/status`,
  UPDATE_CHECKLIST: (id) => `/tasks/${id}/todo`,
  DASHBOARD: '/tasks/dashboard-data',
  USER_DASHBOARD: '/tasks/user-dashboard-data',
};

// Report endpoints
export const REPORT_ENDPOINTS = {
  EXPORT_TASKS: '/reports/export/tasks',
  EXPORT_USERS: '/reports/export/user',
};

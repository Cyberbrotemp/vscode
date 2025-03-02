
import { User, CodeFile } from '../types';

// Local storage keys
const USERS_KEY = 'vscode_users';
const CURRENT_USER_KEY = 'vscode_current_user';
const FILES_KEY = 'vscode_files';

// User management
export const getUsers = (): User[] => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

export const saveUser = (user: User): void => {
  const users = getUsers();
  const existingUserIndex = users.findIndex(u => u.email === user.email);
  
  if (existingUserIndex >= 0) {
    users[existingUserIndex] = user;
  } else {
    users.push(user);
  }
  
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const setCurrentUser = (user: User | null): void => {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};

export const validateLogin = (email: string, password: string): User | null => {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  return user || null;
};

// File management
export const getFiles = (userId: string): CodeFile[] => {
  const files = localStorage.getItem(FILES_KEY);
  const allFiles = files ? JSON.parse(files) : [];
  return allFiles.filter((file: CodeFile) => file.userId === userId);
};

export const saveFile = (file: CodeFile): void => {
  const files = getAllFiles();
  const existingFileIndex = files.findIndex(f => f.id === file.id);
  
  // Ensure file has a name, default to "Untitled" if empty
  const updatedFile = {
    ...file,
    name: file.name || 'Untitled',
    updatedAt: new Date()
  };
  
  if (existingFileIndex >= 0) {
    files[existingFileIndex] = updatedFile;
  } else {
    files.push(updatedFile);
  }
  
  localStorage.setItem(FILES_KEY, JSON.stringify(files));
};

export const deleteFile = (fileId: string): void => {
  const files = getAllFiles();
  const updatedFiles = files.filter(f => f.id !== fileId);
  localStorage.setItem(FILES_KEY, JSON.stringify(updatedFiles));
};

export const getAllFiles = (): CodeFile[] => {
  const files = localStorage.getItem(FILES_KEY);
  return files ? JSON.parse(files) : [];
};

// Helper function to generate a unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Helper function to create a new empty file
export const createNewFile = (userId: string, name = 'Untitled'): CodeFile => {
  return {
    id: generateId(),
    name: name || 'Untitled', // Ensure name is never empty
    html: '<!DOCTYPE html>\n<html>\n<head>\n  <title>My Project</title>\n</head>\n<body>\n  <h1>Hello World</h1>\n</body>\n</html>',
    css: 'body {\n  font-family: Arial, sans-serif;\n  margin: 0;\n  padding: 20px;\n}',
    js: 'console.log("Hello from JavaScript!");',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId
  };
};

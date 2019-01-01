const Store = require('electron-store');

// TASKS STORE
export const taskStore = new Store({
  name: 'tasks'
});

export const saveTask = (key, json) => {
  taskStore.set(key, json);
};

export const getTask = (key) => {
  return taskStore.get(key);
};

export const deleteTask = (key) => {
  return taskStore.delete(key);
};

// PROJECT STORE
export const projectStore =  new Store({
  name: 'projects'
});

export const saveProject = (key, json) => {
  projectStore.set(key, json);
};

export const getProject = (key) => {
  return projectStore.get(key);
};

export const deleteProject = (key) => {
  return projectStore.delete(key);
};

// CONVERT JSON VALUES TO ITERABLE ARRAY
export const convertValues = (json) => {
  return Object.keys(json).map((k) => {
    return json[k];
  });
};



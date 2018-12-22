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



// CONVERT JSON VALUES TO ITERABLE ARRAY
export const convertValues = (json) => {
  return Object.keys(json).map((k) => {
    return json[k];
  });
};



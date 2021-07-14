let tasks = [];

const clearTasks = () => {
  tasks = [];
};

const addTasks = (description, completed, index) => {
  tasks.push({ description, completed, index: parseInt(index, 10) });
};

const store = () => {
  const json = JSON.stringify(tasks);
  localStorage.setItem('tasks', json);
};

const updateTaskCompleted = (task, check) => {
  const taskInTasks = tasks.find((t) => t.description === task.description);

  taskInTasks.completed = check;

  task.completed = check;
  store();
};

export {
  clearTasks, addTasks, store, updateTaskCompleted,
};
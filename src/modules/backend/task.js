/* eslint-disable import/no-mutable-exports */

let tasks = [];

const clearTasks = () => {
  tasks = [];
};

const addTask = (description, completed, index) => {
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

const inputCreateTask = (description) => {
  let index = 0;

  if (tasks.length > 0) {
    index = tasks[tasks.length - 1].index + 1;
  }

  addTask(description, false, index);
  store();
};

export {
  tasks, clearTasks, addTask, store, updateTaskCompleted, inputCreateTask,
};

/* eslint-enable import/no-mutable-exports */
/* eslint-disable import/no-mutable-exports */

let tasks = [
  { description: 'walk', completed: false, index: 2 },
  { description: 'groomer', completed: false, index: 0 },
  { description: 'vet', completed: false, index: 1 },
];

const clearTasks = () => {
  tasks = [];
};

const addTasks = (description, completed, index) => {
  tasks.push({ description, completed, index: parseInt(index, 2) });
};

export { tasks, clearTasks, addTasks };

/* eslint-enable import/no-mutable-exports */

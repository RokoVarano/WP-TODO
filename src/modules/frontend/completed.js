import { store, tasks } from '../backend/fakeTasks';

const updateTask = (task, check) => {
  const taskInTasks = tasks.find((t) => t.description === task.description);

  taskInTasks.completed = check;

  task.completed = check;
  store();
};

export default updateTask;
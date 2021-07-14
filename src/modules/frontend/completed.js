import { store } from '../backend/fakeTasks';

const updateTask = (task, checkbox) => {
  task.completed = checkbox;

  store();
};

export default updateTask;
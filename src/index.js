import './style.scss';
import { createList } from './modules/frontend/listItems';
import { loadTasks } from './modules/backend/task';

const run = () => {
  createList(loadTasks());
};

run();
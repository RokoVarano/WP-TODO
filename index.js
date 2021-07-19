import './src/style.scss';
import createList from './src/modules/frontend/listItems';
import { loadTasks } from './src/modules/backend/task';

const run = () => {
  createList(loadTasks());
};

run();
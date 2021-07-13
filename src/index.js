import './style.scss';
import createList from './modules/frontend/listItems';
import { tasks } from './modules/backend/fakeTasks';

const run = () => {
  createList(tasks);
};

run();
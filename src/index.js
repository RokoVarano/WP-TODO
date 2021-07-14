import './style.scss';
import createList from './modules/frontend/listItems';

const run = () => {
  let load = JSON.parse(localStorage.getItem('tasks'));

  if (load == null) {
    load = [];
  }

  createList(load);
};

run();
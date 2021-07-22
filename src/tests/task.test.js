/**
 * @jest-environment jsdom
 */

import {
  tasks, addTask, inputCreateTask, updateTaskDescription, updateTaskCompleted, clearTasks,
} from '../modules/backend/task';
import { remakeList } from '../modules/frontend/modifyList';
import { item } from '../modules/frontend/listItems';

describe('Task list management methods', () => {
  const task = {
    description: 'Go for a walk',
    completed: false,
    index: 0,
  };
  const task2 = {
    description: 'Go for another walk',
    completed: false,
    index: 1,
  };

  const addTaskString = 'Go to the Vet';

  const ulElement = document.createElement('ul');

  test('it creates an object with the corresponding parameters', () => {
    inputCreateTask(addTaskString);

    expect(tasks[tasks.length - 1].description).toBe(addTaskString);

    ulElement.appendChild(item(tasks[tasks.length - 1]));

    expect(ulElement.innerHTML.includes(addTaskString)).toBe(true);
  });

  test('it adds and deletes an item from the To Do List', () => {
    const addedTask = addTask(task.description, task.completed, task.index);
    const addedTask2 = addTask(task2.description, task2.completed, task2.index);

    /* Add tasks to the DOM */
    ulElement.innerHTML = '';
    const addTaskToDOM = (task) => {
      const liElement = document.createElement('li');

      liElement.classList.add('draggable');
      liElement.setAttribute('task', task.index);

      const input = document.createElement('input');
      input.classList.add('completed');
      input.setAttribute('checked', (task.completed ? 'true' : 'false'));

      const p = document.createElement('p');
      p.classList.add('description');
      p.textContent = task.description;

      liElement.appendChild(input);
      liElement.appendChild(p);
      ulElement.appendChild(liElement);
    };

    addTaskToDOM(addedTask);
    addTaskToDOM(addedTask2);

    document.body.appendChild(ulElement);

    ulElement.removeChild(ulElement.childNodes[0]);

    remakeList();

    expect(tasks.length).toBe(1);
    expect(tasks[0].description).toBe(addedTask2.description);
  });
});

describe('item updates', () => {
  test('it changes the name of the task description', () => {
    const nextIndex = tasks[tasks.length - 1].index + 1;
    addTask('original description', false, nextIndex);

    updateTaskDescription(nextIndex, 'New description');

    expect(tasks[tasks.length - 1].description).toBe('New description');
  });

  test('it updates the completed status', () => {
    const nextIndex = tasks[tasks.length - 1].index + 1;
    addTask('Pending task', false, nextIndex);

    updateTaskCompleted(nextIndex, true);

    expect(tasks[tasks.length - 1].completed).toBe(true);
  });

  test('it updates the index according to order', () => {
    clearTasks();

    const task = {
      description: 'Go for a walk',
      completed: false,
      index: 5,
    };
    const task2 = {
      description: 'Go for another walk',
      completed: false,
      index: 2,
    };

    const ulElement = document.createElement('ul');
    ulElement.appendChild(item(task));
    ulElement.appendChild(item(task2));

    expect(tasks[0].index).toBe('5');
    expect(tasks[1].index).toBe('2');

    remakeList();

    expect(tasks[0].index).toBe('0');
    expect(tasks[1].index).toBe('1');
  });
});
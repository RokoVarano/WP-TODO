/**
 * @jest-environment jsdom
 */

import {
  tasks, addTask, inputCreateTask, updateTaskDescription, updateTaskCompleted, clearTasks,
} from '../modules/backend/task';
import { remakeList, clearCompleted } from '../modules/frontend/modifyList';
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
    localStorage.clear();
    const nextIndex = tasks[tasks.length - 1].index + 1;
    addTask('original description', false, nextIndex);

    updateTaskDescription(nextIndex, 'New description');

    expect(tasks[tasks.length - 1].description).toBe('New description');

    const storage = JSON.parse(localStorage.getItem('tasks'));
    expect(storage[storage.length - 1].description).toBe('New description');
  });

  test('it updates the completed status', () => {
    localStorage.clear();
    const nextIndex = tasks[tasks.length - 1].index + 1;
    addTask('Pending task', false, nextIndex);

    updateTaskCompleted(nextIndex, true);

    expect(tasks[tasks.length - 1].completed).toBe(true);

    const storage = JSON.parse(localStorage.getItem('tasks'));
    expect(storage[storage.length - 1].completed).toBe(true);
  });

  test('it updates the index according to order', () => {
    localStorage.clear();
    clearTasks();

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

    const ulElement = document.createElement('ul');
    ulElement.appendChild(item(task));
    ulElement.appendChild(item(task2));

    document.body.appendChild(ulElement);

    remakeList();

    expect(tasks[0].index).toBe('0');
    expect(tasks[1].index).toBe('1');

    const taskElement = ulElement.childNodes[0];
    const taskElement2 = ulElement.childNodes[1];

    const tempIndex = taskElement.getAttribute('task');
    taskElement.setAttribute('task', taskElement2.getAttribute('task'));
    taskElement2.setAttribute('task', tempIndex);

    remakeList();

    const firstTask = tasks[0];
    const secondTask = tasks[1];

    expect(firstTask.index).toBe('0');
    expect(firstTask.description).toBe('Go for another walk');
    expect(secondTask.index).toBe('1');
    expect(secondTask.description).toBe('Go for a walk');

    const storage = JSON.parse(localStorage.getItem('tasks'));
    expect(storage[0].index).toBe('0');
    expect(storage[0].description).toBe('Go for another walk');
    expect(storage[1].index).toBe('1');
    expect(storage[1].description).toBe('Go for a walk');
  });

  test('it removes the tasks from the DOM and from the array that are checked', () => {
    clearTasks();
    localStorage.clear();
    document.body.innerHTML = '';
    const ul = document.createElement('ul');
    document.body.appendChild(ul);
    const clear = document.createElement('li');
    clear.id = 'clear';
    document.body.appendChild(ul);
    ul.appendChild(clear);

    const task = {
      description: 'Task 1',
      completed: true,
      index: 0,
    };
    const task2 = {
      description: 'Task 2',
      completed: false,
      index: 1,
    };

    ul.appendChild(item(task));
    ul.appendChild(item(task2));

    remakeList();
    const checkboxes = document.getElementsByClassName('completed');
    checkboxes[0].checked = true;

    clearCompleted(ul);

    [...checkboxes].forEach((checkbox) => expect(checkbox.checked).toBe(false));
    expect([...checkboxes].length).toBe(1);

    const storage = JSON.parse(localStorage.getItem('tasks'));
    storage.forEach((item) => expect(item.completed).toBe(false));
    expect(storage.length).toBe(1);
  });
});
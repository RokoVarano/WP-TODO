/**
 * @jest-environment jsdom
 */

import { tasks, addTask } from '../modules/backend/task';
import { remakeList } from '../modules/frontend/modifyList';

describe('Task list management methods', () => {
  const task = {
    description: 'Go for a walk',
    completed: false,
    index: 0
  }
  const task2 = {
    description: 'Go for another walk',
    completed: false,
    index: 1
  }

  test('it creates an object with the corresponding parameters', () => {
    const add = addTask(task.description, task.completed, task.index);

    expect(add.description).toBe(task.description);
    expect(add.completed).toBe(task.completed);
    expect(add.index).toBe(task.index);
  });

  test('it adds and deletes an item from the To Do List', () => {
    const addedTask = addTask(task.description, task.completed, task.index);
    const addedTask2 = addTask(task2.description, task2.completed, task2.index);

    /* Add tasks to the DOM */
    const ulElement = document.createElement('ul');
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
import { addTask } from '../modules/backend/task';

describe('Task list management methods', () => {
  const description = 'Go for a walk';
  const completed = false;
  const index = 0;
  test('it creates an object with the corresponding parameters', () => {
    const add = addTask(description, completed, index);

    expect(add.description).toBe(description);
    expect(add.completed).toBe(completed);
    expect(add.index).toBe(index);
  });
});
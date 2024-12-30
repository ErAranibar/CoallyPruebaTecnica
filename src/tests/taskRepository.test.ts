import mongoose from 'mongoose';
import Task, { ITask } from '../models/task.model';
import { createTask, getAllTasks, getTaskById, updateTask, deleteTask } from '../repositories/taskRepository';

describe('Task Repository', () => {
  let taskId: string;

  beforeAll(async () => {
    const task = await createTask('Test Task', 'Test description', false);
    taskId = task._id?.toString() ?? '';
  });

  it('should create a task', async () => {
    const task = await createTask('New Task', 'New description', true);

    expect(task).toHaveProperty('title', 'New Task');
    expect(task).toHaveProperty('description', 'New description');
    expect(task).toHaveProperty('completed', true);
    expect(task).toHaveProperty('createdAt');
  });

  it('should get all tasks', async () => {
    const tasks = await getAllTasks();
    expect(tasks).toHaveLength(2);
  });

  it('should get a task by ID', async () => {
    const task = await getTaskById(taskId);
    expect(task).toHaveProperty('_id');
    expect(task).toHaveProperty('title', 'Test Task');
    expect(task).toHaveProperty('description', 'Test description');
  });

  it('should return null if the task ID is invalid', async () => {
    const task = await getTaskById('invalidId');
    expect(task).toBeNull();
  });

  it('should update a task', async () => {
    const updatedTask = await updateTask(taskId, { title: 'Updated Task' });
    expect(updatedTask).toHaveProperty('title', 'Updated Task');
  });

  it('should return null if the task ID is invalid while updating', async () => {
    const updatedTask = await updateTask('invalidId', { title: 'Updated Task' });
    expect(updatedTask).toBeNull();
  });

  it('should delete a task', async () => {
    const taskToDelete = await createTask('Task to delete', 'Description', false);
    const deletedTask = await deleteTask(taskToDelete._id?.toString() || '');
    expect(deletedTask).toHaveProperty('_id', taskToDelete._id || '');
  });

  it('should return null if the task ID is invalid while deleting', async () => {
    const deletedTask = await deleteTask('invalidId');
    expect(deletedTask).toBeNull();
  });
});

import mongoose from 'mongoose';
import Task, { ITask } from '../models/task.model';

export const createTask = async (title: string, description?: string, completed: boolean = false, userId?: string): Promise<ITask> => {
  const task = new Task({ title, description, completed, userId });
  await task.save();
  return task;
};

export const getAllTasks = async (filter: Partial<ITask> = {}): Promise<ITask[]> => {
  return Task.find(filter);
};

export const getTaskById = async (id: string): Promise<ITask | null> => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  return Task.findById(id);
};

export const updateTask = async (id: string, updates: Partial<{ title: string; description: string; completed: boolean }>): Promise<ITask | null> => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  return Task.findByIdAndUpdate(id, updates, { new: true });
};

export const deleteTask = async (id: string): Promise<ITask | null> => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  return Task.findByIdAndDelete(id);
};

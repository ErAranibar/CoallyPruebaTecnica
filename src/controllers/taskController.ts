import { Request, Response } from 'express';
import * as taskRepository from '../repositories/taskRepository';
import { ITask } from '../models/task.model';

export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, completed } = req.body;
    const userId = (req as any).user.userId;
    const task = await taskRepository.createTask(title, description, completed, userId);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la tarea' });
  }
};

export const getAllTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { completed } = req.query;
    let filter: Partial<ITask> = { userId: (req as any).user.userId };
    if (completed) {
      filter = { ...filter ,completed: completed === 'true' };
    }
    const tasks = await taskRepository.getAllTasks(filter);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las tareas' });
  }
};

export const getTaskById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const task = await taskRepository.getTaskById(id);
    if (!task) {
      res.status(404).json({ error: 'Tarea no encontrada' });
      return;
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la tarea' });
  }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const task = await taskRepository.updateTask(id, { title, description, completed });
    if (!task) {
      res.status(404).json({ error: 'Tarea no encontrada' });
      return;
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la tarea' });
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const task = await taskRepository.deleteTask(id);
    if (!task) {
      res.status(404).json({ error: 'Tarea no encontrada' });
      return;
    }
    res.status(200).json({ message: 'Tarea eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la tarea' });
  }
};

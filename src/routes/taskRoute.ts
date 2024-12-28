import { Router } from 'express';
import * as TaskController from '../controllers/taskController';
import { createTaskValidation, updateTaskValidation } from '../middlewares/taskRouteValidation';
import { validate } from '../middlewares/validationMiddleware';

const taskRoute: Router = Router();

taskRoute.post('/add', createTaskValidation, validate, TaskController.createTask);
taskRoute.get('/all', TaskController.getAllTasks);
taskRoute.get('/getById/:id', TaskController.getTaskById);
taskRoute.put('/update/:id', updateTaskValidation, validate, TaskController.updateTask);
taskRoute.delete('/delete/:id', TaskController.deleteTask);

export default taskRoute;

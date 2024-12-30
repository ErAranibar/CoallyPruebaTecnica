import { Router } from 'express';
import * as TaskController from '../controllers/taskController';
import { createTaskValidation, updateTaskValidation } from '../middlewares/taskRouteValidation';
import { validate } from '../middlewares/validationMiddleware';

const taskRoute: Router = Router();

/**
 * @swagger
 * /api/tasks/add:
 *   post:
 *     summary: Crear una nueva tarea
 *     description: Crea una nueva tarea con título, descripción y estado
 *     operationId: createTask
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: El título de la tarea
 *                 example: "Tarea 1"
 *               description:
 *                 type: string
 *                 description: La descripción de la tarea
 *                 example: "Esta es una descripción"
 *               completed:
 *                 type: boolean
 *                 description: El estado de la tarea
 *                 example: false
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *             example:
 *               title: "Tarea 1"
 *               description: "Esta es una descripción"
 *               completed: false
 *               _id: "6771dd1a5675fb680989e42f"
 *               createdAt: "2024-12-29T23:36:58.498Z"
 *               updatedAt: "2024-12-29T23:36:58.498Z"
 *               __v: 0
 *       400:
 *         description: Error en los datos de entrada
 *       500:
 *         description: Error al crear la tarea
 */
taskRoute.post('/add', createTaskValidation, validate, TaskController.createTask);

/**
 * @swagger
 * /tasks/all:
 *   get:
 *     summary: Obtener todas las tareas
 *     description: Obtiene todas las tareas almacenadas
 *     operationId: getAllTasks
 *     parameters:
 *       - name: completed
 *         in: query
 *         description: Filtra tareas por estado (completado o no)
 *         required: false
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: Lista de todas las tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *             example: 
 *               [
 *                 {
 *                   "_id": "677068a0ff8d92812d58aad1",
 *                   "title": "Uno",
 *                   "description": "Primera",
 *                   "completed": true,
 *                   "createdAt": "2024-12-28T21:07:44.084Z",
 *                   "updatedAt": "2024-12-28T21:07:44.084Z",
 *                   "__v": 0
 *                 },
 *                 {
 *                   "_id": "677068c2ff8d92812d58aad4",
 *                   "title": "Dos",
 *                   "description": "Segunda",
 *                   "completed": false,
 *                   "createdAt": "2024-12-28T21:08:18.738Z",
 *                   "updatedAt": "2024-12-28T21:08:18.738Z",
 *                   "__v": 0
 *                 }
 *               ]
 *       500:
 *         description: Error al obtener las tareas
 */
taskRoute.get('/all', TaskController.getAllTasks);


/**
 * @swagger
 * /api/tasks/getById/{id}:
 *   get:
 *     summary: Obtener una tarea por ID
 *     description: Obtiene una tarea específica por su ID
 *     operationId: getTaskById
 *     parameters:
 *       - name: id
 *         in: path
 *         description: El ID de la tarea
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: La tarea encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *             example:
 *               _id: "677068c2ff8d92812d58aad4"
 *               title: "Dos"
 *               description: "Segunda"
 *               completed: false
 *               createdAt: "2024-12-28T21:08:18.738Z"
 *               updatedAt: "2024-12-28T21:08:18.738Z"
 *               __v: 0
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error al obtener la tarea
 */
taskRoute.get('/getById/:id', TaskController.getTaskById);

/**
 * @swagger
 * /api/tasks/update/{id}:
 *   put:
 *     summary: Actualizar una tarea
 *     description: Actualiza una tarea existente por su ID
 *     operationId: updateTask
 *     parameters:
 *       - name: id
 *         in: path
 *         description: El ID de la tarea
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: El título de la tarea
 *                 example: "Tarea actualizada"
 *               description:
 *                 type: string
 *                 description: La descripción de la tarea
 *                 example: "Esta es una nueva descripción"
 *               completed:
 *                 type: boolean
 *                 description: El estado de la tarea
 *                 example: true
 *     responses:
 *       200:
 *         description: Tarea actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *             example:
 *              _id: "677068c2ff8d92812d58aad4"
 *              title: "Tarea actualizada 2"
 *              description: "Esta es una nueva descripción"
 *              completed: true
 *              createdAt: "2024-12-28T21:08:18.738Z"
 *              updatedAt: "2024-12-29T23:48:09.556Z"
 *              __v: 0
 *       400:
 *         description: Error en los datos de entrada
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error al actualizar la tarea
 */
taskRoute.put('/update/:id', updateTaskValidation, validate, TaskController.updateTask);

/**
 * @swagger
 * /api/tasks/delete/{id}:
 *   delete:
 *     summary: Eliminar una tarea
 *     description: Elimina una tarea por su ID
 *     operationId: deleteTask
 *     parameters:
 *       - name: id
 *         in: path
 *         description: El ID de la tarea
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarea eliminada exitosamente
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error al eliminar la tarea
 */
taskRoute.delete('/delete/:id', TaskController.deleteTask);

export default taskRoute;

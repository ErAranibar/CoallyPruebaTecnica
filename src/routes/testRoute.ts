import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';

const router: Router = Router();

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - General
 *     summary: Ruta raíz
 *     description: Retorna un mensaje básico de bienvenida.
 *     responses:
 *       200:
 *         description: Respuesta exitosa con mensaje de bienvenida.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: 'Hello, Task Manager!'
 */
router.get('/', (req: Request, res: Response): void => {
  res.send('Hello, Task Manager!');
});

/**
 * @swagger
 * /api/healthCheck:
 *   get:
 *     tags:
 *       - General
 *     summary: Realiza una verificación de salud de la base de datos.
 *     description: Verifica si la base de datos MongoDB está accesible y en funcionamiento.
 *     responses:
 *       200:
 *         description: La base de datos es accesible.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: 'Health Check: Database is reachable!'
 *       500:
 *         description: La base de datos no es accesible.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: 'Health Check: Database is not reachable!'
 */
router.get('/healthCheck', async (req: Request, res: Response): Promise<void> => {
  try {
    await mongoose.connection.db?.admin().ping();
    res.status(200).send('Health Check: Database is reachable!');
  } catch (error) {
    res.status(500).send('Health Check: Database is not reachable!');
  }
});

export default router;
